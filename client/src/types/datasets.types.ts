interface Data {
  label: string;
  data: number[];
  backgroundColor?: string[];
  dataLabels?: { [key: string]: string };
}

export type Datasets = Data[];
