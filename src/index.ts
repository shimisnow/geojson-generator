import {writeFileSync} from 'fs';
import {CircularArea} from './generator/geo-area';

const CA = new CircularArea(
  {latitude: -19.852055, longitude: -43.977814},
  1000
);

CA.setStyle({
  fill: {
    color: '#fe3ed4',
  },
});

writeFileSync('./build/geojson.json', JSON.stringify(CA.getGeoJSON()));
