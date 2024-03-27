import React from 'react';
import Title from 'antd/es/typography/Title';
import ProposalsTable from '@/components/ui/proposals/ProposalsTable';

const App: React.FC = () => {
  return (
    <section>
      <Title level={1}>Propuestas de contrato</Title>
      <ProposalsTable></ProposalsTable>
    </section>
  );
};

export default App;
