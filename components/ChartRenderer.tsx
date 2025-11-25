import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { AnalysisResult, ChartType } from '../types';
import { AlertCircle } from 'lucide-react';

interface ChartRendererProps {
  analysis: AnalysisResult;
  onDataPointClick: (index: number) => void;
  selectedIndex: number | null;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ analysis, onDataPointClick, selectedIndex }) => {
  const { chartType, data, config } = analysis;
  const { xAxisKey, dataKeys, colors, showGrid = true, showLegend = true } = config;

  if (!data || data.length === 0) {
     return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50/50 rounded-lg">
           <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
           <p>No data available to render.</p>
        </div>
     );
  }

  // Helper to handle clicks consistently across chart types
  const handleClick = (data: any, index: number) => {
    onDataPointClick(index);
  };

  const renderChart = () => {
    switch (chartType) {
      case ChartType.BAR:
        return (
          <BarChart data={data} margin={{ bottom: 20, top: 20, right: 20, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />}
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
              label={config.xAxisLabel ? { value: config.xAxisLabel, position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 12, dy: 10 } : undefined}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={config.yAxisLabel ? { value: config.yAxisLabel, angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 } : undefined}
            />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            {showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }}/>}
            {dataKeys.map((key, kIndex) => (
              <Bar 
                key={key} 
                dataKey={key} 
                fill={colors[kIndex % colors.length]} 
                radius={[4, 4, 0, 0]}
                onClick={handleClick}
                cursor="pointer"
                animationDuration={500}
              >
                 {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={selectedIndex === index ? '#f59e0b' : colors[kIndex % colors.length]} 
                      stroke={selectedIndex === index ? '#b45309' : 'none'}
                      strokeWidth={selectedIndex === index ? 2 : 0}
                    />
                  ))}
              </Bar>
            ))}
          </BarChart>
        );

      case ChartType.LINE:
        return (
          <LineChart data={data} margin={{ bottom: 20, top: 20, right: 20, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />}
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
              label={config.xAxisLabel ? { value: config.xAxisLabel, position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 12, dy: 10 } : undefined}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={config.yAxisLabel ? { value: config.yAxisLabel, angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 } : undefined}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            {showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }}/>}
            {dataKeys.map((key, index) => (
              <Line 
                key={key} 
                type="monotone" 
                dataKey={key} 
                stroke={colors[index % colors.length]} 
                strokeWidth={3}
                dot={{ fill: 'white', strokeWidth: 2, r: 6, cursor: 'pointer' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
                onClick={(e: any) => {
                  if (e && typeof e.index === 'number') handleClick(e, e.index);
                }}
                animationDuration={500}
              />
            ))}
          </LineChart>
        );

      case ChartType.AREA:
        return (
          <AreaChart data={data} margin={{ bottom: 20, top: 20, right: 20, left: 0 }}>
             <defs>
              {dataKeys.map((key, index) => (
                <linearGradient key={`grad-${key}`} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />}
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
              label={config.xAxisLabel ? { value: config.xAxisLabel, position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 12, dy: 10 } : undefined}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={config.yAxisLabel ? { value: config.yAxisLabel, angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 } : undefined}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            {showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }}/>}
            {dataKeys.map((key, index) => (
              <Area 
                key={key} 
                type="monotone" 
                dataKey={key} 
                stroke={colors[index % colors.length]} 
                fillOpacity={1} 
                fill={`url(#color${key})`} 
                animationDuration={500}
                onClick={(e: any) => {
                   if (e && typeof e.index === 'number') handleClick(e, e.index);
                }}
                dot={{ r: 4, cursor: 'pointer', onClick: (props: any) => handleClick(props, props.index) }}
              />
            ))}
          </AreaChart>
        );

      case ChartType.PIE:
        const pieKey = dataKeys[0];
        return (
          <PieChart>
             <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey={pieKey}
              nameKey={xAxisKey}
              onClick={handleClick}
              cursor="pointer"
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={selectedIndex === index ? '#f59e0b' : colors[index % colors.length]} 
                  stroke={selectedIndex === index ? '#b45309' : 'none'}
                  strokeWidth={selectedIndex === index ? 3 : 0}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            {showLegend && <Legend />}
          </PieChart>
        );
      
      case ChartType.SCATTER:
         return (
          <ScatterChart margin={{ bottom: 20, top: 20, right: 20, left: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />}
            <XAxis 
              type="category" 
              dataKey={xAxisKey} 
              name="Category"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
              label={config.xAxisLabel ? { value: config.xAxisLabel, position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 12, dy: 10 } : undefined}
            />
            <YAxis 
              type="number" 
              dataKey={dataKeys[0]} 
              name="Value" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={config.yAxisLabel ? { value: config.yAxisLabel, angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 } : undefined}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: 'none' }}/>
            {showLegend && <Legend />}
            <Scatter 
              name={config.title} 
              data={data} 
              fill={colors[0]} 
              onClick={handleClick}
              cursor="pointer"
              animationDuration={500}
            >
               {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={selectedIndex === index ? '#f59e0b' : colors[0]} 
                />
              ))}
            </Scatter>
          </ScatterChart>
         );
      
      case ChartType.RADAR:
        return (
           <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey={xAxisKey} tick={{ fill: '#64748b', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
              {dataKeys.map((key, index) => (
                 <Radar
                    key={key}
                    name={key}
                    dataKey={key}
                    stroke={colors[index % colors.length]}
                    fill={colors[index % colors.length]}
                    fillOpacity={0.6}
                 />
              ))}
              {showLegend && <Legend />}
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
           </RadarChart>
        );

      case ChartType.RADIAL:
         return (
            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
               <RadialBar
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  dataKey={dataKeys[0]}
               >
                   {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colors[index % colors.length]}
                    />
                  ))}
               </RadialBar>
               {showLegend && <Legend />}
               <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
            </RadialBarChart>
         );

      default:
        return (
           <div className="flex items-center justify-center h-full text-slate-400">
             Unsupported chart type
           </div>
        );
    }
  };

  return (
    <div className="w-full h-full" style={{ minHeight: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartRenderer;