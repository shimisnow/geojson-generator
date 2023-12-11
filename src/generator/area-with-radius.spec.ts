import {Polygon} from '../enums/polygon.enum';
import {GeoPoint} from '../types/geo-point.type';
import {AreaWithRadius} from './area-with-radius';

class AreaWithRadius_Dummy extends AreaWithRadius {
  public constructor(
    centerCoordinate: GeoPoint,
    radiusInMeters: number,
    type: Polygon
  ) {
    super(centerCoordinate, radiusInMeters, type);
  }
}

describe('class AreaWithRadius', () => {
  describe('setProperties()', () => {
    test('method unused', () => {
      const obj = new AreaWithRadius_Dummy(
        {latitude: -22.952125, longitude: -43.210516},
        1000,
        Polygon.CIRCLE
      );

      const properties = obj.getProperties();

      expect(properties).toBeUndefined();
    });

    test('method used with merge enabled', () => {
      const obj = new AreaWithRadius_Dummy(
        {latitude: -22.952125, longitude: -43.210516},
        1000,
        Polygon.CIRCLE
      );

      obj.setProperties({propA: 'A'});
      obj.setProperties({propB: 'B'});
      obj.setProperties({propC: 'D'});
      obj.setProperties({propC: 'C'});

      const properties = obj.getProperties();

      expect(properties).toHaveProperty('propA');
      expect(properties.propA).toBe('A');
      expect(properties).toHaveProperty('propB');
      expect(properties.propB).toBe('B');
      expect(properties).toHaveProperty('propC');
      expect(properties.propC).toBe('C');
    });

    test('method used with merge disabled', () => {
      const obj = new AreaWithRadius_Dummy(
        {latitude: -22.952125, longitude: -43.210516},
        1000,
        Polygon.CIRCLE
      );

      obj.setProperties({propA: 'A'}, true);
      obj.setProperties({propB: 'B'}, true);

      const properties = obj.getProperties();

      expect(properties).not.toHaveProperty('propA');
      expect(properties).toHaveProperty('propB');
      expect(properties.propB).toBe('B');
    });
  });

  describe('setStyle()', () => {
    test('method unused', () => {
      const obj = new AreaWithRadius_Dummy(
        {latitude: -22.952125, longitude: -43.210516},
        1000,
        Polygon.CIRCLE
      );

      const style = obj.getStyle();

      expect(Object.keys(style).length).toBe(0);
    });
    test('only stroke options', () => {
      const obj = new AreaWithRadius_Dummy(
        {latitude: -22.952125, longitude: -43.210516},
        1000,
        Polygon.CIRCLE
      );

      obj.setStyle({stroke: {color: '#ffffff'}});

      const style = obj.getStyle();
      expect(style).toHaveProperty('stroke');
      expect(style).toHaveProperty('stroke.color');
      expect(style).not.toHaveProperty('fill');
    });
    test('only fill options', () => {
      const obj = new AreaWithRadius_Dummy(
        {latitude: -22.952125, longitude: -43.210516},
        1000,
        Polygon.CIRCLE
      );

      obj.setStyle({fill: {opacity: 0.5}});

      const style = obj.getStyle();
      expect(style).toHaveProperty('fill');
      expect(style).toHaveProperty('fill.opacity');
      expect(style).not.toHaveProperty('stroke');
    });
    test('both stroke and fill options', () => {
      const obj = new AreaWithRadius_Dummy(
        {latitude: -22.952125, longitude: -43.210516},
        1000,
        Polygon.CIRCLE
      );

      obj.setStyle({stroke: {color: '#ffffff'}, fill: {opacity: 0.5}});

      const style = obj.getStyle();
      expect(style).toHaveProperty('stroke');
      expect(style).toHaveProperty('stroke.color');
      expect(style).toHaveProperty('fill');
      expect(style).toHaveProperty('fill.opacity');
    });
  });
});
