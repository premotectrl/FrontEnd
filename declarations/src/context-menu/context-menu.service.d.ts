import { OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ContextMenu } from "./context-menu.model";
export declare class ContextMenuService implements OnDestroy {
    private static CONTEXT_MENU_MARGIN;
    private getClientRect;
    private currentContextMenu;
    private contextMenu;
    private contextMenu$;
    private disabledTimestamp;
    constructor();
    /**
     * Open contextMenu as next context menu as soon as it's position is known
     * provide a timestamp so that the event can be identified correctly
     * @param contextMenu
     * @param timeStamp
     */
    setCurrentContextMenu(contextMenu: ContextMenu, timeStamp: number): void;
    /**
     * Set the getter for the client rect of the context menu layer
     */
    setClientRectSource(getClientRect: () => ClientRect): void;
    /**
     * Open a context menu like defined in contextMenu
     * @param contextMenu
     */
    openContextMenu(contextMenu: ContextMenu): void;
    /**
     * Close the current context menu
     */
    closeContextMenu(): void;
    /**
     * Returns an obsrevable of the context menu
     */
    getContextMenu(): Observable<ContextMenu>;
    /**
     * Returns the context menu that should be displayed next but whose position is not yed known
     * (also contains a timestamp of the event so that it will not be displayed accidentally)
     */
    getCurrentContextMenu(): {
        contextMenu: ContextMenu;
        timeStamp: number;
    };
    /**
     * When someone tries to display the context menu with this timestamp it will not be displayed
     * (For example if the click event was created because of another action and displaying a context menu is not desired)
     * @param timeStamp
     */
    disableContextMenuForTimestamp(timeStamp: number): void;
    /**
     * Returns a transform string to correct the translation of the context menu if
     * the context menu with the given properties would exceed the borders of the context menu layer
     */
    getTranslationCorrection(clientRectContextMenu: ClientRect): string;
    /**
     * Clean up when this service gets destroyed
     */
    ngOnDestroy(): void;
}
