import { OnInit, OnDestroy, ElementRef } from "@angular/core";
import { ContextMenu, ContextMenuOption } from "../context-menu.model";
import { ContextMenuService } from "../context-menu.service";
export declare class ContextMenuComponent implements OnInit, OnDestroy {
    private contextMenuService;
    private show;
    private contextMenu;
    private contextMenuSubscription;
    private atLeastOne;
    wrapper: ElementRef;
    private translationCorrection;
    private contextMenuOpacity;
    constructor(contextMenuService: ContextMenuService);
    /**
     * subscribe to context menus
     */
    ngOnInit(): void;
    /**
     * Add controller to the SimpleOption to create a ComplexOption
     * Because a single SimpleOption cannot be displayed itself
     * @param option
     */
    private createComplexOption(option);
    /**
     * Open a new context menu like specified in contextMenu
     * The context menu must be placed by moving the container of it
     * because this method will only create the context menu
     * @param contextMenu
     */
    open(contextMenu: ContextMenu): void;
    /**
     * Hide context menu
     * @param event
     */
    close(event: MouseEvent): void;
    /**
     * Check if contextMenu can be displayed
     * @param contextMenu
     */
    isValidContextMenu(contextMenu: ContextMenu): boolean;
    /**
     * Stop event propagation (if option.propagateEvents is not true) to prevent the clicking on
     * the context menu to also cause a click event on elements below the context menu
     * @param event
     * @param option
     */
    event($event: MouseEvent, option: ContextMenuOption): void;
    /**
     * Clean up when the controller is being destroyed
     */
    ngOnDestroy(): void;
}
