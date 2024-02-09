'use client';
import Button from 'antd/es/button';
import Result from 'antd/es/result';
import { useRouter } from 'next/navigation';

export default function Custom404() {
  const router = useRouter();
  function goHome() {
    router.push('/');
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );
}
