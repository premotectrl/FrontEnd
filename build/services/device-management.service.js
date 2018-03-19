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
import { ANGULAR_1_DEVICE_MANAGEMENT_INJECTION_TOKEN, ANGULAR_1_HELPERS_INJECTION_TOKEN, ANGULAR_1_INJECTION_TOKEN, ANGULAR_1_LOCATION_INJECTION_TOKEN, ANGULAR_1_ROOT_SCOPE_INJECTION_TOKEN, ANGULAR_1_SCOPE_INJECTION_TOKEN, ANGULAR_1_STATE_INJECTION_TOKEN } from "./injection-tokens";
export class DeviceManagementService {
}
let DeviceManagementServiceImplementation = class DeviceManagementServiceImplementation {
    constructor(angular, $location, $state, $scope, $rootScope, Helpers, DeviceManagement) {
        this.angular = angular;
        this.$location = $location;
        this.$state = $state;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.Helpers = Helpers;
        this.DeviceManagement = DeviceManagement;
        this.devices = new ReplaySubject(1);
        this.devices$ = this.devices.asObservable();
        this.currentScopeName = new ReplaySubject(1);
        this.currentScopeName$ = this.currentScopeName.asObservable();
        this.update();
        this.$rootScope.$on('$stateChangeSuccess', () => {
            this.update();
        });
    }
    getDevicesInScope() {
        return this.devices$;
    }
    getMobileRobotsInScope() {
        return this.devices$.map(devices => {
            return devices.filter(device => {
                return this.isMobileRobot(device);
            });
        });
    }
    // public getCurrentScopeName(): Observable<string> {
    //     // return this.$scope.globalState.navContext[this.$scope.globalState.navContext.length - 1].name;
    //     return this.currentScopeName$;
    // }
    // TODO: move to a helper
    // TODO: includes is not supported by IE
    isMobileRobot(device) {
        return device.Model &&
            (device.Model.toUpperCase().includes("KMP") ||
                device.Model.toUpperCase().includes("KMR"));
    }
    // private getName(): string {
    //     let globalState = this.$scope.globalState;
    //     let navContext = this.$scope.globalState.navContext;
    //     let navContextLen = this.$scope.globalState.navContext.length;
    //
    //     console.log("Nav Global State: ", globalState);
    //     console.log("Nav Context: ", navContext);
    //     console.log("Nav Context length: ", navContextLen);
    //     console.log("Nav Context spe: ", navContext[navContextLen - 1]);
    //
    //     return globalState.getContextLeafName();
    //     // return navContext[navContextLen - 1].name;
    // }
    update() {
        if (this.$state.is("asset")) {
            this.DeviceManagement.device(this.$scope.assetId).then((device) => {
                this.devices.next([device]);
                // this.currentScopeName.next(this.getName());
            });
        }
        else if (this.$state.is('sites.site-assets')) {
            const siteId = this.Helpers.getSiteId(this.$location.path());
            this.DeviceManagement.site(siteId).then((devices) => {
                if (devices) {
                    this.devices.next(devices);
                    // this.currentScopeName.next(this.getName());
                }
            });
        }
        else {
            this.DeviceManagement.all(['ID', 'NAME', 'MODEL_NAME']).then((devices) => {
                if (devices) {
                    this.devices.next(devices);
                    // this.currentScopeName.next(this.getName());
                }
            });
        }
    }
};
DeviceManagementServiceImplementation = __decorate([
    Injectable(),
    __param(0, Inject(ANGULAR_1_INJECTION_TOKEN)),
    __param(1, Inject(ANGULAR_1_LOCATION_INJECTION_TOKEN)),
    __param(2, Inject(ANGULAR_1_STATE_INJECTION_TOKEN)),
    __param(3, Inject(ANGULAR_1_SCOPE_INJECTION_TOKEN)),
    __param(4, Inject(ANGULAR_1_ROOT_SCOPE_INJECTION_TOKEN)),
    __param(5, Inject(ANGULAR_1_HELPERS_INJECTION_TOKEN)),
    __param(6, Inject(ANGULAR_1_DEVICE_MANAGEMENT_INJECTION_TOKEN)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], DeviceManagementServiceImplementation);
export { DeviceManagementServiceImplementation };
//# sourceMappingURL=device-management.service.js.map