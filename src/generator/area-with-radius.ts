import {GeoPoint} from '../types/geo-point.type';
import {StyleProperties} from '../types/style-properties.type';
import {Feature, Position} from 'geojson';
import {computeDestinationPoint} from 'geolib';

export abstract class AreaWithRadius {
  protected centerCoordinate: GeoPoint;
  protected radiusInMeters: number;
  protected properties: any;
  protected style: StyleProperties | undefined;

  public constructor(centerCoordinate: GeoPoint, radiusInMeters: number) {
    this.centerCoordinate = centerCoordinate;
    this.radiusInMeters = radiusInMeters;
  }

  public setProperties(properties: any, disableMerge = false): void {
    if (disableMerge) {
      this.properties = properties;
    } else {
      Object.assign(this.properties, ...properties);
    }
  }

  public setStyle(properties: StyleProperties): void {
    this.style = properties;
  }

  protected convertStyleProperties() {
    const properties: Record<string, unknown> = {};

    if (this.style?.stroke) {
      const stroke = this.style.stroke;
      if (stroke.color) {
        properties['stroke'] = stroke.color;
      }
      if (stroke.width) {
        properties['stroke-width'] = stroke.width;
      }
      if (stroke.opacity) {
        properties['stroke-opacity'] = stroke.opacity;
      }
    }

    if (this.style?.fill) {
      const fill = this.style.fill;
      if (fill.color) {
        properties['fill'] = fill.color;
      }
      if (fill.opacity) {
        properties['fill-opacity'] = fill.opacity;
      }
    }

    return properties;
  }

  protected generatePoints(angleIncrement = 1, angleStart = 0): Position[] {
    const points: Position[] = [];

    for (let angle = angleStart; angle <= 360; angle += angleIncrement) {
      const point = computeDestinationPoint(
        this.centerCoordinate,
        this.radiusInMeters,
        angle
      );

      points.push([point.longitude, point.latitude]);
    }

    return points;
  }

  public abstract getGeoJSON(
    angleIncrement: number,
    angleStart: number
  ): Feature;
}
