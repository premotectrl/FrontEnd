import { Renderer, AfterViewInit, OnDestroy, ComponentFactoryResolver } from "@angular/core";
import { ContextMenuHandle, ComplexOption } from "../context-menu.model";
import { ContextMenuService } from "../context-menu.service";
export declare class ComplexOptionDirective<T> implements AfterViewInit, OnDestroy {
    private componentFactoryResolver;
    private contextMenuService;
    private renderer;
    option: ComplexOption<T> | null;
    private viewContainerRef;
    private ref;
    constructor(componentFactoryResolver: ComponentFactoryResolver, contextMenuService: ContextMenuService, renderer: Renderer);
    /**
     * Create an instance of the controller and insert it into the html
     */
    ngAfterViewInit(): void;
    /**
     * Creates a handle to the current context menu
     */
    createContextMenuHandle(): ContextMenuHandle;
    /**
     * Clean up when this directive gets destroyed
     */
    ngOnDestroy(): void;
}
