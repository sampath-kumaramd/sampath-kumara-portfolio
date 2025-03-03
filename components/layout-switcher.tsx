'use client';

import { useLayoutStore } from '@/lib/stores/layout-store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Layout, Code, Palette } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function LayoutSwitcher() {
  const { currentLayout, setLayout } = useLayoutStore();

  // Get the icon and label based on current layout
  const getLayoutInfo = () => {
    switch (currentLayout) {
      case 'vscode':
        return {
          icon: <Code className="h-[1.2rem] w-[1.2rem]" />,
          label: 'VS Code Theme',
        };
      default:
        return {
          icon: <Layout className="h-[1.2rem] w-[1.2rem]" />,
          label: 'Default Layout',
        };
    }
  };

  const { icon, label } = getLayoutInfo();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="rounded-lg border border-primary/30 bg-background/90 p-2.5 shadow-lg backdrop-blur-sm transition-colors hover:border-primary/50">
        <p className="mb-1.5 text-xs font-medium text-primary">
          Current Theme: {label}
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-primary/40 bg-white hover:border-primary hover:bg-gray-300"
                  >
                    {icon}
                    <span className="hidden sm:inline">Change Theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-primary/30">
                  <DropdownMenuItem
                    onClick={() => setLayout('default')}
                    className="hover:bg-primary/10"
                  >
                    <Layout className="mr-2 h-4 w-4" />
                    Default Layout
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLayout('vscode')}
                    className="hover:bg-primary/10"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    VS Code Theme
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent className="border-primary/30">
              <p>Change the visual theme of the website</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
