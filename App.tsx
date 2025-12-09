import React, { useState, useEffect } from 'react';
import VisualPipeline from './components/VisualPipeline';
import SigmoidGraph from './components/SigmoidGraph';
import LossVisualizer from './components/LossVisualizer';
import MathNumpyTable from './components/MathNumpyTable';
import PythonPlayground from './components/PythonPlayground';
import SklearnPlayground from './components/SklearnPlayground';
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

        {/* Section 10: sklearn Workflow */}
        <div className="bg-gradient-to-b from-slate-50 to-blue-50 dark:from-[#0b1120] dark:to-[#0a1628]">
          <Section title="Using Built-in Functions (sklearn)" id="sklearn">
            <div className="mb-6">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Now let's use scikit-learn (sklearn) library with its built-in functions. This demonstrates the real-world workflow for machine learning:
              </p>

              {/* Workflow Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="text-2xl font-bold text-blue-500 mb-2">1</div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Import & Load</h4>
                  <p className="text-xs text-slate-500">pandas, StandardScaler, train_test_split, LogisticRegression</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="text-2xl font-bold text-green-500 mb-2">2</div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Preprocess</h4>
                  <p className="text-xs text-slate-500">StandardScaler to normalize features</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="text-2xl font-bold text-amber-500 mb-2">3</div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Split Data</h4>
                  <p className="text-xs text-slate-500">80% training, 20% testing</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="text-2xl font-bold text-purple-500 mb-2">4</div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Train & Predict</h4>
                  <p className="text-xs text-slate-500">classifier.fit() and classifier.predict()</p>
                </div>
              </div>

              {/* PIMA Dataset Info */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2">PIMA Diabetes Dataset</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  A classic dataset with 768 samples and 8 features:
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-amber-100 dark:bg-amber-800/40 px-2 py-1 rounded">Pregnancies</span>
                  <span className="bg-amber-100 dark:bg-amber-800/40 px-2 py-1 rounded">Glucose</span>
                  <span className="bg-amber-100 dark:bg-amber-800/40 px-2 py-1 rounded">BloodPressure</span>
                  <span className="bg-amber-100 dark:bg-amber-800/40 px-2 py-1 rounded">SkinThickness</span>
                  <span className="bg-amber-100 dark:bg-amber-800/40 px-2 py-1 rounded">Insulin</span>
                  <span className="bg-amber-100 dark:bg-amber-800/40 px-2 py-1 rounded">BMI</span>
                  <span className="bg-amber-100 dark:bg-amber-800/40 px-2 py-1 rounded">DiabetesPedigreeFunction</span>
                  <span className="bg-amber-100 dark:bg-amber-800/40 px-2 py-1 rounded">Age</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  <strong>Target:</strong> Outcome (0 = Non-Diabetic, 1 = Diabetic)
                </p>
              </div>

              {/* Key sklearn Functions */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-cyan-600 dark:text-cyan-400 mb-3">Key sklearn Functions</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      <code className="text-purple-600 dark:text-purple-400">StandardScaler()</code>
                      <p className="text-xs text-slate-500 mt-1">Normalizes features to mean=0, std=1</p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      <code className="text-purple-600 dark:text-purple-400">train_test_split(X, y, test_size=0.2)</code>
                      <p className="text-xs text-slate-500 mt-1">Splits data into train/test sets</p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      <code className="text-purple-600 dark:text-purple-400">LogisticRegression().fit(X, y)</code>
                      <p className="text-xs text-slate-500 mt-1">Trains the model</p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      <code className="text-purple-600 dark:text-purple-400">accuracy_score(y_true, y_pred)</code>
                      <p className="text-xs text-slate-500 mt-1">Calculates prediction accuracy</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-green-600 dark:text-green-400 mb-3">Predictive System Flow</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <span>Input raw data tuple</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <span>Convert to numpy array</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <span>Reshape for single prediction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                      <span>Standardize using fitted scaler</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                      <span>Get prediction (0 or 1)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SklearnPlayground />
          </Section>
        </div>
      </main>

      <footer className="bg-slate-100 dark:bg-slate-900 py-8 text-center text-slate-500 text-sm">
        <p>Logistic Regression Interactive Cheat Sheet</p>
      </footer>

      <FloatingModal />
    </div>
  );
};

export default App;