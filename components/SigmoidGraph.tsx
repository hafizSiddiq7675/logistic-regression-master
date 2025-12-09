import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';
import MathBlock from './MathBlock';

const SigmoidGraph: React.FC = () => {
  const [zValue, setZValue] = useState(0);

  const data = useMemo(() => {
    const points = [];
    for (let i = -10; i <= 10; i += 0.5) {
      points.push({ z: i, y: 1 / (1 + Math.exp(-i)) });
    }
    return points;
  }, []);

  const currentY = 1 / (1 + Math.exp(-zValue));

  const getInterpretation = (y: number) => {
    if (y > 0.9) return { text: "Confident: Class 1", color: "text-green-500" };
    if (y < 0.1) return { text: "Confident: Class 0", color: "text-red-500" };
    if (y > 0.4 && y < 0.6) return { text: "Uncertain: Boundary", color: "text-yellow-500" };
    return { text: y > 0.5 ? "Leaning: Class 1" : "Leaning: Class 0", color: "text-slate-500" };
  };

  const interpretation = getInterpretation(currentY);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <div className="w-full md:w-2/3 h-64 bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="z" type="number" domain={[-10, 10]} stroke="#94a3b8" tickCount={11} />
            <YAxis domain={[0, 1]} stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} />
            <ReferenceLine x={0} stroke="#64748b" strokeDasharray="3 3" />
            <ReferenceLine y={0.5} stroke="#64748b" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="y" stroke="#06b6d4" strokeWidth={3} dot={false} />
            <ReferenceDot x={zValue} y={currentY} r={6} fill="#ec4899" stroke="#fff" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Adjust Z: {zValue.toFixed(1)}
          </label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.1"
            value={zValue}
            onChange={(e) => setZValue(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-brand-500"
          />
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">Formula:</span>
            <MathBlock latex="\hat{y} = \sigma(Z)" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">Output (ŷ):</span>
            <span className="font-mono font-bold text-brand-500">{currentY.toFixed(4)}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
            <div className={`font-bold text-center ${interpretation.color}`}>
              {interpretation.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigmoidGraph;