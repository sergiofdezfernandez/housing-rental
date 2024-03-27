import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';

export default function Page() {
  return (
    <Paragraph>
      <Title level={1} style={{ textAlign: 'center' }}>
        Bienvenido
      </Title>
    </Paragraph>
  );
}
