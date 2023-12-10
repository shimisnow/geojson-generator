import {GeoPoint} from '../types/geo-point.type';
import {StyleProperties} from '../types/style-properties.type';
import {Feature, Polygon, Position} from 'geojson';
import {computeDestinationPoint} from 'geolib';

export class CircularArea {
  private centerCoordinate: GeoPoint;
  private radiusInMeters: number;
  private properties: any;
  private style: StyleProperties | undefined;

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

  private convertStyleProperties() {
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

  public getGeoJSON(angleIncrement = 1): Feature {
    const geometry: Polygon = {
      type: 'Polygon',
      coordinates: [],
    };

    const circularAreaPolygonPoints: Position[] = [];

    for (let angle = 0; angle <= 360; angle += angleIncrement) {
      const point = computeDestinationPoint(
        this.centerCoordinate,
        this.radiusInMeters,
        angle
      );

      circularAreaPolygonPoints.push([point.longitude, point.latitude]);
    }

    geometry.coordinates.push(circularAreaPolygonPoints);

    let properties = {};

    if (this.style) {
      properties = this.convertStyleProperties();
    }

    Object.assign(properties, {
      centerLatitude: this.centerCoordinate.latitude,
      centerLongitude: this.centerCoordinate.longitude,
      radiusInMeters: this.radiusInMeters,
    });

    const circularAreaPolygon: Feature = {
      type: 'Feature',
      properties,
      geometry,
    };

    return circularAreaPolygon;
  }
}
