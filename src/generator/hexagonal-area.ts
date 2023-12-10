import {Polygon} from '../enums/polygon.enum';
import {GeoPoint} from '../types/geo-point.type';
import {AreaWithRadius} from './area-with-radius';

/**
 * Creates an hexagonal area given the center coordinate and the radius
 */
export class HexagonalArea extends AreaWithRadius {
  public constructor(centerCoordinate: GeoPoint, radiusInMeters: number) {
    super(centerCoordinate, radiusInMeters, Polygon.HEXAGON);
  }
}
