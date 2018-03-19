import { OnInit, ElementRef } from "@angular/core";
import { MapService } from "../map.service";
export declare class MapLayerDirective implements OnInit {
    private mapService;
    private el;
    zIndex: number;
    constructor(mapService: MapService, el: ElementRef);
    /**
     * Set style of the map layer
     */
    setStyle(): void;
    /**
     * Initialize
     */
    ngOnInit(): void;
}
