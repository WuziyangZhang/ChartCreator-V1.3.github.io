export enum ChartType {
  BAR = 'BAR',
  LINE = 'LINE',
  AREA = 'AREA',
  PIE = 'PIE',
  SCATTER = 'SCATTER',
  COMPOSED = 'COMPOSED',
  RADAR = 'RADAR',
  RADIAL = 'RADIAL'
}

export enum AnalysisStatus {
  IDLE = 'idle',
  ANALYZING = 'analyzing',
  REFINING = 'refining',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface DataPoint {
  name: string;
  [key: string]: string | number;
}

export interface ChartConfig {
  xAxisKey: string;
  dataKeys: string[];
  colors: string[];
  yAxisLabel?: string;
  xAxisLabel?: string;
  title: string;
  description: string;
  showGrid?: boolean;
  showLegend?: boolean;
  height?: number; // In pixels
}

export interface InsightData {
  en: string; // English insight
  zh: string; // Chinese insight
}

export interface AnalysisResult {
  chartType: ChartType;
  data: DataPoint[];
  config: ChartConfig;
  insights: InsightData;
  rawData?: string; // Stored for re-analysis
}

export interface AppState {
  step: 'landing' | 'upload' | 'workspace' | 'templates' | 'account';
  data: AnalysisResult | null;
  status: AnalysisStatus;
  error: string | null;
  selectedDataIndex: number | null; // For visual editing
  isRegeneratingInsights: boolean;
}

export interface ExportConfig {
  format: 'png' | 'jpeg' | 'svg';
  background: 'white' | 'black' | 'transparent';
}
