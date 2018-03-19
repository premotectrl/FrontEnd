import { ContextMenuHandle, InitializeOption } from "../context-menu.model";
import { OnDestroy } from "@angular/core";
export declare class ContextMenuSimpleOptionComponent implements OnDestroy, InitializeOption {
    title: string;
    onClick: ($event: MouseEvent) => any;
    private contextMenuHandle;
    constructor();
    /**
     * React to click event
     * @param event
     */
    click($event: MouseEvent): void;
    /**
     * Clean up when this directive gets destroyed
     */
    ngOnDestroy(): void;
    /**
     * Will be called after the controller has been created
     * @param isFirst
     * @param isLast
     */
    onInitializeOption(handle: ContextMenuHandle, data: any): void;
}
