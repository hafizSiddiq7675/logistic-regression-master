import React, { useState } from 'react';
import MathBlock from './MathBlock';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-500 hover:bg-brand-400 text-white shadow-lg rounded-full p-4 transition-transform hover:scale-110 font-bold"
        title="Quick Reference"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              <div className="p-4 bg-brand-900 text-white flex justify-between items-center">
                <h3 className="font-bold text-lg">Quick Formula Reference</h3>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              <div className="p-6 space-y-3 font-mono text-sm overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-[80px_1fr] gap-2 items-center border-b dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Linear</span>
                  <MathBlock latex="Z = wx + b" />
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2 items-center border-b dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Sigmoid</span>
                  <MathBlock latex="\hat{y} = \frac{1}{1 + e^{-Z}}" />
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2 items-center border-b dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Loss</span>
                  <MathBlock latex="L = -[y\log(\hat{y}) + (1-y)\log(1-\hat{y})]" />
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2 items-center border-b dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Cost</span>
                  <MathBlock latex="J = \frac{1}{m} \sum L" />
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2 items-center border-b dark:border-slate-800 pb-2">
                  <span className="text-slate-500">dw</span>
                  <MathBlock latex="\frac{1}{m} X^T (\hat{y} - y)" />
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2 items-center border-b dark:border-slate-800 pb-2">
                  <span className="text-slate-500">db</span>
                  <MathBlock latex="\frac{1}{m} \sum(\hat{y} - y)" />
                </div>
                 <div className="grid grid-cols-[80px_1fr] gap-2 items-center pt-2">
                  <span className="text-slate-500">Update</span>
                  <div>
                    <MathBlock latex="w := w - \alpha \cdot dw" block />
                    <MathBlock latex="b := b - \alpha \cdot db" block />
                  </div>
                </div>
                <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded text-center text-xs">
                  <span className="font-bold text-brand-500">SIGMOID:</span> +∞→1 &nbsp;|&nbsp; 0→0.5 &nbsp;|&nbsp; -∞→0
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingModal;