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
import { KpiService } from "./services/kpi.service";
let MobileRoboticsTabComponent = class MobileRoboticsTabComponent {
    constructor(operationalDataService, kpiService, changeDetectorRef) {
        this.operationalDataService = operationalDataService;
        this.kpiService = kpiService;
        this.changeDetectorRef = changeDetectorRef;
        this.safetyStateKpi = null;
        this.safetyStateKpiConf = {
            title: "views.productivityInsights.secondaryKpis.MRSafetyState.title",
            icon: "assets/mobile-robotics/safe-safe.svg",
            kpis: new Map().
                set("mr-safety-state-ACKNOWLEDGE_REQUIRED", { id: "mr-safety-state-ACKNOWLEDGE_REQUIRED", title: "acknowledge Required", icon: "./assets/mobile-robotics/safe-ack.svg", color: "#9F547D", value: 0, samples: "0" })
                .set("mr-safety-state-EMERGENCY_STOP", { id: "mr-safety-state-EMERGENCY_STOP", title: "emergency Stop", icon: "./assets/mobile-robotics/safe-estop.svg", color: "#CF2027", value: 0, samples: "0" })
                .set("mr-safety-state-PROTECTIVE_STOP", { id: "mr-safety-state-PROTECTIVE_STOP", title: "protective Stop", icon: "./assets/mobile-robotics/safe-protected.svg", color: "#FF5800", value: 0, samples: "0" })
                .set("mr-safety-state-SAFE", { id: "mr-safety-state-SAFE", title: "safe", icon: "./assets/mobile-robotics/safe-safe.svg", color: "#1B8642", value: 0, samples: "0" })
                .set("mr-safety-state-WARNING_FIELD", { id: "mr-safety-state-WARNING_FIELD", title: "warning Field", icon: "./assets/mobile-robotics/safe-warning.svg", color: "#FFCD00", value: 0, samples: "0" })
        };
        this.connectionStateKpi = null;
        this.connectionStateKpiConf = {
            title: "views.productivityInsights.secondaryKpis.MRConnection.title",
            icon: "assets/mobile-robotics/icon/connect-graph.svg",
            kpis: new Map()
                .set("mr-connection-CONNECTED", { id: "mr-connection-CONNECTED", title: "connected", icon: "icon", color: "#CF2027", value: 0, samples: "0" })
                .set("mr-connection-UNRELIABLE", { id: "mr-connection-UNRELIABLE", title: "unreliable", icon: "icon", color: "#FF5800", value: 0, samples: "0" })
                .set("mr-connection-DISCONNECTED", { id: "mr-connection-DISCONNECTED", title: "disconnected", icon: "icon", color: "#FFCD00", value: 0, samples: "0" })
                .set("mr-connection-DISPOSED", { id: "mr-connection-DISPOSED", title: "disposed", icon: "icon", color: "#6EC8A0", value: 0, samples: "0" })
            // .set("mr-connection-UNKNOWN", {id: "mr-connection-UNKNOWN",                        title: "views.productivityInsights.secondaryKpis.MRConnection.unknown",             icon: "icon", color: "color"}
        };
        this.poseReliabilityKpi = null;
        this.poseReliabilityKpiConf = {
            title: "views.productivityInsights.secondaryKpis.MRPoseReliability.title",
            icon: "assets/mobile-robotics/pose-graph.svg",
            kpis: new Map()
                .set("mr-pose-reliability-RELIABLE", { id: "mr-pose-reliability-RELIABLE", title: "reliable", icon: "icon", color: "#CF2027", value: 0, samples: "0" })
                .set("mr-pose-reliability-UNRELIABLE", { id: "mr-pose-reliability-UNRELIABLE", title: "undecided", icon: "icon", color: "#FF5800", value: 0, samples: "0" })
                .set("mr-pose-reliability-UNDECIDED", { id: "mr-pose-reliability-UNDECIDED", title: "unreliable", icon: "icon", color: "#FFCD00", value: 0, samples: "0" })
            // .set({id: "mr-pose-reliability-UNKNOWN",                  title: "iews.productivityInsights.secondaryKpis.MRPoseReliability.unknown", icon: "icon", color: "color"},
        };
        this.commandabilityKpi = null;
        this.commandabilityKpiConf = {
            title: "views.productivityInsights.secondaryKpis.MRCommandability.title",
            icon: "assets/mobile-robotics/command-graph.svg",
            kpis: new Map()
                .set("mr-commandability-COMMANDABLE", { id: "mr-commandability-COMMANDABLE", title: "commandable", icon: "icon", color: "#CF2027", value: 0, samples: "0" })
                .set("mr-commandability-TEMPORARILY_NOT_COMMANDABLE", { id: "mr-commandability-TEMPORARILY_NOT_COMMANDABLE", title: "temporarilyNotCommandable", icon: "icon", color: "#FF5800", value: 0, samples: "0" })
                .set("mr-commandability-NOT_COMMANDABLE", { id: "mr-commandability-NOT_COMMANDABLE", title: "notCommandable", icon: "icon", color: "#FFCD00", value: 0, samples: "0" })
        };
    }
    ngOnInit() {
        this.update();
    }
    ngOnDestroy() {
    }
    update() {
        let endTime = new Date(Date.now());
        let startTime = new Date(Date.now());
        startTime.setDate(endTime.getDate() - 7);
        this.pollKpi(this.safetyStateKpiConf, startTime, endTime);
        this.pollKpi(this.connectionStateKpiConf, startTime, endTime);
        this.pollKpi(this.poseReliabilityKpiConf, startTime, endTime);
        this.pollKpi(this.commandabilityKpiConf, startTime, endTime);
    }
    // TODO: get rid of that...
    triggerRefresh(state) {
        if (state.title === "views.productivityInsights.secondaryKpis.MRSafetyState.title") {
            this.safetyStateKpi = state;
        }
        else if (state.title === "views.productivityInsights.secondaryKpis.MRConnection.title") {
            this.connectionStateKpi = state;
        }
        else if (state.title === "views.productivityInsights.secondaryKpis.MRPoseReliability.title") {
            this.poseReliabilityKpi = state;
        }
        else if (state.title === "views.productivityInsights.secondaryKpis.MRCommandability.title") {
            this.commandabilityKpi = state;
        }
    }
    pollKpi(config, from, to) {
        this.kpiService.getForAllMobileRobotsInScope(Array.from(config.kpis).map(([k, aa]) => aa.id), from, to)
            .subscribe((result) => {
            let tmp = config;
            tmp.kpis.forEach(kpiConf => {
                let _kpiConf = kpiConf;
                result.forEach(res => {
                    if (res.name == _kpiConf.id) {
                        _kpiConf.value = res.value;
                        _kpiConf.count = parseInt(res.samples);
                    }
                    return res;
                });
                return _kpiConf;
            });
            this.triggerRefresh(tmp);
        });
    }
};
MobileRoboticsTabComponent = __decorate([
    Component({
        selector: 'mobile-robotics-tab',
        template: `
        <map-view></map-view>
        <!-- <div id="KpisContainer">
            <div class ="row"> 
                <div class="col-lg-6 "> 
                    <scalar-chart *ngIf="safetyStateKpi" [chartConfig]="safetyStateKpi"> </scalar-chart>
                </div>
                <div class="col-lg-6"> 
                    <scalar-chart *ngIf="poseReliabilityKpi" [chartConfig]="poseReliabilityKpi"> </scalar-chart>
                 </div>
            </div>

            <div class ="row"> 
                <div class="col-lg-6">
                  <scalar-chart *ngIf="connectionStateKpi" [chartConfig]="connectionStateKpi"> </scalar-chart>
                 </div>
                 <div class="col-lg-6">
                    <scalar-chart *ngIf="commandabilityKpi" [chartConfig]="commandabilityKpi">  </scalar-chart>
                </div>
            </div>
        </div> -->
        <div class ="row"> 
            <div id="KpisContainer" class="col-xs-12 col-md-6 col-lg-6">
                <scalar-chart *ngIf="safetyStateKpi" [chartConfig]="safetyStateKpi"> </scalar-chart>
            </div>
            <div id="KpisContainer" class="col-xs-12  col-md-6 col-lg-6">
                <scalar-chart *ngIf="poseReliabilityKpi" [chartConfig]="poseReliabilityKpi"> </scalar-chart>
            </div>
        </div> 
        <div class ="row"> 
            <div id="KpisContainer" class="col-xs-12 col-md-6 col-lg-6">
                <scalar-chart *ngIf="connectionStateKpi" [chartConfig]="connectionStateKpi"> </scalar-chart>
            </div>
            <div id="KpisContainer" class="col-xs-12  col-md-6 col-lg-6">
                <scalar-chart *ngIf="commandabilityKpi" [chartConfig]="commandabilityKpi">  </scalar-chart>
            </div>
        </div> 
    `,
        styles: [
            `
            /* style here ! this is less -> have a look at map-view.component.ts */
        `
        ],
    }),
    __metadata("design:paramtypes", [OperationalDataService,
        KpiService,
        ChangeDetectorRef])
], MobileRoboticsTabComponent);
export { MobileRoboticsTabComponent };
//# sourceMappingURL=mobile-robotics-tab.component.js.map