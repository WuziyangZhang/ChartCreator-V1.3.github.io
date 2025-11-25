import { useState, useCallback } from 'react';
import { AnalysisResult, AnalysisStatus, DataPoint, ChartType } from '../types';
import { analyzeDataWithGemini, regenerateInsights } from '../services/geminiService';

interface UseAnalysisReturn {
  data: AnalysisResult | null;
  status: AnalysisStatus;
  error: string | null;
  selectedDataIndex: number | null;
  isRegeneratingInsights: boolean;
  analyzeData: (rawData: string, requirements: string) => Promise<void>;
  refineAnalysis: (prompt: string) => Promise<void>;
  updateData: (newData: DataPoint[]) => void;
  updateConfig: (updates: Partial<AnalysisResult['config']>) => void;
  updateChartType: (type: ChartType) => void;
  regenerateChartInsights: () => Promise<void>;
  setSelectedDataIndex: (index: number | null) => void;
  reset: () => void;
}

export const useAnalysis = (): UseAnalysisReturn => {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(null);
  const [isRegeneratingInsights, setIsRegeneratingInsights] = useState(false);

  const analyzeData = useCallback(async (rawData: string, requirements: string) => {
    setStatus(AnalysisStatus.ANALYZING);
    setError(null);
    try {
      const result = await analyzeDataWithGemini(rawData, requirements);
      setData(result);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || "Analysis failed");
      setStatus(AnalysisStatus.ERROR);
    }
  }, []);

  const refineAnalysis = useCallback(async (prompt: string) => {
    if (!data?.rawData) return;
    setStatus(AnalysisStatus.REFINING);
    setError(null);
    try {
      const result = await analyzeDataWithGemini(data.rawData, prompt);
      setData(result);
      setStatus(AnalysisStatus.SUCCESS);
      setSelectedDataIndex(null);
    } catch (err: any) {
      setError(err.message || "Refinement failed");
      setStatus(AnalysisStatus.ERROR);
    }
  }, [data]);

  const updateData = useCallback((newData: DataPoint[]) => {
    setData(prev => prev ? { ...prev, data: newData } : null);
  }, []);

  const updateConfig = useCallback((updates: Partial<AnalysisResult['config']>) => {
    setData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        config: { ...prev.config, ...updates }
      };
    });
  }, []);

  const updateChartType = useCallback((type: ChartType) => {
    setData(prev => prev ? { ...prev, chartType: type } : null);
  }, []);

  const regenerateChartInsights = useCallback(async () => {
    if (!data) return;
    setIsRegeneratingInsights(true);
    const newInsights = await regenerateInsights(data.data, data.config.title);
    setData(prev => prev ? { ...prev, insights: newInsights } : null);
    setIsRegeneratingInsights(false);
  }, [data]);

  const reset = useCallback(() => {
    setData(null);
    setStatus(AnalysisStatus.IDLE);
    setError(null);
    setSelectedDataIndex(null);
  }, []);

  return {
    data,
    status,
    error,
    selectedDataIndex,
    isRegeneratingInsights,
    analyzeData,
    refineAnalysis,
    updateData,
    updateConfig,
    updateChartType,
    regenerateChartInsights,
    setSelectedDataIndex,
    reset
  };
};
