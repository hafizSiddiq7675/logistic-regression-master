import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { SKLEARN_PYTHON_CODE } from '../constants';

// Declare types for window.loadPyodide
declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<any>;
  }
}

const SklearnPlayground: React.FC = () => {
  const [code, setCode] = useState(SKLEARN_PYTHON_CODE);
  const [output, setOutput] = useState<string[]>(["Initializing Python environment...", "Loading NumPy..."]);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Initialize Pyodide
  useEffect(() => {
    const initPyodide = async () => {
      try {
        if (window.loadPyodide && !pyodide) {
          const py = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
          });
          await py.loadPackage("numpy");
          setPyodide(py);
          setOutput(prev => [...prev, "Ready! Click 'Run' to execute sklearn workflow."]);
        }
      } catch (err) {
        setOutput(prev => [...prev, `Error loading Python: ${err}`]);
      }
    };
    initPyodide();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const runCode = async () => {
    if (!pyodide) return;
    setIsRunning(true);
    setOutput([]); // Clear previous output

    try {
      // Capture stdout
      pyodide.setStdout({
        batched: (msg: string) => setOutput(prev => [...prev, msg])
      });
      pyodide.setStderr({
        batched: (msg: string) => setOutput(prev => [...prev, `Error: ${msg}`])
      });

      await pyodide.runPythonAsync(code);
    } catch (err: any) {
      setOutput(prev => [...prev, `Traceback: ${err.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) setCode(value);
  };

  const resetCode = () => {
    if (window.confirm("Reset code to sklearn example?")) {
      setCode(SKLEARN_PYTHON_CODE);
      setOutput([]);
    }
  };

  return (
    <div className="flex flex-col h-[900px] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-xl">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 flex gap-2 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={runCode}
          disabled={!pyodide || isRunning}
          className={`px-4 py-1.5 rounded font-bold text-white text-sm flex items-center gap-2
            ${!pyodide || isRunning ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 transition'}`}
        >
          {isRunning ? (
             <><span className="animate-spin">⟳</span> Running...</>
          ) : (
             <>▶ Run sklearn Workflow</>
          )}
        </button>
        <button
          onClick={resetCode}
          className="px-4 py-1.5 rounded font-medium text-white bg-white/20 hover:bg-white/30 text-sm transition"
        >
          Reset
        </button>
        <div className="flex-grow"></div>
        <div className="text-xs text-white/80 self-center flex items-center gap-2">
            <span className="px-2 py-0.5 bg-white/20 rounded">sklearn-style</span>
            {pyodide ? "● Pyodide Ready" : "○ Loading..."}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Editor */}
        <div className="flex-1 h-full min-h-[350px]">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              scrollBeyondLastLine: false,
              wordWrap: 'on'
            }}
          />
        </div>

        {/* Output */}
        <div className="w-full md:w-2/5 bg-slate-900 text-slate-300 font-mono text-xs md:text-sm p-4 overflow-y-scroll max-h-[400px] md:max-h-[850px] border-t md:border-t-0 md:border-l border-slate-700" ref={outputRef}>
          <div className="uppercase tracking-wider text-cyan-400 mb-2 text-xs font-bold">sklearn Output</div>
          {output.length === 0 && <span className="text-slate-600 italic">No output yet...</span>}
          {output.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap mb-1 break-words">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SklearnPlayground;
