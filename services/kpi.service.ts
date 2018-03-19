import {Inject, Injectable, InjectionToken, OnDestroy} from "@angular/core";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

import {ANGULAR_1_DEVICE_MANAGEMENT_INJECTION_TOKEN, ANGULAR_1_HELPERS_INJECTION_TOKEN, ANGULAR_1_INJECTION_TOKEN, ANGULAR_1_LOCATION_INJECTION_TOKEN, ANGULAR_1_ROOT_SCOPE_INJECTION_TOKEN, ANGULAR_1_SCOPE_INJECTION_TOKEN, ANGULAR_1_STATE_INJECTION_TOKEN, ANGULAR_1_KPI_SERVICE_INJECTION_TOKEN} from "./injection-tokens";

// {name: "mr-pose-reliability-UNDECIDED", value: 0, samples: "14", start_time: "2018-03-12T15:02:41.642Z", end_time: "2018-03-13T15:02:41.642Z"}
export interface KpiResult {
    name: string;
    value: number;
    samples: string; // TODO: why is this a string?
    start_time: string;
    end_time: string;
}

export abstract class KpiService {
    abstract getForAllMobileRobotsInScope(kpis: Array<string>, from: Date, to: Date): Observable<KpiResult[]>;
}


@Injectable()
export class KpiServiceImplementation implements OnDestroy {
    private subscriptions: Map<Subject<KpiResult[]>, Observable<KpiResult[]>> = new Map();
    private REFRESH_PERIOD_MILLISECONDS: number = 10000;
    private periodicCb: number;

    constructor(
        @Inject(ANGULAR_1_INJECTION_TOKEN)                private angular,
        @Inject(ANGULAR_1_LOCATION_INJECTION_TOKEN)       private $location,
        @Inject(ANGULAR_1_STATE_INJECTION_TOKEN)          private $state,
        @Inject(ANGULAR_1_SCOPE_INJECTION_TOKEN)          private $scope,
        @Inject(ANGULAR_1_ROOT_SCOPE_INJECTION_TOKEN)     private $rootScope,
        @Inject(ANGULAR_1_HELPERS_INJECTION_TOKEN)        private Helpers,
        @Inject(ANGULAR_1_KPI_SERVICE_INJECTION_TOKEN)    private Kpis) {

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

    public getForAllMobileRobotsInScope(kpis: Array<string>, from: Date, to: Date) : Observable<KpiResult[]> {
        let aa: Subject<KpiResult[]> = new ReplaySubject(1);
        let aa$ = aa.asObservable();
        this.subscriptions.set(aa , aa$);

        this.buildRequest(kpis, from, to).then(resp => {
            aa.next(resp as KpiResult[]);
        });

        return aa$;
    }

    private buildRequest(kpis: Array<string>, from: Date, to: Date) {
        // are we in the asset scope?
        let currentName: string = null;
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

    private update() {
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
}