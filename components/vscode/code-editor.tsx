'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Play, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  theme?: 'light' | 'dark';
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '// Write your code here\nconsole.log("Hello, world!");',
  language = 'javascript',
  theme = 'dark',
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runCode = () => {
    setIsRunning(true);
    setError(null);
    setOutput('');

    try {
      // For JavaScript/TypeScript code, we can use browser evaluation
      if (language === 'javascript' || language === 'typescript') {
        // Create a safe context for evaluation
        const consoleOutput: string[] = [];
        const safeConsole = {
          log: (...args: any[]) => {
            consoleOutput.push(
              args
                .map((arg) =>
                  typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                )
                .join(' ')
            );
          },
          error: (...args: any[]) => {
            consoleOutput.push(
              `Error: ${args.map((arg) => String(arg)).join(' ')}`
            );
          },
          warn: (...args: any[]) => {
            consoleOutput.push(
              `Warning: ${args.map((arg) => String(arg)).join(' ')}`
            );
          },
        };

        // Create a function that will run in a controlled environment
        const runSafeCode = new Function(
          'console',
          `
          try {
            ${code}
            return { success: true, output: [] };
          } catch (error) {
            return { success: false, error: error.message };
          }
        `
        );

        // Execute the code
        const result = runSafeCode(safeConsole);

        if (result.success) {
          setOutput(consoleOutput.join('\n'));
        } else {
          setError(result.error);
          setOutput(`Error: ${result.error}`);
        }
      } else {
        // For other languages, provide a more informative message
        const supportedLanguages = [
          'javascript',
          'typescript',
          'python',
          'java',
          'cpp',
          'c++',
          'csharp',
          'c#',
          'go',
          'ruby',
          'rust',
        ];

        if (supportedLanguages.includes(language)) {
          setOutput(
            `This is a demonstration of ${language} code.\n\n` +
              `In a production environment, this would execute your ${language} code on a backend server.\n\n` +
              `Currently, only JavaScript and TypeScript can be executed directly in the browser.\n\n` +
              `Your code:\n\n${code}`
          );
        } else {
          setOutput(
            `Language "${language}" is not recognized.\n\n` +
              `Supported languages for display: ${supportedLanguages.join(', ')}\n\n` +
              `Only JavaScript and TypeScript can be executed directly in the browser.`
          );
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setOutput(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#1e1e1e] text-white">
      <div className="flex items-center justify-between border-b border-[#333333] bg-[#252526] px-4 py-2">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-[#007acc]" />
          <span className="text-sm">Interactive Code Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={cn(
              'flex items-center gap-1 rounded px-2 py-1 text-xs',
              isRunning
                ? 'cursor-not-allowed bg-[#4d4d4d] text-[#cccccc]'
                : 'cursor-pointer bg-[#007acc] text-white hover:bg-[#0069ac]'
            )}
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Play size={14} />
            )}
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Code input area */}
        <div className="flex-1 overflow-hidden border-r border-[#333333]">
          <div className="flex h-8 items-center border-b border-[#333333] bg-[#252526] px-4">
            <span className="text-xs text-[#858585]">editor.{language}</span>
          </div>
          <textarea
            className="font-mono h-[calc(100%-2rem)] w-full resize-none bg-[#1e1e1e] p-4 text-sm text-[#d4d4d4] outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Output area */}
        <div className="flex-1 overflow-hidden">
          <div className="flex h-8 items-center border-b border-[#333333] bg-[#252526] px-4">
            <span className="text-xs text-[#858585]">output.console</span>
          </div>
          <pre
            className={cn(
              'font-mono h-[calc(100%-2rem)] w-full overflow-auto p-4 text-sm',
              error ? 'text-[#f48771]' : 'text-[#d4d4d4]'
            )}
          >
            {output || 'Click "Run Code" to see the output here.'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
