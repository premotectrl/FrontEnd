import { OnDestroy } from "@angular/core";
import { InitializeOption, ContextMenuHandle } from "../context-menu.model";
import { Suboption } from "../context-menu.model";
export declare class ContextMenuSuboptionComponent implements OnDestroy, InitializeOption {
    private contextMenuHandle;
    private suboptions;
    constructor();
    /**
     * React to click event
     * @param event
     */
    onClick(suboption: Suboption, $event: MouseEvent): void;
    /**
     * Clean up when this directive gets destroyed
     */
    ngOnDestroy(): void;
    /**
     * Will be called after the controller has been created
     * @param isFirst
     * @param isLast
     */
    onInitializeOption(handle: ContextMenuHandle, data: Suboption[]): void;
}
