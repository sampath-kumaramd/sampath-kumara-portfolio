'use client';

import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Bug,
  Terminal,
  AlertCircle,
  Info,
  Code,
  Settings,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface DebugProject {
  name: string;
  language: string;
  description: string;
  status: 'idle' | 'running' | 'paused' | 'error';
}

interface DebugVariable {
  name: string;
  value: string;
  type: string;
  expandable?: boolean;
  children?: DebugVariable[];
  expanded?: boolean;
}

interface CallStackFrame {
  name: string;
  file: string;
  line: number;
}

interface Breakpoint {
  id: number;
  file: string;
  line: number;
  condition?: string;
  enabled: boolean;
}

export default function RunDebug() {
  const router = useRouter();
  const [folderStates, setFolderStates] = useState({
    run: true,
    variables: false,
    breakpoints: false,
  });

  const toggleFolder = (folderName: keyof typeof folderStates) => {
    setFolderStates((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  return (
    <div className="h-full overflow-y-auto bg-[#252526] text-[#cccccc]">
      <div className="p-2 text-xs font-medium uppercase text-[#bbbbbb]">
        RUN AND DEBUG
      </div>

      <div className="mt-2">
        <div
          className="flex cursor-pointer items-center px-2 py-1 text-xs font-medium text-[#bbbbbb] hover:bg-[#2a2d2e]"
          onClick={() => toggleFolder('run')}
        >
          {folderStates.run ? (
            <ChevronDown size={16} className="mr-1" />
          ) : (
            <ChevronRight size={16} className="mr-1" />
          )}
          <span>RUN</span>
        </div>

        {folderStates.run && (
          <div className="ml-4 mt-1">
            <div
              className="flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]"
              onClick={() => router.push('/vscode/playground/javascript')}
            >
              <Code size={14} className="text-[#75beff]" />
              <span>JavaScript </span>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]"
              onClick={() => router.push('/vscode/playground/typescript')}
            >
              <Code size={14} className="text-[#75beff]" />
              <span>TypeScript </span>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]"
              onClick={() => router.push('/vscode/playground/python')}
            >
              <Code size={14} className="text-[#75beff]" />
              <span>Python </span>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]"
              onClick={() => router.push('/vscode/playground/java')}
            >
              <Code size={14} className="text-[#75beff]" />
              <span>Java </span>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]"
              onClick={() => router.push('/vscode/playground/cpp')}
            >
              <Code size={14} className="text-[#75beff]" />
              <span>C++ </span>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]"
              onClick={() => router.push('/vscode/playground/csharp')}
            >
              <Code size={14} className="text-[#75beff]" />
              <span>C# </span>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]"
              onClick={() => router.push('/vscode/playground/go')}
            >
              <Code size={14} className="text-[#75beff]" />
              <span>Go </span>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]"
              onClick={() => router.push('/vscode/playground/ruby')}
            >
              <Code size={14} className="text-[#75beff]" />
              <span>Ruby </span>
            </div>
            <div
              className="flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]"
              onClick={() => router.push('/vscode/playground/rust')}
            >
              <Code size={14} className="text-[#75beff]" />
              <span>Rust </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div
          className="flex cursor-pointer items-center px-2 py-1 text-xs font-medium text-[#bbbbbb] hover:bg-[#2a2d2e]"
          onClick={() => toggleFolder('variables')}
        >
          {folderStates.variables ? (
            <ChevronDown size={16} className="mr-1" />
          ) : (
            <ChevronRight size={16} className="mr-1" />
          )}
          <span>VARIABLES</span>
        </div>
      </div>

      <div className="mt-4">
        <div
          className="flex cursor-pointer items-center px-2 py-1 text-xs font-medium text-[#bbbbbb] hover:bg-[#2a2d2e]"
          onClick={() => toggleFolder('breakpoints')}
        >
          {folderStates.breakpoints ? (
            <ChevronDown size={16} className="mr-1" />
          ) : (
            <ChevronRight size={16} className="mr-1" />
          )}
          <span>BREAKPOINTS</span>
        </div>
      </div>

      <div className="mt-8 px-2 text-xs text-[#bbbbbb]">
        <div className="flex items-center gap-2">
          <Settings size={14} />
          <span>Configure Run and Debug</span>
        </div>
      </div>
    </div>
  );
}
