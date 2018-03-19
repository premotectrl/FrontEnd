var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { MAP_SERVICE_PROVIDER, PUBLIC_MAP_SERVICE_PROVIDER, PublicMapService } from "mobile-robotics-map-tools";
let MapViewComponent = class MapViewComponent {
    constructor(publicMapService) {
        this.publicMapService = publicMapService;
        this.mapMetaData = {
            width: 200,
            height: 100,
            offsetX: 0,
            offsetY: 0,
            coordinateSystemOrigin: "lowerLeft",
            zoomRange: [0.5, 20]
        };
        this.contextMenu = {
            options: [
                {
                    title: "Reset Transform",
                    onClick: () => this.publicMapService.resetTransform()
                }
            ]
        };
    }
    ngOnInit() {
    }
};
MapViewComponent = __decorate([
    Component({
        selector: 'map-view',
        template: '<map-wrapper tabindex="0">'
            + '    <!-- Map -->'
            + '    <context-menu-layer #contextMenuLayer>'
            + '        <map [contextMenuLayer]="contextMenuLayer" [contextMenu]="contextMenu" [map]="mapMetaData" #mapComp>'
            + '             <div id="map-content" map-layer></div>'
            + '        </map>'
            + '    </context-menu-layer>'
            + '    '
            + '    <!-- Control elements -->'
            + '    <ng-container *ngIf="controlsEnabled">'
            + '        <map-controls></map-controls>'
            + '        <coordinate-system></coordinate-system>'
            + '        <fullscreen-controls *ngIf="!fullscreenEnabled" (requestFullscreen)="requestFullscreen()"></fullscreen-controls>'
            + '    </ng-container>'
            + '</map-wrapper> ',
        styles: [
            `
            :host {
                height: 500px;
                display: block;
                position: relative;
            }
            #map-content {
                background-color: rgba(0, 0, 0, 0.3);
            }
        `
        ],
        providers: [
            MAP_SERVICE_PROVIDER,
            PUBLIC_MAP_SERVICE_PROVIDER
        ]
    }),
    __metadata("design:paramtypes", [PublicMapService])
], MapViewComponent);
export { MapViewComponent };
//# sourceMappingURL=map-view.component.js.map