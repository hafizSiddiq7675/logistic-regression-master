import React from 'react';
import MathBlock from './MathBlock';

const MathNumpyTable: React.FC = () => {
  const rows = [
    {
      math: "Z = w \\cdot x + b",
      code: "Z = self.X.dot(self.w) + self.b"
    },
    {
      math: "\\hat{y} = \\frac{1}{1 + e^{-Z}}",
      code: "Y_hat = 1 / (1 + np.exp(-Z))"
    },
    {
      math: "\\frac{\\partial J}{\\partial w} = \\frac{1}{m} X^T \\cdot (\\hat{y} - y)",
      code: "dw = (1 / self.m) * np.dot(self.X.T, (Y_hat - self.Y))"
    },
    {
      math: "\\frac{\\partial J}{\\partial b} = \\frac{1}{m} \\sum(\\hat{y} - y)",
      code: "db = (1 / self.m) * np.sum(Y_hat - self.Y)"
    },
    {
      math: "w := w - \\alpha \\cdot dw",
      code: "self.w = self.w - self.learning_rate * dw"
    },
    {
      math: "\\hat{y} > 0.5 \\rightarrow 1",
      code: "Y_pred = np.where(Y_pred > 0.5, 1, 0)"
    }
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 shadow-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <th className="p-4 font-bold text-slate-700 dark:text-slate-200 w-1/3">Math Notation</th>
            <th className="p-4 font-bold text-slate-700 dark:text-slate-200 w-2/3">NumPy Implementation</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
              <td className="p-4">
                <MathBlock latex={row.math} />
              </td>
              <td className="p-4 font-mono text-sm text-brand-600 dark:text-brand-400 bg-slate-50 dark:bg-slate-950/50">
                {row.code}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MathNumpyTable;