import {Component, Injectable, Inject, forwardRef, OnInit, ChangeDetectorRef} from "@angular/core";
import {OperationalDataService} from "./services/operational-data.service";
import {DeviceManagementService} from "./services/device-management.service";
import {Observable} from "rxjs/Observable";
import {AGVStateCount, AGVStateCountGroup} from "./mobile-robotics-tab.component";


@Component({
    selector: 'mobile-robotics-card',
    template:
    `
        <div class="row secondary-kpis-row">
            
            <map-view></map-view>
            
            <div>There are {{deviceOperationalData.size}} Mobile Robots in the current scope</div>
            
            <div>Average Battery State: {{getMeanBatterySoc()}}</div>
            <div>Connection States: {{getConnectionStates()}}</div>
            <div>Commandability States: {{getCommandabilityStates()}}</div>
            <div>Pose Reliability States: {{getPoseReliabilityStates()}}</div>
            <div>Safety States: {{getSafetyStates()}}</div>
            
            <div>------------bimv---------</div>
        
            <div id="scalar-charts">
                <scalar-chart *ngIf="commandabilityStateCount"  [chartConfig]="commandabilityStateCount">   </scalar-chart>
                <scalar-chart *ngIf="safetyStateCount"          [chartConfig]="safetyStateCount">           </scalar-chart>
                <scalar-chart *ngIf="poseReliabilityCount"      [chartConfig]="poseReliabilityCount">       </scalar-chart>
                <scalar-chart *ngIf="connectionStateCount"      [chartConfig]="connectionStateCount">       </scalar-chart>
            </div>
        </div>
    `,
    styles: [
        `
            /* style here ! this is less -> have a look at map-view.component.ts */
        `
    ],
})


export class MobileRoboticsCardComponent implements OnInit{
    private devicesMeta$: Observable<any[]>;
    private devicesMeta: any[];
    protected deviceOperationalData = new Map();

    protected commandabilityStateCount:   AGVStateCountGroup = null;
    protected safetyStateCount:           AGVStateCountGroup = null;
    protected poseReliabilityCount:       AGVStateCountGroup = null;
    protected connectionStateCount:       AGVStateCountGroup = null;

    private getMeanBatterySoc(): number {
        let vals = [...this.deviceOperationalData.values()];
        let accu: number = 0.0;
        vals.map(op => {
            if (op.mobilityState && op.mobilityState.battery && op.mobilityState.battery.batterySoc) {
                accu += op.mobilityState.battery.batterySoc;
            }
        });

        if (accu == 0.0) return 0.0
        return (accu / vals.length) * 100.0;
    }
    private getConnectionStates(): Array<number> {
        let vals = [...this.deviceOperationalData.values()];
        let accu: number[] = [];
        vals.map(op => {
            if (op.mobilityState && op.mobilityState.vmsMobileRobotState && op.mobilityState.vmsMobileRobotState.connectionState) {
                accu += op.mobilityState.vmsMobileRobotState.connectionState;
            }
        });
        return accu;
    }
    private getCommandabilityStates(): Array<number> {
        let vals = [...this.deviceOperationalData.values()];
        let accu: number[] = [];
        vals.map(op => {
            if (op.mobilityState && op.mobilityState.vmsMobileRobotState && op.mobilityState.vmsMobileRobotState.commandableState) {
                accu += op.mobilityState.vmsMobileRobotState.commandableState;
            }
        });
        return accu;
    }
    private getPoseReliabilityStates(): Array<number> {
        let vals = [...this.deviceOperationalData.values()];
        let accu: number[] = [];
        vals.map(op => {
            if (op.mobilityState && op.mobilityState.mapLocalization && op.mobilityState.mapLocalization.poseReliabilitySimple) {
                accu += op.mobilityState.mapLocalization.poseReliabilitySimple;
            }
        });
        return accu;
    }
    private getSafetyStates(): Array<number> {
        let vals = [...this.deviceOperationalData.values()];
        let accu: number[] = [];
        vals.map(op => {
            if (op.mobilityState && op.mobilityState.safety && op.mobilityState.safety.safetyState) {
                accu += op.mobilityState.safety.safetyState;
            }
        });
        return accu;
    }


    constructor(private deviceManagementService: DeviceManagementService,
                private operationalDataService: OperationalDataService,
                private changeDetectorRef: ChangeDetectorRef) {

        this.devicesMeta$ = this.deviceManagementService.getMobileRobotsInScope();
        this.devicesMeta$.subscribe(devices => {
            this.devicesMeta = devices;
            this.changeDetectorRef.detectChanges();

            devices.map( device => {
                console.log("Subscribing to OP  " + device.Id);
                this.operationalDataService.get(device.Id).subscribe(agvOp => {
                    this.deviceOperationalData.set(device.Id, agvOp);
                    this.update(this.commandabilityStateConf,   this.getCommandabilityStates(),     state => this.commandabilityStateCount = state);
                    this.update(this.poseReliabilityStateConf,  this.getPoseReliabilityStates(),    state => this.poseReliabilityCount = state);
                    this.update(this.connectionStateConf,       this.getConnectionStates(),         state => this.connectionStateCount = state);
                    this.update(this.safetyStateConf,           this.getSafetyStates(),             state => this.safetyStateCount = state);
                })
            })
        })
    }

    ngOnInit() {

    }

