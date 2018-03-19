export declare type TransformMatrixArray = [number, number, number, number, number, number];
export declare class TransformMatrix {
    private m;
    /**
     * a b x
     * c d y
     *
     * [a, c, b, d, x, y]
     * [0, 1, 2, 3, 4, 5]
     *
     * 0 2 4
     * 1 3 5
     */
    readonly _innerMatrix: TransformMatrixArray;
    constructor(m?: TransformMatrixArray);
    /**
     * Multiply this matrix with other (this * other)
     * (attention: in general: this * other != other * this)
     * @param other
     */
    multiply(other: TransformMatrix): TransformMatrix;
    /**
     * Base transformation
     * S^(-1) * this * S
     */
    baseTransformation(base: TransformMatrix): TransformMatrix;
    /**
     * Create a matrix that will translate an object
     *
     * @param x
     * @param y
     */
    static translate(x: any, y: any): TransformMatrix;
    /**
     * Mirrors the matrix at the y axis (shifted in by @param x in x direction)
     * @param x
     */
    flipX(x?: number): this;
    /**
     * Mirrors the matrix at the x axis (shifted in by @param y in y direction)
     * @param y
     */
    flipY(y?: number): this;
    /**
     * Inverse of the matrix
     */
    inverse(): TransformMatrix;
    /**
     * Determinat
     */
    determinant(): number;
    /**
     * Returns inverse of the matrix
     */
    private _inverse(m);
    private _inverseOfMatrixArray([a, c, b, d, x, y]);
    /**
     * Returns a matrix that will undo the rotation that this matrix creates
     */
    inverseRotationAndMirroring(): TransformMatrix;
    /**
     * Returns a matrix that will undo the rotation that this matrix creates
     */
    inverseScaleRotationAndMirroring(): TransformMatrix;
    /**
     * returns a string that can be used as transform property of a DOM element
     */
    toString(): string;
    /**
     * Calculate the zoom factor that this matrix creates
     */
    getScale(): number;
    /**
     * Change the translation of the matrix by (@param x, @param y)
     */
    translate(x: number, y: number): TransformMatrix;
    /**
     * Rotate the matrix by angle @param phi around the position (@param x, @param y)
     */
    rotate(phi: number, centerX?: number, centerY?: number): TransformMatrix;
    /**
     * Scale the matrix by factor @param a around the position (@param x, @param y)
     */
    scale(a: number, x?: number, y?: number): TransformMatrix;
    /**
     * Calculate the transformation
     */
    getTranslate(): [number, number];
    /**
     * Clone the matrix
     */
    clone(): TransformMatrix;
    /**
     * Clone the matrix but remove the translation from the clone
     */
    cloneWithoutTranslation(): TransformMatrix;
    /**
     * Clone the matrix but remove the translation and the scaling from the clone
     */
    cloneWithoutScaleAndTranslation(): TransformMatrix;
    /**
     * Multiplies the matrix with the @param vector
     */
    transform(vector: [number, number]): [number, number];
}
