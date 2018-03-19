import { OnInit, OnChanges, ElementRef, OnDestroy } from "@angular/core";
import { MapService } from "../map.service";
export declare class ImageDirective implements OnInit, OnChanges, OnDestroy {
    private mapService;
    private el;
    private transform_$;
    private translate;
    position: {
        x: number;
        y: number;
    };
    constructor(mapService: MapService, el: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
}
