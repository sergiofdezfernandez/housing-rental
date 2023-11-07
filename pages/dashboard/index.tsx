import { Button, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import '@/styles/dashboard.module.css';

export default function Dashboard() {
  return (
    <article>
      <Title level={1}>Hosing Rental System (based on blockchain)</Title>
      <Row>
        <Col>
          <Button type="primary" block>
            Iniciar sesión
          </Button>
        </Col>
        <Col>
          <Button block>Registrarse</Button>
        </Col>
      </Row>
    </article>
  );
}
