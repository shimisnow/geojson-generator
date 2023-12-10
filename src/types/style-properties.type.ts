/**
 * Style options that can be used at the Mapbox GeoJSON viewer project.
 * {@link https://github.com/mapbox/geojson.io}
 */
export type StyleProperties = Partial<{
  /** The polygon border */
  stroke: Partial<{
    /** Border color */
    color: string;
    /** Border size */
    width: number;
    /** Border transparency */
    opacity: number;
  }>;
  /** The polygon background */
  fill: Partial<{
    /** Background color */
    color: string;
    /** Background transparency */
    opacity: number;
  }>;
}>;
