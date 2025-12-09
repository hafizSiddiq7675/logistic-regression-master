import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Legend } from 'recharts';
import MathBlock from './MathBlock';

const LossVisualizer: React.FC = () => {
  const [yHat, setYHat] = useState(0.5);

  const data = useMemo(() => {
    const points = [];
    // Avoiding exactly 0 and 1 to prevent log(0)
    for (let i = 0.01; i <= 0.99; i += 0.01) {
      points.push({
        yHat: parseFloat(i.toFixed(2)),
        lossIfOne: -Math.log(i),
        lossIfZero: -Math.log(1 - i)
      });
    }
    return points;
  }, []);

  const currentLossIfOne = -Math.log(yHat);
  const currentLossIfZero = -Math.log(1 - yHat);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <div className="w-full md:w-2/3 h-72 bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis 
              dataKey="yHat" 
              type="number" 
              domain={[0, 1]} 
              stroke="#94a3b8" 
              label={{ value: 'Prediction (ŷ)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }} 
            />
            <YAxis stroke="#94a3b8" label={{ value: 'Loss', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} />
            <Legend verticalAlign="top" height={36}/>
            
            <Line 
              name="Loss when y=1" 
              type="monotone" 
              dataKey="lossIfOne" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={false} 
            />
            <Line 
              name="Loss when y=0" 
              type="monotone" 
              dataKey="lossIfZero" 
              stroke="#ef4444" 
              strokeWidth={3} 
              dot={false} 
            />
            
            <ReferenceDot x={yHat} y={currentLossIfOne} r={6} fill="#10b981" stroke="#fff" />
            <ReferenceDot x={yHat} y={currentLossIfZero} r={6} fill="#ef4444" stroke="#fff" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Predicted ŷ: {yHat.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.01"
            max="0.99"
            step="0.01"
            value={yHat}
            onChange={(e) => setYHat(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-brand-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
             <div className="text-xs text-slate-500 uppercase font-bold mb-1">True y = 1</div>
             <div className="text-green-500 font-bold text-lg">{currentLossIfOne.toFixed(3)}</div>
             <div className="text-xs text-slate-400 mt-1">
               {currentLossIfOne < 0.2 ? 'Good!' : 'High Error'}
             </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
             <div className="text-xs text-slate-500 uppercase font-bold mb-1">True y = 0</div>
             <div className="text-red-500 font-bold text-lg">{currentLossIfZero.toFixed(3)}</div>
             <div className="text-xs text-slate-400 mt-1">
               {currentLossIfZero < 0.2 ? 'Good!' : 'High Error'}
             </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 italic">
          Notice: If True Label is 1, we want ŷ to be close to 1 (Low Loss). If True Label is 0, we want ŷ to be close to 0.
        </div>
      </div>
    </div>
  );
};

export default LossVisualizer;