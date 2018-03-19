var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from "@angular/core";
import { OperationalDataService } from "./services/operational-data.service";
import { DeviceManagementService } from "./services/device-management.service";
let MobileRoboticsCardComponent = class MobileRoboticsCardComponent {
    constructor(deviceManagementService, operationalDataService, changeDetectorRef) {
        this.deviceManagementService = deviceManagementService;
        this.operationalDataService = operationalDataService;
        this.changeDetectorRef = changeDetectorRef;
        this.deviceOperationalData = new Map();
        this.commandabilityStateCount = null;
        this.safetyStateCount = null;
        this.poseReliabilityCount = null;
        this.connectionStateCount = null;
        // ====================================================
        // Scalar charts
        // ====================================================
        this.commandabilityStateConf = {
            title: "views.productivityInsights.secondaryKpis.MRCommandability.title",
            icon: "assets/mobile-robotics/command-graph.svg",
            kpis: new Map()
                .set("mr-commandability-COMMANDABLE", { id: 1, title: "views.productivityInsights.secondaryKpis.MRCommandability.commandable", icon: "icon", color: "#CF2027", value: 0, count: 0 })
                .set("mr-commandability-TEMPORARILY_NOT_COMMANDABLE", { id: 2, title: "views.productivityInsights.secondaryKpis.MRCommandability.temporarilyNotCommandable", icon: "icon", color: "#FF5800", value: 0, count: 0 })
                .set("mr-commandability-NOT_COMMANDABLE", { id: 3, title: "views.productivityInsights.secondaryKpis.MRCommandability.notCommandable", icon: "icon", color: "#FFCD00", value: 0, count: 0 })
        };
        this.safetyStateConf = {
            title: "views.productivityInsights.secondaryKpis.MRSafetyState.title",
            icon: "assets/mobile-robotics/safe-safe.svg",
            kpis: new Map()
                .set("mr-safety-state-ACKNOWLEDGE_REQUIRED", { id: 1, title: "views.productivityInsights.secondaryKpis.MRSafetyState.acknowledgeRequired", icon: "icon", color: "#CF2027", value: 0, samples: 0 })
                .set("mr-safety-state-EMERGENCY_STOP", { id: 2, title: "views.productivityInsights.secondaryKpis.MRSafetyState.emergencyStop", icon: "icon", color: "#FF5800", value: 0, samples: 0 })
                .set("mr-safety-state-PROTECTIVE_STOP", { id: 3, title: "views.productivityInsights.secondaryKpis.MRSafetyState.protectiveStop", icon: "icon", color: "#FFCD00", value: 0, samples: 0 })
                .set("mr-safety-state-SAFE", { id: 4, title: "views.productivityInsights.secondaryKpis.MRSafetyState.safe", icon: "icon", color: "#6EC8A0", value: 0, samples: 0 })
                .set("mr-safety-state-WARNING_FIELD", { id: 5, title: "views.productivityInsights.secondaryKpis.MRSafetyState.warningField", icon: "icon", color: "#1B8642", value: 0, samples: 0 })
        };
        this.connectionStateConf = {
            title: "views.productivityInsights.secondaryKpis.MRConnection.title",
            icon: "assets/mobile-robotics/connect-graph.svg",
            kpis: new Map()
                .set("mr-connection-CONNECTED", { id: 1, title: "views.productivityInsights.secondaryKpis.MRConnection.connected", icon: "icon", color: "#CF2027", value: 0, samples: 0 })
                .set("mr-connection-UNRELIABLE", { id: 2, title: "views.productivityInsights.secondaryKpis.MRConnection.unreliable", icon: "icon", color: "#FF5800", value: 0, samples: 0 })
                .set("mr-connection-DISCONNECTED", { id: 3, title: "views.productivityInsights.secondaryKpis.MRConnection.disconnected", icon: "icon", color: "#FFCD00", value: 0, samples: 0 })
                .set("mr-connection-DISPOSED", { id: 4, title: "views.productivityInsights.secondaryKpis.MRConnection.disposed", icon: "icon", color: "#6EC8A0", value: 0, samples: 0 })
            // .set("mr-connection-UNKNOWN",        {id: 5, title: "views.productivityInsights.secondaryKpis.MRConnection.unknown",     icon: "icon", color: "color"}
        };
        this.poseReliabilityStateConf = {
            title: "views.productivityInsights.secondaryKpis.MRPoseReliability.title",
            icon: "assets/mobile-robotics/pose-graph.svg",
            kpis: new Map()
                .set("mr-pose-reliability-RELIABLE", { id: 1, title: "views.productivityInsights.secondaryKpis.MRPoseReliability.reliable", icon: "icon", color: "#CF2027", value: 0, samples: 0 })
                .set("mr-pose-reliability-UNRELIABLE", { id: 2, title: "views.productivityInsights.secondaryKpis.MRPoseReliability.undecided", icon: "icon", color: "#FF5800", value: 0, samples: 0 })
                .set("mr-pose-reliability-UNDECIDED", { id: 3, title: "views.productivityInsights.secondaryKpis.MRPoseReliability.unreliable", icon: "icon", color: "#FFCD00", value: 0, samples: 0 })
        };
        this.devicesMeta$ = this.deviceManagementService.getMobileRobotsInScope();
        this.devicesMeta$.subscribe(devices => {
            this.devicesMeta = devices;
            this.changeDetectorRef.detectChanges();
            devices.map(device => {
                console.log("Subscribing to OP  " + device.Id);
                this.operationalDataService.get(device.Id).subscribe(agvOp => {
                    this.deviceOperationalData.set(device.Id, agvOp);
                    this.update(this.commandabilityStateConf, this.getCommandabilityStates(), state => this.commandabilityStateCount = state);
                    this.update(this.poseReliabilityStateConf, this.getPoseReliabilityStates(), state => this.poseReliabilityCount = state);
                    this.update(this.connectionStateConf, this.getConnectionStates(), state => this.connectionStateCount = state);
                    this.update(this.safetyStateConf, this.getSafetyStates(), state => this.safetyStateCount = state);
                });
            });
        });
    }
    getMeanBatterySoc() {
        let vals = [...this.deviceOperationalData.values()];
        let accu = 0.0;
        vals.map(op => {
            if (op.mobilityState && op.mobilityState.battery && op.mobilityState.battery.batterySoc) {
                accu += op.mobilityState.battery.batterySoc;
            }
        });
        if (accu == 0.0)
            return 0.0;
        return (accu / vals.length) * 100.0;
    }
    getConnectionStates() {
        let vals = [...this.deviceOperationalData.values()];
        let accu = [];
        vals.map(op => {
            if (op.mobilityState && op.mobilityState.vmsMobileRobotState && op.mobilityState.vmsMobileRobotState.connectionState) {
                accu += op.mobilityState.vmsMobileRobotState.connectionState;
            }
        });
        return accu;
    }
    getCommandabilityStates() {
        let vals = [...this.deviceOperationalData.values()];
        let accu = [];
        vals.map(op => {
            if (op.mobilityState && op.mobilityState.vmsMobileRobotState && op.mobilityState.vmsMobileRobotState.commandableState) {
                accu += op.mobilityState.vmsMobileRobotState.commandableState;
            }
        });
        return accu;
    }
    getPoseReliabilityStates() {
        let vals = [...this.deviceOperationalData.values()];
        let accu = [];
        vals.map(op => {
            if (op.mobilityState && op.mobilityState.mapLocalization && op.mobilityState.mapLocalization.poseReliabilitySimple) {
                accu += op.mobilityState.mapLocalization.poseReliabilitySimple;
            }
        });
        return accu;
    }
    getSafetyStates() {
        let vals = [...this.deviceOperationalData.values()];
        let accu = [];
        vals.map(op => {
            if (op.mobilityState && op.mobilityState.safety && op.mobilityState.safety.safetyState) {
                accu += op.mobilityState.safety.safetyState;
            }
        });
        return accu;
    }
    ngOnInit() {
    }
    update(stateConfiguration, newStates, updtFunc) {
        let stateGroup = Object.assign({}, stateConfiguration);
        let newKpis = new Map();
        const AGV_COUNT = newStates.length;
        stateGroup.kpis.forEach((value, key, map) => {
            const ID = value.id;
            let COUNT = 0; // newStates.filter(val => val == ID).length;
            for (let newState of newStates) {
                if (newState == ID) {
                    COUNT++;
                }
            }
            const VALUE = COUNT * 100.0 / AGV_COUNT;
            let stateCount = Object.assign({}, value);
            stateCount.count = COUNT;
            stateCount.value = VALUE;
            newKpis.set(key, stateCount);
        });
        stateGroup.kpis = newKpis;
        updtFunc(stateGroup);
    }
};
MobileRoboticsCardComponent = __decorate([
    Component({
        selector: 'mobile-robotics-card',
        template: `
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
    }),
    __metadata("design:paramtypes", [DeviceManagementService,
        OperationalDataService,
        ChangeDetectorRef])
], MobileRoboticsCardComponent);
export { MobileRoboticsCardComponent };
//# sourceMappingURL=mobile-robotics-card.component.js.map