    private update(stateConfiguration: AGVStateCountGroup, newStates: number[], updtFunc) {
        let stateGroup: AGVStateCountGroup = Object.assign({}, stateConfiguration);
        let newKpis: Map<string, AGVStateCount> = new Map();
        const AGV_COUNT = newStates.length;

        stateGroup.kpis.forEach((value, key, map) => {
            const ID: number = value.id as number;
            let COUNT = 0; // newStates.filter(val => val == ID).length;
            for (let newState of newStates) {
                if (newState == ID) {
                    COUNT++;
                }
            }
            const VALUE = COUNT * 100.0 / AGV_COUNT;

            let stateCount: AGVStateCount = Object.assign({}, value);
            stateCount.count = COUNT;
            stateCount.value = VALUE;
            newKpis.set(key, stateCount);
        });

        stateGroup.kpis = newKpis;
        updtFunc(stateGroup);
    }


    // ====================================================
    // Scalar charts
    // ====================================================

    commandabilityStateConf: AGVStateCountGroup = {
            title: "views.productivityInsights.secondaryKpis.MRCommandability.title",
            icon: "assets/mobile-robotics/command-graph.svg",
            kpis: new Map<string, AGVStateCount>()
                .set("mr-commandability-COMMANDABLE",                   {id: 1, title: "views.productivityInsights.secondaryKpis.MRCommandability.commandable",                 icon: "icon", color: "#CF2027", value: 0, count: 0})
                .set("mr-commandability-TEMPORARILY_NOT_COMMANDABLE",   {id: 2, title: "views.productivityInsights.secondaryKpis.MRCommandability.temporarilyNotCommandable",   icon: "icon", color: "#FF5800", value: 0, count: 0})
                .set("mr-commandability-NOT_COMMANDABLE",               {id: 3, title: "views.productivityInsights.secondaryKpis.MRCommandability.notCommandable",              icon: "icon", color: "#FFCD00", value: 0, count: 0})
        };

    safetyStateConf: AGVStateCountGroup = {
        title: "views.productivityInsights.secondaryKpis.MRSafetyState.title",
        icon: "assets/mobile-robotics/safe-safe.svg",
        kpis: new Map()
            .set("mr-safety-state-ACKNOWLEDGE_REQUIRED",    {id: 1,     title: "views.productivityInsights.secondaryKpis.MRSafetyState.acknowledgeRequired",    icon: "icon", color: "#CF2027", value: 0, samples: 0})
            .set("mr-safety-state-EMERGENCY_STOP",          {id: 2,     title: "views.productivityInsights.secondaryKpis.MRSafetyState.emergencyStop",          icon: "icon", color: "#FF5800", value: 0, samples: 0})
            .set("mr-safety-state-PROTECTIVE_STOP",         {id: 3,     title: "views.productivityInsights.secondaryKpis.MRSafetyState.protectiveStop",         icon: "icon", color: "#FFCD00", value: 0, samples: 0})
            .set("mr-safety-state-SAFE",                    {id: 4,     title: "views.productivityInsights.secondaryKpis.MRSafetyState.safe",                   icon: "icon", color: "#6EC8A0", value: 0, samples: 0})
            .set("mr-safety-state-WARNING_FIELD",           {id: 5,     title: "views.productivityInsights.secondaryKpis.MRSafetyState.warningField",           icon: "icon", color: "#1B8642", value: 0, samples: 0})
    };

    connectionStateConf: AGVStateCountGroup = {
        title: "views.productivityInsights.secondaryKpis.MRConnection.title",
        icon: "assets/mobile-robotics/connect-graph.svg",
        kpis: new Map()
            .set("mr-connection-CONNECTED",     {id: 1, title: "views.productivityInsights.secondaryKpis.MRConnection.connected",   icon: "icon", color: "#CF2027", value: 0, samples: 0})
            .set("mr-connection-UNRELIABLE",    {id: 2, title: "views.productivityInsights.secondaryKpis.MRConnection.unreliable",  icon: "icon", color: "#FF5800", value: 0, samples: 0})
            .set("mr-connection-DISCONNECTED",  {id: 3, title: "views.productivityInsights.secondaryKpis.MRConnection.disconnected",icon: "icon", color: "#FFCD00", value: 0, samples: 0})
            .set("mr-connection-DISPOSED",      {id: 4, title: "views.productivityInsights.secondaryKpis.MRConnection.disposed",    icon: "icon", color: "#6EC8A0", value: 0, samples: 0})
        // .set("mr-connection-UNKNOWN",        {id: 5, title: "views.productivityInsights.secondaryKpis.MRConnection.unknown",     icon: "icon", color: "color"}
    };

    poseReliabilityStateConf: AGVStateCountGroup = {
        title: "views.productivityInsights.secondaryKpis.MRPoseReliability.title",
        icon: "assets/mobile-robotics/pose-graph.svg",
        kpis: new Map()
            .set("mr-pose-reliability-RELIABLE",    {id: 1, title: "views.productivityInsights.secondaryKpis.MRPoseReliability.reliable",   icon: "icon", color: "#CF2027", value: 0, samples: 0})
            .set("mr-pose-reliability-UNRELIABLE",  {id: 2, title: "views.productivityInsights.secondaryKpis.MRPoseReliability.undecided",  icon: "icon", color: "#FF5800", value: 0, samples: 0})
            .set("mr-pose-reliability-UNDECIDED",   {id: 3, title: "views.productivityInsights.secondaryKpis.MRPoseReliability.unreliable", icon: "icon", color: "#FFCD00", value: 0, samples: 0})
    };
}
