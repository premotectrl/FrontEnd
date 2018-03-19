import {Inject, Injectable, InjectionToken, Injector} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";
import { ANGULAR_1_DEVICE_MANAGEMENT_INJECTION_TOKEN, ANGULAR_1_HELPERS_INJECTION_TOKEN, ANGULAR_1_INJECTION_TOKEN, ANGULAR_1_LOCATION_INJECTION_TOKEN, ANGULAR_1_ROOT_SCOPE_INJECTION_TOKEN, ANGULAR_1_SCOPE_INJECTION_TOKEN, ANGULAR_1_STATE_INJECTION_TOKEN } from "./injection-tokens";

export abstract class DeviceManagementService {
    abstract getDevicesInScope(): Observable<any[]>;
    abstract getMobileRobotsInScope(): Observable<any[]>;
    // abstract getCurrentScopeName(): Observable<string>;
}




@Injectable()
export class DeviceManagementServiceImplementation {
    private devices: Subject<any[]> = new ReplaySubject(1);
    private devices$ = this.devices.asObservable();

    private currentScopeName: Subject<string> = new ReplaySubject(1);
    private currentScopeName$ = this.currentScopeName.asObservable();

    constructor(
        @Inject(ANGULAR_1_INJECTION_TOKEN) private angular,
        @Inject(ANGULAR_1_LOCATION_INJECTION_TOKEN) private $location,
        @Inject(ANGULAR_1_STATE_INJECTION_TOKEN) private $state,
        @Inject(ANGULAR_1_SCOPE_INJECTION_TOKEN) private $scope,
        @Inject(ANGULAR_1_ROOT_SCOPE_INJECTION_TOKEN) private $rootScope,
        @Inject(ANGULAR_1_HELPERS_INJECTION_TOKEN) private Helpers,
        @Inject(ANGULAR_1_DEVICE_MANAGEMENT_INJECTION_TOKEN) private DeviceManagement) {

        this.update();
        this.$rootScope.$on('$stateChangeSuccess', () => {
            this.update();
        });
    }

    public getDevicesInScope() : Observable<any[]> {
        return this.devices$;
    }

    public getMobileRobotsInScope() : Observable<any[]> {
        return this.devices$.map(devices => {
            return devices.filter(device => {
                return this.isMobileRobot(device)
            })
        });
    }

    // public getCurrentScopeName(): Observable<string> {
    //     // return this.$scope.globalState.navContext[this.$scope.globalState.navContext.length - 1].name;
    //     return this.currentScopeName$;
    // }

    // TODO: move to a helper
    // TODO: includes is not supported by IE
    private isMobileRobot(device): Boolean {
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

    private update() {

        if (this.$state.is("asset")) {    // we are an asset
            this.DeviceManagement.device(this.$scope.assetId).then((device) => {
                this.devices.next([device]);
                // this.currentScopeName.next(this.getName());
            });
        }

        else if (this.$state.is('sites.site-assets')) {  // We are a site
            const siteId: string = this.Helpers.getSiteId(this.$location.path());
            this.DeviceManagement.site(siteId).then((devices) => {
                if (devices) {
                    this.devices.next(devices);
                    // this.currentScopeName.next(this.getName());
                }
            });
        }

        else {                                      // all devices for the current user
            this.DeviceManagement.all(['ID', 'NAME', 'MODEL_NAME']).then((devices) => {
                if (devices) {
                    this.devices.next(devices);
                    // this.currentScopeName.next(this.getName());
                }
            });
        }
    }
}