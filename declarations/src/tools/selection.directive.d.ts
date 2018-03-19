import { ElementRef, Renderer2 } from "@angular/core";
export interface Selection {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    startEvent: MouseEvent;
}
export declare class SelectionDirective {
    private elementRef;
    private renderer;
    private document;
    private static MIN_COUNT;
    private selection;
    private xStart;
    private yStart;
    private eventTimeStamp;
    private count;
    private startEvent;
    private selectionEmitter;
    constructor(elementRef: ElementRef, renderer: Renderer2, document: Document);
    onStartSelection($event: MouseEvent): void;
    onChangeSelection($event: MouseEvent): void;
    onStopSelection($event: MouseEvent): void;
    private onContextMenu($event);
}
