import { Observable } from "rxjs";
import { TransformMatrix } from "./transform-matrix";
export declare abstract class PublicMapService {
    /**
     * Observable of animated flag
     */
    abstract isAnimated(): Observable<boolean>;
    /**
     * Observable of initialized flag
     */
    abstract isInitialized(): Observable<boolean>;
    /**
     * Convert length unit to pixels
     * @param length
     */
    abstract getLength(length: number): number;
    /**
     * Convert length to pixels, returns an observable of the pixels
     * @param length
     */
    abstract getLength$(length: number): Observable<number>;
    /**
     * @return an Observable of the function that converts a lenght into pixels
     */
    abstract getLengthFunction(): Observable<(length: number) => number>;
    /**
     * Calculate the position in pixels
     * @param x
     * @param y
     */
    abstract getPosition(x: number, y: number): [number, number];
    /**
     * Calculate the in the in the original unit
     * (this is the inverse of getPosition)
     * @param x
     * @param y
     */
    abstract getPositionInUnit(x: number, y: number): [number, number];
    /**
     * @param x
     * @param y
     * @return an Observable of the position in pixels
     */
    abstract getPosition$(x: number, y: number): Observable<[number, number]>;
    /**
     * @return an Observable of the function calculates the position in pixels
     */
    abstract getPositionFunction(): Observable<(x: number, y: number) => [number, number]>;
    /**
     * @return an Observable of the transformation matrix
     */
    abstract getTransformMatrix(): Observable<TransformMatrix>;
    /**
     * @return an Observable of the origin correction matrix
     */
    abstract getOriginCorrectionMatrix(): Observable<TransformMatrix>;
    /**
     * @return an Observable of the full transform matrix (originCorrectionMatrix * transformMatrix)
     */
    abstract getFullTransformationMatrix(): Observable<TransformMatrix>;
    /**
     * Rotate the map to the left by 90 degrees
     */
    abstract rotateLeft(): void;
    /**
     * Rotate the view to the right by 90 degrees
     */
    abstract rotateRight(): void;
    /**
     * Reset the transformation of the map so that it will be in its initial position
     */
    abstract resetTransform(): void;
    /**
     * Reset the scale of the map, so that it will fit it's parent but it will preserve rotation
     */
    abstract resetScale(): void;
    /**
     * Multiply the zoom factor by @param x
     */
    abstract zoom(x: number): any;
    /**
     * Set the view center to the position @param focusPosition
     * if set it will also set the zoom to @param zoom
     */
    abstract setCenterTo(x: number, y: number, theta?: number, scale?: number): any;
    /**
     * Subscribes to the observable and sets the center to the new value every time it gets updated
     * The subscription will be cleared when any other function that changes the map transformation is called
     */
    abstract setCenterToObservable(center$: Observable<{
        x: number;
        y: number;
        theta?: number;
        scale?: number;
    }>, animate?: boolean): any;
}
