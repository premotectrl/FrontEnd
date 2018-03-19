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
import { DeviceManagementService } from "./services/device-management.service";
let DeviceManagementComponent = class DeviceManagementComponent {
    constructor(deviceManagementService, changeDetectorRef) {
        this.deviceManagementService = deviceManagementService;
        this.changeDetectorRef = changeDetectorRef;
        this.devices$ = this.deviceManagementService.getDevicesInScope();
        this.devices$.subscribe(devices => {
            this.devices = devices;
            this.changeDetectorRef.detectChanges();
        });
    }
    ngOnInit() {
    }
};
DeviceManagementComponent = __decorate([
    Component({
        selector: 'device-management',
        template: '<p>Number of robots: {{devices?.length}}</p>' +
            '<ul>' +
            '   <li *ngFor="let device of devices">{{device.Id}}</li>' +
            '</ul>'
    }),
    __metadata("design:paramtypes", [DeviceManagementService,
        ChangeDetectorRef])
], DeviceManagementComponent);
export { DeviceManagementComponent };
//# sourceMappingURL=device-management.component.js.map