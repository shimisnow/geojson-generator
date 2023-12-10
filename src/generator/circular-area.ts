import {Polygon} from '../enums/polygon.enum';
import {GeoPoint} from '../types/geo-point.type';
import {AreaWithRadius} from './area-with-radius';

/**
 * Creates a circular area given the center coordinate and the radius
 */
export class CircularArea extends AreaWithRadius {
  public constructor(centerCoordinate: GeoPoint, radiusInMeters: number) {
    super(centerCoordinate, radiusInMeters, Polygon.CIRCLE);
  }
}
