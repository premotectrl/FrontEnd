import { OnInit, OnChanges } from "@angular/core";
import { MapService } from "../../map.service";
export declare class MapLabelComponent implements OnInit, OnChanges {
    private mapService;
    private static ALIGNMENT;
    private translate$;
    private transform;
    private translate;
    private alignmentTranslate;
    private transformType;
    private position;
    private alignment;
    private transition;
    private maxGrow;
    constructor(mapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
}
