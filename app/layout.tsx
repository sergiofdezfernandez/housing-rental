'use client';
import React from 'react';
import '@/app/global.css';
import Web3ContextProvider from '@/components/web3/Web3Context';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Web3ContextProvider>
          <AntdRegistry>{children}</AntdRegistry>
          <SpeedInsights />
        </Web3ContextProvider>
      </body>
    </html>
  );
}
