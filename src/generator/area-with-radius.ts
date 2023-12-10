import {Polygon} from '../enums/polygon.enum';
import {GeoPoint} from '../types/geo-point.type';
import {PolygonInfo} from '../types/polygon-info.type';
import {StyleProperties} from '../types/style-properties.type';
import {Feature, Geometry, Position} from 'geojson';
import {computeDestinationPoint} from 'geolib';

/**
 * Creates a area given the center coordinate, the radius and the desired polygon type
 */
export abstract class AreaWithRadius {
  protected centerCoordinate: GeoPoint;
  protected radiusInMeters: number;
  protected type: Polygon;
  protected properties: any;
  protected style: StyleProperties | undefined;

  protected constructor(
    centerCoordinate: GeoPoint,
    radiusInMeters: number,
    type: Polygon
  ) {
    this.centerCoordinate = centerCoordinate;
    this.radiusInMeters = radiusInMeters;
    this.type = type;
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

  private generatePoints(): Position[][] {
    const config = this.getPolygonInfo();
    const points: Position[] = [];

    for (
      let angle = config.angleStart;
      angle <= 360;
      angle += config.angleIncrement
    ) {
      const point = computeDestinationPoint(
        this.centerCoordinate,
        this.radiusInMeters,
        angle
      );

      points.push([point.longitude, point.latitude]);
    }

    return [points];
  }

  private getPolygonInfo(): PolygonInfo {
    const info: PolygonInfo = {
      angleIncrement: 0,
      angleStart: 0,
    };

    switch (this.type) {
      case Polygon.CIRCLE:
        info.angleIncrement = 1;
        break;
      case Polygon.TRIANGLE:
        info.angleIncrement = 120;
        break;
      case Polygon.SQUARE:
        info.angleStart = -45;
        info.angleIncrement = 90;
        break;
      case Polygon.PENTAGON:
        info.angleIncrement = 72;
        break;
      case Polygon.HEXAGON:
        info.angleIncrement = 60;
        break;
    }

    return info;
  }

  public getGeoJSON(): Feature {
    const geometry: Geometry = {
      type: 'Polygon',
      coordinates: this.generatePoints(),
    };

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
