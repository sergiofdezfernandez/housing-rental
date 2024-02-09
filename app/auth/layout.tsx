'use client';
import Image from 'next/image';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Image src={'/main.png'} alt="main image" layout="fill" objectFit="cover" loading="lazy" />
      {children}
    </main>
  );
}
