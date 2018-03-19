import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
import {DeviceManagementService} from "./services/device-management.service";

@Component({
    selector: 'mobile-robotics-tile',
    template:
    `
        <div class="col-xs-12 table-container" style="padding: 0">
            <table align="center">
                <tr>
                    <td>
                        <span id="faults-tile-fault-count" [ngClass]="['badge loose-badge', numberOfMobileRobots <= 0 ? 'badge-danger' : 'badge-kuka-gray']">{{numberOfMobileRobots}}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span [ngClass]="{error: numberOfMobileRobots <= 0}">AGVs in the current scope</span>
                    </td>
                </tr>
            </table>
        </div>
    `
})
export class MobileRoboticsTileComponent {
    private numberOfMobileRobots: number = 0;

    constructor(private deviceManagementService: DeviceManagementService,
                private changeDetectorRef: ChangeDetectorRef) {
        this.deviceManagementService.getMobileRobotsInScope().subscribe(devices => {
            this.numberOfMobileRobots = devices.length;
            this.changeDetectorRef.detectChanges();
        });
    }
}