import 'zone.js';
import 'reflect-metadata'; // maybe unnecessary
import {InjectionToken, NgModule} from '@angular/core';
import {MatIconModule, MatButtonModule}      from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {MapViewComponent} from './map-view.component';
import { MapModule, ContextMenuModule, MapControlsComponent, CoordinateSystemComponent, FullscreenControlsComponent, MapLabelComponent } from 'mobile-robotics-map-tools';
import {MobileRoboticsTabComponent} from "./mobile-robotics-tab.component";
import {MobileRoboticsCardComponent} from "./mobile-robotics-card.component";
import {MobileRoboticsTileComponent} from "./mobile-robotics-tile.component";
import {OperationalDataService} from "./services/operational-data.service";
import {TranslateDirective} from "./directives/translate.directive";
import {
    DeviceManagementService,
    DeviceManagementServiceImplementation
} from "./services/device-management.service";
import {
    KpiService,
    KpiServiceImplementation
} from "./services/kpi.service";


import {DeviceManagementComponent} from "./device-management.component";
import { ApplicationRef } from '@angular/core/src/application_ref';
import {ScalarChart} from "./components/scalar-chart.component";

@NgModule({
    imports:      [ BrowserModule, MapModule, ContextMenuModule, MatIconModule, MatButtonModule],
    providers:    [ OperationalDataService, { provide: DeviceManagementService, useClass: DeviceManagementServiceImplementation },
        { provide: KpiService, useClass: KpiServiceImplementation } ],
    declarations: [
        MapViewComponent,
        MobileRoboticsTabComponent,
        MobileRoboticsCardComponent,
        MobileRoboticsTileComponent,
        MapControlsComponent,
        CoordinateSystemComponent,
        FullscreenControlsComponent,
        MapLabelComponent,
        DeviceManagementComponent,
        ScalarChart,
        TranslateDirective,
    ],
    entryComponents: [MobileRoboticsTabComponent, MobileRoboticsCardComponent, MobileRoboticsTileComponent, DeviceManagementComponent, ScalarChart]
})


export class MapViewModule {
    ngDoBootstrap(appRef: ApplicationRef) {
        try {
            appRef.bootstrap(MobileRoboticsTabComponent);
        } catch (e) {

        }
        try {
            appRef.bootstrap(MobileRoboticsCardComponent);
        } catch (e) {

        }
        try {
            appRef.bootstrap(MobileRoboticsTileComponent);
        } catch (e) {

        }

        try {
            appRef.bootstrap(DeviceManagementComponent);
        } catch (e) {
            
        }

        try {
            appRef.bootstrap(ScalarChart);
        } catch (e) {

        }
    }
 }
