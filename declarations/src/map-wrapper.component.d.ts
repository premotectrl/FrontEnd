import { ElementRef, OnInit, Provider } from "@angular/core";
import { MapService } from "./map.service";
import { PublicMapService } from "./map.public.service";
export declare const MAP_SERVICE_PROVIDER: Provider;
export declare const PUBLIC_MAP_SERVICE_PROVIDER: Provider;
export declare class MapWrapperComponent implements OnInit {
    private el;
    private mapService;
    private publicMapService;
    private clientRect;
    private clientRect_$;
    private isInitialized$;
    constructor(el: ElementRef, mapService: MapService, publicMapService: PublicMapService);
    ngOnInit(): void;
    private onResize();
}
