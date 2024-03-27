'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumb } from 'antd';

interface BreadCrumbItem {
  key: number;
  title: string;
}
export default function CustomBreadCrumb() {
  const currentPath = usePathname();
  const [items, setItems] = useState<Array<BreadCrumbItem>>([]);

  useEffect(() => {
    const pathNames = currentPath
      .split('/')
      .filter((path) => path)
      .map((pathName, index) => {
        return {
          key: index,
          title: pathName,
        };
      });
    if (pathNames.length > 1) setItems(pathNames);
    else setItems([]);
  }, [currentPath]);

  return <Breadcrumb separator="/" items={items} style={{ marginBottom: '1em' }}></Breadcrumb>;
}
