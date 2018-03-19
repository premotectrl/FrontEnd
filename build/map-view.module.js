var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import 'zone.js';
import 'reflect-metadata'; // maybe unnecessary
import { NgModule } from '@angular/core';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { MapViewComponent } from './map-view.component';
import { MapModule, ContextMenuModule, MapControlsComponent, CoordinateSystemComponent, FullscreenControlsComponent, MapLabelComponent } from 'mobile-robotics-map-tools';
import { MobileRoboticsTabComponent } from "./mobile-robotics-tab.component";
import { MobileRoboticsCardComponent } from "./mobile-robotics-card.component";
import { MobileRoboticsTileComponent } from "./mobile-robotics-tile.component";
import { OperationalDataService } from "./services/operational-data.service";
import { TranslateDirective } from "./directives/translate.directive";
import { DeviceManagementService, DeviceManagementServiceImplementation } from "./services/device-management.service";
import { KpiService, KpiServiceImplementation } from "./services/kpi.service";
import { DeviceManagementComponent } from "./device-management.component";
import { ScalarChart } from "./components/scalar-chart.component";
let MapViewModule = class MapViewModule {
    ngDoBootstrap(appRef) {
        try {
            appRef.bootstrap(MobileRoboticsTabComponent);
        }
        catch (e) {
        }
        try {
            appRef.bootstrap(MobileRoboticsCardComponent);
        }
        catch (e) {
        }
        try {
            appRef.bootstrap(MobileRoboticsTileComponent);
        }
        catch (e) {
        }
        try {
            appRef.bootstrap(DeviceManagementComponent);
        }
        catch (e) {
        }
        try {
            appRef.bootstrap(ScalarChart);
        }
        catch (e) {
        }
    }
};
MapViewModule = __decorate([
    NgModule({
        imports: [BrowserModule, MapModule, ContextMenuModule, MatIconModule, MatButtonModule],
        providers: [OperationalDataService, { provide: DeviceManagementService, useClass: DeviceManagementServiceImplementation },
            { provide: KpiService, useClass: KpiServiceImplementation }],
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
], MapViewModule);
export { MapViewModule };
//# sourceMappingURL=map-view.module.js.map