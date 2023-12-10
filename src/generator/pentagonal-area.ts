import {Polygon} from '../enums/polygon.enum';
import {GeoPoint} from '../types/geo-point.type';
import {AreaWithRadius} from './area-with-radius';

/**
 * Creates a pentagonal area given the center coordinate and the radius
 */
export class PentagonalArea extends AreaWithRadius {
  public constructor(centerCoordinate: GeoPoint, radiusInMeters: number) {
    super(centerCoordinate, radiusInMeters, Polygon.PENTAGON);
  }
}
