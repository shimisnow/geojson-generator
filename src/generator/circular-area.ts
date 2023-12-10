import {Feature, Polygon} from 'geojson';
import {AreaWithRadius} from './area-with-radius';

export class CircularArea extends AreaWithRadius {
  public getGeoJSON(angleIncrement = 1, angleStart = 0): Feature {
    const geometry: Polygon = {
      type: 'Polygon',
      coordinates: [this.generatePoints(angleIncrement, angleStart)],
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
