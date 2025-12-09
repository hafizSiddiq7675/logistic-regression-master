import React, { useState, useEffect } from 'react';
import VisualPipeline from './components/VisualPipeline';
import SigmoidGraph from './components/SigmoidGraph';
import LossVisualizer from './components/LossVisualizer';
import MathNumpyTable from './components/MathNumpyTable';
import PythonPlayground from './components/PythonPlayground';
import FloatingModal from './components/FloatingModal';
import MathBlock from './components/MathBlock';

// Section Wrapper Component
const Section: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  id?: string;
  className?: string; 
}> = ({ title, children, id, className = '' }) => (
  <section id={id} className={`py-12 px-4 md:px-8 max-w-5xl mx-auto border-b border-slate-200 dark:border-slate-800 ${className}`}>
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-brand-900 dark:text-white flex items-center gap-3">
      <span className="w-2 h-8 bg-brand-500 rounded-full inline-block"></span>
      {title}
    </h2>
    {children}
  </section>
);

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Initialize Theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-brand-900/70 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-cyan-400">
              Logistic Regression
            </span>
            <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-mono">
              Cheat Sheet
            </span>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      <main>
        {/* Section 1: Pipeline */}
        <div className="bg-slate-50 dark:bg-[#0b1120]">
          <Section title="Visual Pipeline" id="pipeline">
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              The end-to-end flow of a single training iteration.
            </p>
            <VisualPipeline />
          </Section>
        </div>

        {/* Section 2: Linear Equation */}
        <Section title="The Linear Step" id="linear">
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <div>
                <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                  First, we compute a linear combination of inputs and weights. This is identical to Linear Regression so far.
                </p>
                <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <MathBlock latex="Z = w \cdot x + b" block className="text-2xl" />
                </div>
             </div>
             <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <code className="bg-slate-200 dark:bg-slate-700 px-2 rounded font-bold text-brand-600 dark:text-brand-400">w</code>
                  <span><strong>Weights:</strong> Importance of each feature.</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="bg-slate-200 dark:bg-slate-700 px-2 rounded font-bold text-brand-600 dark:text-brand-400">x</code>
                  <span><strong>Features:</strong> Input data.</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="bg-slate-200 dark:bg-slate-700 px-2 rounded font-bold text-brand-600 dark:text-brand-400">b</code>
                  <span><strong>Bias:</strong> Baseline intercept.</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="bg-slate-200 dark:bg-slate-700 px-2 rounded font-bold text-brand-600 dark:text-brand-400">Z</code>
                  <span><strong>Logits:</strong> Unbounded score (-∞ to +∞).</span>
                </div>
             </div>
          </div>
        </Section>

        {/* Section 3: Sigmoid */}
        <Section title="Sigmoid Activation" id="sigmoid">
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            We squash the unbounded linear output <MathBlock latex="Z"/> into a probability between 0 and 1.
          </p>
          <SigmoidGraph />
        </Section>

        {/* Section 4: Loss Function */}
        <Section title="Log Loss Function" id="loss">
          <div className="mb-8">
            <MathBlock latex="L(y, \hat{y}) = -\left( y \log(\hat{y}) + (1 - y) \log(1 - \hat{y}) \right)" block className="text-xl"/>
          </div>
          <LossVisualizer />
        </Section>

        {/* Section 5: Cost Function */}
        <Section title="Cost Function (J)" id="cost">
           <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-lg text-center">
             <h3 className="text-amber-700 dark:text-amber-500 font-bold mb-2">Cost vs Loss</h3>
             <p className="text-slate-700 dark:text-slate-300">
               <strong>Loss</strong> is the error for a single example.<br/>
               <strong>Cost</strong> is the average error over the entire dataset (m examples).
             </p>
           </div>
           <div className="mt-6 p-6 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto">
              <MathBlock latex="J(w,b) = -\frac{1}{m} \sum_{i=1}^{m} \left[ y^{(i)} \log(\hat{y}^{(i)}) + (1 - y^{(i)}) \log(1 - \hat{y}^{(i)}) \right]" block className="text-lg md:text-xl"/>
           </div>
        </Section>

        {/* Section 6 & 7: Gradients & Update */}
        <Section title="Gradients & Updates" id="gradients">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-brand-500 mb-4">Calculate Gradients</h3>
              <p className="text-sm text-slate-500 mb-4">How much should we change w and b to reduce error?</p>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                   <MathBlock latex="\frac{\partial J}{\partial w} = \frac{1}{m} \sum_{i=1}^{m} (\hat{y}^{(i)} - y^{(i)}) \cdot x^{(i)}" block/>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                   <MathBlock latex="\frac{\partial J}{\partial b} = \frac{1}{m} \sum_{i=1}^{m} (\hat{y}^{(i)} - y^{(i)})" block/>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc pl-4">
                 <li><MathBlock latex="(\hat{y} - y)"/>: The Prediction Error</li>
                 <li><MathBlock latex="\times x"/>: Multiplied by input (feature attribution)</li>
                 <li><MathBlock latex="\frac{1}{m}"/>: Averaged over dataset</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-green-500 mb-4">Update Parameters</h3>
              <p className="text-sm text-slate-500 mb-4">Nudge weights in opposite direction of gradient.</p>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                   <MathBlock latex="w_{new} = w_{old} - \alpha \frac{\partial J}{\partial w}" block/>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                   <MathBlock latex="b_{new} = b_{old} - \alpha \frac{\partial J}{\partial b}" block/>
                </div>
              </div>
               <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                 <span className="font-bold text-brand-500">α (Alpha):</span> Learning Rate. Controls step size.
               </div>
            </div>
          </div>
        </Section>

        {/* Section 8: Math vs Numpy */}
        <Section title="Math ↔ NumPy Mapping" id="mapping">
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            Translating mathematical formulas directly into vectorized Python code.
          </p>
          <MathNumpyTable />
        </Section>

        {/* Section 9: Playground */}
        <Section title="Python Playground" id="playground">
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            A full in-browser environment (Pyodide) running NumPy. The code below implements the class from scratch.
          </p>
          <PythonPlayground />
        </Section>
      </main>

      <footer className="bg-slate-100 dark:bg-slate-900 py-8 text-center text-slate-500 text-sm">
        <p>Logistic Regression Interactive Cheat Sheet</p>
      </footer>

      <FloatingModal />
    </div>
  );
};

export default App;