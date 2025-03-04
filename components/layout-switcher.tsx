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
          label: 'VS Code',
        };
      default:
        return {
          icon: <Layout className="h-[1.2rem] w-[1.2rem]" />,
          label: 'Normal',
        };
    }
  };

  const { icon, label } = getLayoutInfo();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="max-w-[200px] rounded-lg border border-primary/30 bg-background/90 p-2 shadow-lg backdrop-blur-sm transition-colors hover:border-primary/50 sm:max-w-none sm:p-2.5">
        <p className="mb-1 truncate text-[10px] font-medium text-primary sm:mb-1.5 sm:text-xs">
          {label}
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex w-full items-center gap-1 border-primary/40 bg-white text-xs hover:border-primary hover:bg-gray-300 sm:w-auto sm:gap-2 sm:text-sm"
                  >
                    {icon}
                    <span className="xs:inline hidden">Change Theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border-primary/30 text-xs sm:text-sm"
                >
                  <DropdownMenuItem
                    onClick={() => setLayout('default')}
                    className="hover:bg-primary/10"
                  >
                    <Layout className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Normal Theme
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLayout('vscode')}
                    className="hover:bg-primary/10"
                  >
                    <Code className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    VS Code Theme
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent className="border-primary/30 text-xs sm:text-sm">
              <p>Change the visual theme of the website</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
