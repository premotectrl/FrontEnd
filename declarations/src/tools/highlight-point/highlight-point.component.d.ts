import { OnInit, OnDestroy } from "@angular/core";
import { PublicMapService } from "../../map.public.service";
import { DomSanitizer } from "@angular/platform-browser";
export declare class HighlightPointComponent implements OnDestroy, OnInit {
    private publicMapService;
    private domSanitizer;
    private x;
    private y;
    private active;
    private point;
    private readonly transform;
    constructor(publicMapService: PublicMapService, domSanitizer: DomSanitizer);
    ngOnDestroy(): void;
    ngOnInit(): void;
}
