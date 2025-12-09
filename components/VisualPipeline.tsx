import React from 'react';
import { motion } from 'framer-motion';

const StepCard = ({ title, sub, delay }: { title: string; sub: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center justify-center p-3 bg-white dark:bg-brand-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 w-full md:w-32 min-h-[100px] text-center"
  >
    <div className="font-bold text-brand-500 text-sm md:text-base">{title}</div>
    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sub}</div>
  </motion.div>
);

const Arrow = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    className="hidden md:flex text-slate-400 dark:text-slate-600 text-xl font-bold"
  >
    →
  </motion.div>
);

const VisualPipeline: React.FC = () => {
  const steps = [
    { title: "Input (X)", sub: "Features" },
    { title: "Linear", sub: "Z = wx+b" },
    { title: "Sigmoid", sub: "ŷ = σ(Z)" },
    { title: "Loss", sub: "Error" },
    { title: "Cost", sub: "Avg Error" },
    { title: "Gradients", sub: "Slope" },
    { title: "Update", sub: "w, b" },
  ];

  return (
    <div className="w-full overflow-x-auto py-8">
      <div className="flex flex-row gap-2 md:gap-4 items-center justify-between min-w-[800px] md:min-w-0 px-2">
        {steps.map((step, idx) => (
          <React.Fragment key={step.title}>
            <StepCard title={step.title} sub={step.sub} delay={idx * 0.2} />
            {idx < steps.length - 1 && <Arrow delay={idx * 0.2 + 0.1} />}
          </React.Fragment>
        ))}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2, duration: 0.5 }}
           className="text-xs text-slate-400 font-mono absolute right-4 top-2"
        >
          ↻ Repeat until converged
        </motion.div>
      </div>
    </div>
  );
};

export default VisualPipeline;