var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ANGULAR_1_HELPERS_INJECTION_TOKEN, ANGULAR_1_INJECTION_TOKEN, ANGULAR_1_LOCATION_INJECTION_TOKEN, ANGULAR_1_ROOT_SCOPE_INJECTION_TOKEN, ANGULAR_1_SCOPE_INJECTION_TOKEN, ANGULAR_1_STATE_INJECTION_TOKEN, ANGULAR_1_KPI_SERVICE_INJECTION_TOKEN } from "./injection-tokens";
export class KpiService {
}
let KpiServiceImplementation = class KpiServiceImplementation {
    constructor(angular, $location, $state, $scope, $rootScope, Helpers, Kpis) {
        this.angular = angular;
        this.$location = $location;
        this.$state = $state;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.Helpers = Helpers;
        this.Kpis = Kpis;
        this.subscriptions = new Map();
        this.REFRESH_PERIOD_MILLISECONDS = 10000;
        // refresh all Kpis every X seconds
        this.periodicCb = setInterval(() => {
            this.update();
        }, this.REFRESH_PERIOD_MILLISECONDS);
        // refresh all Kpis on state change
        this.$rootScope.$on('$stateChangeSuccess', () => {
            this.update();
        });
    }
    ngOnDestroy() {
        clearInterval(this.periodicCb);
        this.subscriptions.clear();
    }
    getForAllMobileRobotsInScope(kpis, from, to) {
        let aa = new ReplaySubject(1);
        let aa$ = aa.asObservable();
        this.subscriptions.set(aa, aa$);
        this.buildRequest(kpis, from, to).then(resp => {
            aa.next(resp);
        });
        return aa$;
    }
    buildRequest(kpis, from, to) {
        // are we in the asset scope?
        let currentName = null;
        if (this.$state && this.$state.current && this.$state.current.name) {
            currentName = this.$state && this.$state.current && this.$state.current.name;
        }
        if (currentName && currentName === "asset") {
            console.debug("KPI service: asset mode");
            return this.Kpis.byDevice(this.$state.params.assetId, from, to, kpis, false);
        }
        else if (currentName && currentName === "site-assets") {
            console.debug("KPI service: site mode");
            return this.Kpis.bySite(this.$state.params.siteId, from, to, kpis, false);
        }
        else {
            console.debug("KPI service: global mode");
            return this.Kpis.allSites(from, to, kpis, false);
        }
    }
    update() {
        // console.log("Updating KPI");
        // TODO: get all subscriptions, call again the endpoint and notify subscribers. Postponed for the moment.
        // console.log("---> view scope: ", this.$state.current.name);  // current : {name: "asset", url: "/asset/:assetId", views: {…}, resolve: {…}, data: {…}, …}
        /*
        params {
            assetId:"8994c3d4-a148-3770-9868-3b4864f97100"
            siteId:"1AH6FYhuSYqMgYN7Zviq2g"
            siteName:"Team Navigation"
        }
         */
    }
};
KpiServiceImplementation = __decorate([
    Injectable(),
    __param(0, Inject(ANGULAR_1_INJECTION_TOKEN)),
    __param(1, Inject(ANGULAR_1_LOCATION_INJECTION_TOKEN)),
    __param(2, Inject(ANGULAR_1_STATE_INJECTION_TOKEN)),
    __param(3, Inject(ANGULAR_1_SCOPE_INJECTION_TOKEN)),
    __param(4, Inject(ANGULAR_1_ROOT_SCOPE_INJECTION_TOKEN)),
    __param(5, Inject(ANGULAR_1_HELPERS_INJECTION_TOKEN)),
    __param(6, Inject(ANGULAR_1_KPI_SERVICE_INJECTION_TOKEN)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], KpiServiceImplementation);
export { KpiServiceImplementation };
//# sourceMappingURL=kpi.service.js.map