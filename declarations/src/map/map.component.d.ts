import { OnInit, ElementRef, OnChanges } from "@angular/core";
import { Observable } from "rxjs";
import { MapService, ViewMetaData } from "../map.service";
import { ContextMenuLayerComponent } from "../context-menu/context-menu-layer/context-menu-layer.component";
import { PublicMapService } from "../map.public.service";
export declare function onlyChanged<T>(observable: Observable<T>, hasChanged?: (last: T, current: T) => boolean): Observable<T>;
export declare class MapComponent implements OnInit, OnChanges {
    private element;
    private mapService;
    private boundingClientRect_$;
    mapData: any;
    contextMenuLayer: ContextMenuLayerComponent;
    map: any;
    publicMapService: PublicMapService;
    transform: Observable<string>;
    private panning;
    private mouseX;
    private mouseY;
    private contextMenu;
    private countPanEvents;
    private contextMenuDisabledNextTime;
    private isAnimated$;
    private onResize;
    viewMetaData: Observable<ViewMetaData>;
    constructor(element: ElementRef, mapService: MapService);
    /**
      * Initialize
      */
    ngOnInit(): void;
    /**
      * Disable pan if the left mouse button went up
      *
      * If the user rotated the map before disable the context menu with the event's timestamp
      *
      * @param event
      */
    mouseUp($event: MouseEvent): void;
    /**
      * Close the context menu if the user clicked the map
      * @param event
      */
    click($event: MouseEvent): void;
    /**
      * Zooms into the map if further zooming is allowed
      * This will also change the translation if necessary (if the user would leave the allowed area)
      * @param event
      */
    zoom($event: WheelEvent): void;
    /**
      * Sets the scale to 1
      */
    resetScale(): void;
    /**
      * This will set the transform to identity
      */
    resetTransform(): void;
    /**
      * Scale the map by the factor value
      * @param value
      */
    scale(value: number): void;
    /**
      * Rotate the map
      * @param event
      */
    rotate($event: WheelEvent): void;
    rotateLeft(): void;
    rotateRight(): void;
    /**
      * Pan the map as much as the mouse moved if panning is enabled
      * @param
      */
    pan($event: MouseEvent): void;
    /**
      * Enable panning
      * @param event
      */
    enablePan($event: MouseEvent): void;
    /**
      * Disable panning
      * @param
      */
    disablePan($event: MouseEvent): void;
    /**
      * Get size and position of this view
      */
    getBoundingClientRect(): ClientRect;
    ngOnChanges(changes: any): void;
    /**
      * Clean up when this service gets destroyed
      */
    ngOnDestroy(): void;
}
