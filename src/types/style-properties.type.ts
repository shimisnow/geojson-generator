export type StyleProperties = Partial<{
  stroke: Partial<{
    color: string;
    width: number;
    opacity: number;
  }>;
  fill: Partial<{
    color: string;
    opacity: number;
  }>;
}>;
