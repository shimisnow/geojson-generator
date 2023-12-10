import {writeFileSync} from 'fs';
import {
  CircularArea,
  HexagonalArea,
  PentagonalArea,
  SquareArea,
  TriangularArea,
} from './';

const CA = new CircularArea(
  {latitude: -19.852055, longitude: -43.977814},
  1000
);

const TA = new TriangularArea(
  {latitude: -19.852055, longitude: -43.977814},
  1000
);

const SA = new SquareArea({latitude: -19.852055, longitude: -43.977814}, 1000);

const PA = new PentagonalArea(
  {latitude: -19.852055, longitude: -43.977814},
  1000
);

const HA = new HexagonalArea(
  {latitude: -19.852055, longitude: -43.977814},
  1000
);

writeFileSync('./build/geojson-circular.json', JSON.stringify(CA.getGeoJSON()));
writeFileSync(
  './build/geojson-triangular.json',
  JSON.stringify(TA.getGeoJSON())
);
writeFileSync('./build/geojson-square.json', JSON.stringify(SA.getGeoJSON()));
writeFileSync(
  './build/geojson-pentagonal.json',
  JSON.stringify(PA.getGeoJSON())
);
writeFileSync(
  './build/geojson-hexagonal.json',
  JSON.stringify(HA.getGeoJSON())
);
