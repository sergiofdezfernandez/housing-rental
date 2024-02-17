'use client';
import React from 'react';
import '@/app/global.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Web3ModalProvider } from '@/components/shared/context/Web3Modal';
import { ContractProvider } from '@/components/shared/context/ContractContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider>
          <ContractProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </ContractProvider>
        </Web3ModalProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
