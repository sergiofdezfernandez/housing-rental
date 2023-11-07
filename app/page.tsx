'use client';
import LoginForm from '@/components/ui/login/LoginForm';
import Image from 'next/image';

export default function Page() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Image src={'/main.png'} alt="Housing rental" fill={true} priority={true} />
      <LoginForm></LoginForm>
    </div>
  );
}
