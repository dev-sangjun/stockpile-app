interface Data {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderRadius?: number;
  borderSkipped?: boolean;
  barThickness?: number;
  dataLabels?: { [key: string]: string };
}

export type Datasets = Data[];
