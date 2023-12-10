import {Feature, Polygon, Position} from 'geojson';
import {GeoPoint} from '../types/geo-point.type';
import {computeDestinationPoint} from 'geolib';

export class CircularArea {
  private centerCoordinate: GeoPoint;
  private radiusInMeters: number;
  private properties: any;

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

    const circularAreaPolygon: Feature = {
      type: 'Feature',
      properties: {
        centerLatitude: this.centerCoordinate.latitude,
        centerLongitude: this.centerCoordinate.longitude,
        radiusInMeters: this.radiusInMeters,
      },
      geometry,
    };

    return circularAreaPolygon;
  }
}
