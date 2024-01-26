'use client';

import { useWeb3Context, IWeb3Context } from '@/components/web3/Web3Context';
import Button from 'antd/es/button';

export default function Page() {
  const {
    connectWallet,
    state: { isAuthenticated },
  } = useWeb3Context() as IWeb3Context;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!isAuthenticated && (
        <Button type="primary" onClick={connectWallet}>
          Connect wallet
        </Button>
      )}
    </div>
  );
}
