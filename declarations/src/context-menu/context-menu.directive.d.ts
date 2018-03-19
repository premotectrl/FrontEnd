import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ContextMenu } from "./context-menu.model";
import { ContextMenuService } from "./context-menu.service";
export declare class ContextMenuDirective implements OnInit, OnDestroy {
    private contextMenuService;
    private el;
    private contextMenu;
    private click;
    private contextMenuPosition;
    constructor(contextMenuService: ContextMenuService, el: ElementRef);
    /**
     * Initialize
     */
    ngOnInit(): void;
    /**
     * Enable pointer events for this element
     * and show pointer cursor as cursor
     */
    setStyle(): void;
    /**
     * Open the click context menu
     * @param event
     */
    onClick($event: MouseEvent): void;
    /**
     * Open the "contextmenu" context menu
     * @param event
     */
    onContextMenu($event: MouseEvent): void;
    /**
     * Show the contextMenu
     * @param contextMenu
     */
    showContextMenu($event: MouseEvent, contextMenu: ContextMenu): void;
    /**
     * Clean up when the directive is being destroyed
     */
    ngOnDestroy(): void;
}
