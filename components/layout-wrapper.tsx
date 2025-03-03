'use client';

import { useLayoutStore } from '@/lib/stores/layout-store';
import DefaultLayout from '@/components/normal/layout';
import VSCodeLayout from '@/components/vscode/layout';
import { ReactNode } from 'react';

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { currentLayout } = useLayoutStore();

  switch (currentLayout) {
    case 'vscode':
      return <VSCodeLayout>{children}</VSCodeLayout>;
    case 'default':
    default:
      return <DefaultLayout>{children}</DefaultLayout>;
  }
}
