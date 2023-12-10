/**
 * Defines information to be used to generate a polygon
 */
export type PolygonInfo = {
  /** Angle to put the first polygon vertice. The zero angle is a line that cross the poles at longitude zero */
  angleStart: number;
  /** Angle used to calculate the next polygon vertice */
  angleIncrement: number;
};
