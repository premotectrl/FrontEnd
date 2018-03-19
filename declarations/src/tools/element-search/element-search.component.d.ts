import { OnInit, OnDestroy, AfterViewInit } from "@angular/core";
export interface SearchableObject {
    id: string;
    readableName: string;
    x: number;
    y: number;
    onSearch(): any;
}
export declare class ElementSearchComponent<T extends SearchableObject> implements OnInit, AfterViewInit, OnDestroy {
    private searchResultEmitter;
    private searchResetEmitter;
    private _searchableElements;
    private searchableElements;
    private searchableElements$;
    private filteredSearchObjects;
    private filteredSearchObjects_$;
    private searchCtrl;
    private objectId;
    private objectId$;
    private currentSearchObjectId;
    private singleSearch_$;
    private reset_$;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    search(searchId: string): void;
    reset(): void;
    ngOnDestroy(): void;
    private objectSelected($event);
    private filterSearchObjects(val, searchObjects);
    private resetSearch();
}
