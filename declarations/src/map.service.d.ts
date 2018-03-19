import { OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { TransformMatrix } from "./transform-matrix";
import { PublicMapService } from "./map.public.service";
export interface Position {
    x: number;
    y: number;
}
export interface ViewMetaData {
    width: number;
    height: number;
    resolution?: number;
    offsetX: number;
    offsetY: number;
    originCorrectionMatrix: TransformMatrix;
    center: Position;
}
export interface MapMetaData {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    coordinateSystemOrigin: "upperLeft" | "upperRight" | "lowerLeft" | "lowerRight";
    zoomRange: [number, number];
}
export declare class MapService extends PublicMapService implements OnDestroy {
    /**
     * Transform matrix that is responsible for rotation, zoom and translation of the map
     */
    private currentMatrix;
    private matrix;
    private matrix$;
    /**
     * Dimensions of the view
     */
    private currentClientRect;
    private clientRect;
    private clientRect$;
    /**
     * This matrix will correct the origin of the map (normally
     *  the origin would be in left upper corner but with the origin
     * correction it will be in the left lower corner)
     */
    private originCorrectionMatrix$;
    /**
     *  coordinate system of the map
     */
    private currentViewMetaData;
    private viewMetaData;
    private viewMetaData$;
    private viewMetaData_$;
    private clientRectInitialized;
    private mapMetaDataInitialized;
    private initialized$;
    /**
     * matrix that is responsible for the full transformation (originCorrectionMatrix * transformMatrix)
     */
    private fullTransformationMatrix$;
    /**
     * stringified version of fullTransformationMatrix$ for the scale, rotation and translation of the map
     */
    private transformation$;
    private static EPS;
    /**
     * Metadata of the map
     */
    private currentMapData;
    private mapMetaData;
    private mapMetaData$;
    private transformation_$;
    /**
     * Flag that indicates if the map should be animated or not
     */
    private animated;
    private animated$;
    constructor();
    isInitialized(): Observable<boolean>;
    isAnimated(): Observable<boolean>;
    getTransformString(): Observable<string>;
    getFullTransformationMatrix(): Observable<TransformMatrix>;
    getLength(length: number): number;
    getLength$(length: number): Observable<number>;
    private lengthFunction$;
    getLengthFunction(): Observable<(length: number) => number>;
    getPosition(x: number, y: number): [number, number];
    getPositionInUnit(x: number, y: number): [number, number];
    getPosition$(x: number, y: number): Observable<[number, number]>;
    private positionFunction$;
    getPositionFunction(): Observable<(x: number, y: number) => [number, number]>;
    /**
     * Returns an observable of the current coordinate system
     */
    getViewMetaData(): Observable<ViewMetaData>;
    /**
     * Retuns an observable of the transform matrix with that the map will be transformed
     */
    getTransformMatrix(): Observable<TransformMatrix>;
    /**
     * Returns an obsrvable of the transform matrix that will perform the origin correction
     */
    getOriginCorrectionMatrix(): Observable<TransformMatrix>;
    /**
     * Get the nearest allowed scale to @param scale
     * @param scale
     */
    getAllowedScale(scale: number): number;
    /**
     * Observable of the map meta data
     */
    getMapMetaData(): Observable<MapMetaData>;
    resetTransformSubscription(): void;
    setCenterTo(x: number, y: number, theta?: number, scale?: number): void;
    setCenterToObservable(center$: Observable<{
        x: number;
        y: number;
        theta?: number;
        scale?: number;
    }>, animate?: boolean): void;
    /**
     * Rotate the transform matrix by angle around [x,y]
     * @param angle
     * @param x
     * @param y
     */
    rotate(angle: number, x: number, y: number): void;
    /**
     * Zoom to the center of the view by factor x
     * @param x
     */
    zoom(x: number): void;
    /**
     * Scale the transform matrix around x and y by the factor z
     */
    scale(z: number, x: number, y: number): void;
    /**
     * Translate the transform matrix
     */
    translate(x: number, y: number): void;
    /**
     * Reset the scale of the transform matrix
     */
    resetScale(): void;
    /**
     * Reset the transform of the transform matrix
     */
    resetTransform(): void;
    rotateRight(): void;
    rotateLeft(): void;
    /**
     * Set the bounding rectangle of the map
     * @param clientRect
     */
    setClientRect(clientRect: ClientRect): void;
    /**
     * Set the metadata of the current map
     */
    setMapMetaData(mapMetaData: MapMetaData): void;
    /**
     * Clean up when this Service gets destroyed
     */
    ngOnDestroy(): void;
    private _setCenterTo(x, y, theta?, scale?);
    private calculateViewMetaData(mapMetaData, clientRect);
    private getFittingRatio(mapWidth, mapHeight, viewWidth, viewHeight);
    /**
     * Set the translate to the closest allowed translate
     */
    private correctTranslation();
}
