import {Component, Injectable, Inject, forwardRef} from "@angular/core";
import { MAP_SERVICE_PROVIDER, PUBLIC_MAP_SERVICE_PROVIDER, PublicMapService } from "mobile-robotics-map-tools";

@Component({
    selector: 'map-view',
    template:
    '<map-wrapper tabindex="0">'
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
})
export class MapViewComponent {
    private mapMetaData = {
        width: 200,
        height: 100,
        offsetX: 0,
        offsetY: 0,
        coordinateSystemOrigin: "lowerLeft",
        zoomRange: [0.5, 20]
    };
    contextMenu = {
        options: [
            {
                title: "Reset Transform",
                onClick: () => this.publicMapService.resetTransform()
            }
        ]
    };
    constructor(
        private publicMapService: PublicMapService,
    ) {
    }

    ngOnInit() {
    }
}
