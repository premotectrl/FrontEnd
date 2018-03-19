import { OnInit, OnDestroy, ElementRef } from "@angular/core";
import { ContextMenuService } from "../context-menu.service";
import { ContextMenu } from "../context-menu.model";
/**
 * This layer provides the context menu service and will also automaticly display the
 * context menu at the correct position if no position is given explicitly
 * You need to wrap the elements that are supposed to have a context menu with this layer
 */
export declare class ContextMenuLayerComponent implements OnInit, OnDestroy {
    private contextMenuService;
    private elementRef;
    private contextMenuSubscription;
    private transform;
    constructor(contextMenuService: ContextMenuService, elementRef: ElementRef);
    /**
     * Subscribe to changes of the context menu
     */
    ngOnInit(): void;
    /**
     * Clean up when this component gets destroyed
     */
    ngOnDestroy(): void;
    /**
     * Open the contextMenu programmatically
     * @param contextMenu
     */
    openContextMenu(contextMenu: ContextMenu): void;
    /**
     * Close the contextMenu programmatically
     * @param contextMenu
     */
    closeContextMenu(): void;
    /**
     * Disable context menu with time stamp timeStamp
     * @param contextMenu
     */
    disableContextMenuForTimestamp(timeStamp: number): void;
    /**
     * If a context menu whose position was not known on creation should be displayed
     * it will be registered in the ContextMenuService.
     * It's click event will then propagate until it reaches this layer and here it will
     * trigger this onClick function
     * @param event
     */
    private onClick($event);
    /**
     * See onClick
     */
    private onContextMenu($event);
    private onMouseDown();
    /**
     * Displays the context menu
     * @param contextMenu
     * @param event
     */
    private displayContextMenu(contextMenu, $event?);
}
