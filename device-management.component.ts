import {Component, Injectable, Inject, forwardRef, ChangeDetectorRef} from "@angular/core";
import { MAP_SERVICE_PROVIDER, PUBLIC_MAP_SERVICE_PROVIDER, PublicMapService } from "mobile-robotics-map-tools";
import {DeviceManagementService} from "./services/device-management.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'device-management',
    template:
    '<p>Number of robots: {{devices?.length}}</p>' +
    '<ul>' +
    '   <li *ngFor="let device of devices">{{device.Id}}</li>' +
    '</ul>'
})
export class DeviceManagementComponent {
    private devices$: Observable<any[]>;
    private devices: any[];
    constructor(
        private deviceManagementService: DeviceManagementService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
        this.devices$ = this.deviceManagementService.getDevicesInScope();

        this.devices$.subscribe(devices => {
            this.devices = devices;
            this.changeDetectorRef.detectChanges();
        })
    }

    ngOnInit() {
    }
}
