import {writeFileSync} from 'fs';
import {
  CircularArea,
  HexagonalArea,
  PentagonalArea,
  SquareArea,
  TriangularArea,
} from './';

const CA = new CircularArea(
  {latitude: -22.952125, longitude: -43.210516},
  1000
);

const TA = new TriangularArea(
  {latitude: -22.952125, longitude: -43.210516},
  1000
);

const SA = new SquareArea({latitude: -22.952125, longitude: -43.210516}, 1000);

const PA = new PentagonalArea(
  {latitude: -22.952125, longitude: -43.210516},
  1000
);

const HA = new HexagonalArea(
  {latitude: -22.952125, longitude: -43.210516},
  1000
);

writeFileSync(
  './output/geojson-circular.geojson.json',
  JSON.stringify(CA.getGeoJSON())
);
writeFileSync(
  './output/geojson-triangular.geojson.json',
  JSON.stringify(TA.getGeoJSON())
);
writeFileSync(
  './output/geojson-square.geojson.json',
  JSON.stringify(SA.getGeoJSON())
);
writeFileSync(
  './output/geojson-pentagonal.geojson.json',
  JSON.stringify(PA.getGeoJSON())
);
writeFileSync(
  './output/geojson-hexagonal.geojson.json',
  JSON.stringify(HA.getGeoJSON())
);
