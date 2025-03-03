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
} from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [debugStatus, setDebugStatus] = useState<
    'idle' | 'running' | 'paused' | 'error'
  >('idle');
  const [expandedSections, setExpandedSections] = useState({
    variables: true,
    callStack: true,
    breakpoints: true,
    output: false,
  });
  const [selectedTab, setSelectedTab] = useState('debug');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  // Mock projects
  const projects: DebugProject[] = [
    {
      name: 'portfolio-website',
      language: 'TypeScript',
      description: 'Next.js portfolio website',
      status: 'idle',
    },
    {
      name: 'fit-sixes-2024',
      language: 'JavaScript',
      description: 'Sports event website',
      status: 'idle',
    },
    {
      name: 'product-selector',
      language: 'TypeScript',
      description: 'Product filtering tool',
      status: 'idle',
    },
    {
      name: 'medusa-ecommerce',
      language: 'JavaScript',
      description: 'E-commerce platform',
      status: 'idle',
    },
  ];

  // Mock variables for debugging
  const [variables, setVariables] = useState<DebugVariable[]>([
    {
      name: 'user',
      value: 'Object',
      type: 'object',
      expandable: true,
      expanded: false,
      children: [
        { name: 'name', value: '"Sampath Kumara"', type: 'string' },
        { name: 'role', value: '"Software Engineer"', type: 'string' },
        {
          name: 'skills',
          value: 'Array(12)',
          type: 'array',
          expandable: true,
          expanded: false,
        },
        { name: 'experience', value: '3', type: 'number' },
      ],
    },
    {
      name: 'projects',
      value: 'Array(5)',
      type: 'array',
      expandable: true,
      expanded: false,
      children: [
        { name: '0', value: '"Portfolio Website"', type: 'string' },
        { name: '1', value: '"FIT Sixes 2024"', type: 'string' },
        { name: '2', value: '"Product Selector"', type: 'string' },
        { name: '3', value: '"Medusa E-commerce"', type: 'string' },
        { name: '4', value: '"Spring Boot Microservices"', type: 'string' },
      ],
    },
    {
      name: 'currentProject',
      value: 'null',
      type: 'null',
    },
    {
      name: 'isLoading',
      value: 'false',
      type: 'boolean',
    },
    {
      name: 'error',
      value: 'undefined',
      type: 'undefined',
    },
  ]);

  // Mock call stack
  const callStack: CallStackFrame[] = [
    { name: 'renderPortfolio', file: 'portfolio.tsx', line: 42 },
    { name: 'ProjectComponent.render', file: 'ProjectComponent.tsx', line: 23 },
    { name: 'React.Component.render', file: 'react.js', line: 1256 },
    { name: 'dispatchAction', file: 'redux.js', line: 78 },
  ];

  // Mock breakpoints
  const breakpoints: Breakpoint[] = [
    { id: 1, file: 'portfolio.tsx', line: 42, enabled: true },
    {
      id: 2,
      file: 'ProjectComponent.tsx',
      line: 23,
      condition: 'project.id === "featured"',
      enabled: true,
    },
    { id: 3, file: 'api.js', line: 15, enabled: false },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const toggleVariable = (index: number) => {
    const newVariables = [...variables];
    newVariables[index].expanded = !newVariables[index].expanded;
    setVariables(newVariables);
  };

  const toggleChildVariable = (parentIndex: number, childIndex: number) => {
    const newVariables = [...variables];
    if (
      newVariables[parentIndex].children &&
      newVariables[parentIndex].children![childIndex].expandable
    ) {
      newVariables[parentIndex].children![childIndex].expanded =
        !newVariables[parentIndex].children![childIndex].expanded;
      setVariables(newVariables);
    }
  };

  const startDebugging = (projectName: string) => {
    setActiveProject(projectName);
    setDebugStatus('running');

    // Add console output
    const newOutput = [
      `Debugging session started for ${projectName}`,
      `Initializing ${projectName}...`,
      'Loading dependencies...',
      'Dependencies loaded successfully',
      'Starting development server...',
      'Server started at http://localhost:3000',
      'Waiting for connections...',
    ];

    setConsoleOutput(newOutput);

    // Simulate pausing at breakpoint after 2 seconds
    setTimeout(() => {
      setDebugStatus('paused');
      setConsoleOutput([
        ...newOutput,
        'Paused at breakpoint: portfolio.tsx:42',
      ]);
    }, 2000);
  };

  const continueDebugging = () => {
    if (debugStatus === 'paused') {
      setDebugStatus('running');

      // Simulate running to completion
      setTimeout(() => {
        setDebugStatus('idle');
        setActiveProject(null);
        setConsoleOutput([
          ...consoleOutput,
          'Resumed execution',
          'Debugging session completed',
        ]);
      }, 1500);
    }
  };

  const pauseDebugging = () => {
    if (debugStatus === 'running') {
      setDebugStatus('paused');
      setConsoleOutput([...consoleOutput, 'Execution paused manually']);
    }
  };

  const stopDebugging = () => {
    setDebugStatus('idle');
    setActiveProject(null);
    setConsoleOutput([...consoleOutput, 'Debugging session terminated']);
  };

  const stepOver = () => {
    if (debugStatus === 'paused') {
      setConsoleOutput([...consoleOutput, 'Stepped over to next line']);
    }
  };

  const restartDebugging = () => {
    if (activeProject) {
      stopDebugging();
      setTimeout(() => startDebugging(activeProject), 500);
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'TypeScript':
        return <span className="text-blue-500">TS</span>;
      case 'JavaScript':
        return <span className="text-yellow-500">JS</span>;
      case 'Python':
        return <span className="text-green-500">PY</span>;
      case 'Java':
        return <span className="text-orange-500">JV</span>;
      default:
        return <span className="text-gray-500">?</span>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'string':
        return 'text-green-400';
      case 'number':
        return 'text-blue-400';
      case 'boolean':
        return 'text-purple-400';
      case 'object':
      case 'array':
        return 'text-yellow-400';
      case 'null':
      case 'undefined':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#252526]">
      <div className="p-4">
        <h2 className="mb-4 text-xs font-medium uppercase text-[#bbbbbb]">
          Run and Debug
        </h2>

        <div className="mb-4 flex items-center">
          <button
            className={`flex items-center rounded px-3 py-1 text-sm ${
              debugStatus === 'idle'
                ? 'bg-[#007acc] text-white hover:bg-[#007acc]/90'
                : 'cursor-not-allowed bg-[#333333] text-[#bbbbbb]'
            }`}
            onClick={() => activeProject && startDebugging(activeProject)}
            disabled={debugStatus !== 'idle'}
          >
            <Play size={14} className="mr-1" />
            Start Debugging
          </button>

          {debugStatus !== 'idle' && (
            <div className="ml-2 flex space-x-1">
              {debugStatus === 'running' ? (
                <button
                  className="rounded p-1 text-[#bbbbbb] hover:bg-[#333333]"
                  onClick={pauseDebugging}
                  title="Pause"
                >
                  <Pause size={14} />
                </button>
              ) : (
                <button
                  className="rounded p-1 text-[#bbbbbb] hover:bg-[#333333]"
                  onClick={continueDebugging}
                  title="Continue"
                >
                  <Play size={14} />
                </button>
              )}

              <button
                className="rounded p-1 text-[#bbbbbb] hover:bg-[#333333]"
                onClick={stepOver}
                title="Step Over"
                disabled={debugStatus !== 'paused'}
              >
                <SkipForward size={14} />
              </button>

              <button
                className="rounded p-1 text-[#bbbbbb] hover:bg-[#333333]"
                onClick={restartDebugging}
                title="Restart"
              >
                <RefreshCw size={14} />
              </button>

              <button
                className="rounded p-1 text-[#bbbbbb] hover:bg-[#333333]"
                onClick={stopDebugging}
                title="Stop"
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded bg-[#bbbbbb]">
                  <span className="h-2 w-2 bg-[#252526]"></span>
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="mb-4 rounded border border-[#333333] bg-[#1e1e1e] p-3">
          <h3 className="mb-2 text-sm font-medium text-white">
            Launch Configurations
          </h3>
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.name}
                className={`flex cursor-pointer items-center rounded px-2 py-1.5 text-sm ${
                  activeProject === project.name
                    ? 'bg-[#37373d] text-white'
                    : 'text-[#bbbbbb] hover:bg-[#2a2d2e]'
                }`}
                onClick={() =>
                  debugStatus === 'idle' && setActiveProject(project.name)
                }
              >
                <div className="mr-2">{getLanguageIcon(project.language)}</div>
                <div className="flex-1">
                  <div className="font-medium">{project.name}</div>
                  <div className="text-xs text-[#858585]">
                    {project.description}
                  </div>
                </div>
                {activeProject === project.name && debugStatus !== 'idle' && (
                  <div className="flex items-center">
                    {debugStatus === 'running' && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: 'linear',
                        }}
                        className="text-[#007acc]"
                      >
                        <RefreshCw size={14} />
                      </motion.div>
                    )}
                    {debugStatus === 'paused' && (
                      <Pause size={14} className="text-[#007acc]" />
                    )}
                    {debugStatus === 'error' && (
                      <AlertCircle size={14} className="text-red-500" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex border-b border-[#333333] bg-[#252526]">
          <button
            className={`px-4 py-2 text-xs font-medium ${
              selectedTab === 'debug'
                ? 'border-b-2 border-[#007acc] text-white'
                : 'text-[#bbbbbb] hover:text-white'
            }`}
            onClick={() => setSelectedTab('debug')}
          >
            Debug
          </button>
          <button
            className={`px-4 py-2 text-xs font-medium ${
              selectedTab === 'console'
                ? 'border-b-2 border-[#007acc] text-white'
                : 'text-[#bbbbbb] hover:text-white'
            }`}
            onClick={() => setSelectedTab('console')}
          >
            Console
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {selectedTab === 'debug' ? (
            <div className="p-2">
              {/* Variables section */}
              <div className="mb-2">
                <div
                  className="flex cursor-pointer items-center px-2 py-1 text-xs text-[#bbbbbb] hover:bg-[#2a2d2e]"
                  onClick={() => toggleSection('variables')}
                >
                  {expandedSections.variables ? (
                    <ChevronDown size={14} className="mr-1" />
                  ) : (
                    <ChevronRight size={14} className="mr-1" />
                  )}
                  <span className="font-medium">VARIABLES</span>
                </div>

                {expandedSections.variables && (
                  <div className="ml-2 mt-1 space-y-1">
                    {variables.map((variable, index) => (
                      <div key={variable.name}>
                        <div
                          className={`flex cursor-pointer items-center px-2 py-0.5 text-xs hover:bg-[#2a2d2e] ${
                            variable.expandable ? 'cursor-pointer' : ''
                          }`}
                          onClick={() =>
                            variable.expandable && toggleVariable(index)
                          }
                        >
                          {variable.expandable ? (
                            variable.expanded ? (
                              <ChevronDown
                                size={12}
                                className="mr-1 text-[#858585]"
                              />
                            ) : (
                              <ChevronRight
                                size={12}
                                className="mr-1 text-[#858585]"
                              />
                            )
                          ) : (
                            <span className="ml-3 mr-1"></span>
                          )}
                          <span className="text-[#bbbbbb]">
                            {variable.name}:{' '}
                          </span>
                          <span
                            className={`ml-1 ${getTypeColor(variable.type)}`}
                          >
                            {variable.value}
                          </span>
                        </div>

                        {variable.expanded && variable.children && (
                          <div className="ml-4 space-y-1">
                            {variable.children.map((child, childIndex) => (
                              <div key={`${variable.name}-${child.name}`}>
                                <div
                                  className={`flex cursor-pointer items-center px-2 py-0.5 text-xs hover:bg-[#2a2d2e] ${
                                    child.expandable ? 'cursor-pointer' : ''
                                  }`}
                                  onClick={() =>
                                    child.expandable &&
                                    toggleChildVariable(index, childIndex)
                                  }
                                >
                                  {child.expandable ? (
                                    child.expanded ? (
                                      <ChevronDown
                                        size={12}
                                        className="mr-1 text-[#858585]"
                                      />
                                    ) : (
                                      <ChevronRight
                                        size={12}
                                        className="mr-1 text-[#858585]"
                                      />
                                    )
                                  ) : (
                                    <span className="ml-3 mr-1"></span>
                                  )}
                                  <span className="text-[#bbbbbb]">
                                    {child.name}:{' '}
                                  </span>
                                  <span
                                    className={`ml-1 ${getTypeColor(child.type)}`}
                                  >
                                    {child.value}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Call Stack section */}
              <div className="mb-2">
                <div
                  className="flex cursor-pointer items-center px-2 py-1 text-xs text-[#bbbbbb] hover:bg-[#2a2d2e]"
                  onClick={() => toggleSection('callStack')}
                >
                  {expandedSections.callStack ? (
                    <ChevronDown size={14} className="mr-1" />
                  ) : (
                    <ChevronRight size={14} className="mr-1" />
                  )}
                  <span className="font-medium">CALL STACK</span>
                </div>

                {expandedSections.callStack && (
                  <div className="ml-2 mt-1 space-y-1">
                    {callStack.map((frame, index) => (
                      <div
                        key={`${frame.name}-${index}`}
                        className="flex cursor-pointer items-center px-2 py-0.5 text-xs hover:bg-[#2a2d2e]"
                      >
                        <span className="text-[#bbbbbb]">{frame.name}</span>
                        <span className="ml-2 text-[#858585]">
                          {frame.file}:{frame.line}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Breakpoints section */}
              <div className="mb-2">
                <div
                  className="flex cursor-pointer items-center px-2 py-1 text-xs text-[#bbbbbb] hover:bg-[#2a2d2e]"
                  onClick={() => toggleSection('breakpoints')}
                >
                  {expandedSections.breakpoints ? (
                    <ChevronDown size={14} className="mr-1" />
                  ) : (
                    <ChevronRight size={14} className="mr-1" />
                  )}
                  <span className="font-medium">BREAKPOINTS</span>
                </div>

                {expandedSections.breakpoints && (
                  <div className="ml-2 mt-1 space-y-1">
                    {breakpoints.map((breakpoint) => (
                      <div
                        key={breakpoint.id}
                        className="flex cursor-pointer items-center px-2 py-0.5 text-xs hover:bg-[#2a2d2e]"
                      >
                        <span
                          className={`mr-2 h-3 w-3 rounded-full ${breakpoint.enabled ? 'bg-red-500' : 'bg-[#858585]'}`}
                        ></span>
                        <span className="text-[#bbbbbb]">
                          {breakpoint.file}:{breakpoint.line}
                        </span>
                        {breakpoint.condition && (
                          <span className="ml-2 text-[#858585]">
                            when {breakpoint.condition}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="font-mono h-full bg-[#1e1e1e] p-2 text-xs">
              {consoleOutput.length === 0 ? (
                <div className="flex h-full items-center justify-center text-[#858585]">
                  <Terminal size={16} className="mr-2" />
                  <span>Console output will appear here</span>
                </div>
              ) : (
                <div className="space-y-1">
                  {consoleOutput.map((line, index) => (
                    <div key={index} className="flex">
                      <span className="mr-2 text-[#858585]">[{index + 1}]</span>
                      {line.includes('Error') || line.includes('error') ? (
                        <span className="text-red-400">{line}</span>
                      ) : line.includes('Warning') ||
                        line.includes('warning') ? (
                        <span className="text-yellow-400">{line}</span>
                      ) : line.includes('Paused') ||
                        line.includes('breakpoint') ? (
                        <span className="text-blue-400">{line}</span>
                      ) : (
                        <span className="text-[#bbbbbb]">{line}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[#333333] bg-[#252526] p-2 text-xs text-[#858585]">
        {debugStatus === 'idle' ? (
          <div className="flex items-center">
            <Bug size={14} className="mr-2" />
            <span>Not debugging</span>
          </div>
        ) : debugStatus === 'running' ? (
          <div className="flex items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="mr-2 text-[#007acc]"
            >
              <RefreshCw size={14} />
            </motion.div>
            <span>Debugging {activeProject}</span>
          </div>
        ) : debugStatus === 'paused' ? (
          <div className="flex items-center">
            <Pause size={14} className="mr-2 text-[#007acc]" />
            <span>Paused at breakpoint</span>
          </div>
        ) : (
          <div className="flex items-center">
            <AlertCircle size={14} className="mr-2 text-red-500" />
            <span>Error in debugging session</span>
          </div>
        )}
      </div>
    </div>
  );
}
