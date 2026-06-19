'use client';

import dynamic from 'next/dynamic';

const Providers = dynamic(() => import('../../Providers'), { ssr: false });

export function ClientOnly() {
  return <Providers />;
}
