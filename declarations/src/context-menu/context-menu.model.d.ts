import { Type } from "@angular/core";
import { Observable } from "rxjs";
export interface ContextMenu {
    position?: {
        x: number;
        y: number;
    };
    options: (ComplexOption<any> | SimpleOption)[];
}
export interface SimpleOption extends ContextMenuOption {
    title: string;
    onClick: (event: MouseEvent) => void;
}
export interface ComplexOption<T> extends ContextMenuOption {
    component: Type<T>;
    onCreate: (component: T) => any;
    data?: any;
}
export interface Suboption {
    onClick: ($event: MouseEvent) => any;
    title: string;
}
export interface ContextMenuOption {
    /**
     * observable that indicates that privileges that are required to display
     * this context menu option are currently granted
     */
    privileges?: Observable<boolean>;
    /**
     * observable that indicates if the context menu is to be displayed
     */
    enabled?: Observable<boolean>;
    /**
     * propagate events on the option if true
     */
    propagateEvents?: boolean;
    /**
     * indicates that this option is only a header which means the font will be fat
     * and it will not be highlighted when hovered with the mouse
     */
    isHeader?: boolean;
}
/**
 * Typeguard for Type SimpleOption
 * @param option
 */
export declare function isSimpleOption(option: any): option is SimpleOption;
/**
 * Typeguard for Type SimpleOption
 * @param option
 */
export declare function isComplexOption(option: any): option is ComplexOption<any>;
/**
 * Interface to be implemented by any suboption that
 * can be initialized with information about this suboption
 */
export interface InitializeOption {
    onInitializeOption(handle: ContextMenuHandle, data: any): void;
}
/**
 * Typeguard for InitializeOption
 * @param object
 */
export declare function implementsInitializeOption(object: Object): object is InitializeOption;
export interface ContextMenuHandle {
    close: () => void;
}
