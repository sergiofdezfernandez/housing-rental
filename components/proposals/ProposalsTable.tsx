'use client';
import { LeaseAgreement, Property, State } from '@/lib/model/domain_definitions';
import { TableProps } from 'antd/es/table';
import Table from 'antd/es/table/Table';
import { ReactNode, useEffect, useState } from 'react';
import { useContractContext } from '../shared/context/ContractContext';
import notification from 'antd/es/notification';
import Space from 'antd/es/space';
import { Button, Card, Flex, Tag } from 'antd';
import useUserProfile from '@/hooks/useUserProfile';
import { createClient } from '@/lib/supabase/client';

export default function ProposalsTable() {
  const supabase = createClient();
  const { userProfile } = useUserProfile(supabase);
  const columns: TableProps<LeaseAgreement>['columns'] = [
    {
      title: 'Comienzo del contrato',
      dataIndex: 'leaseStart',
      key: 'leaseStart',
      render: (text) => <p>{new Date(Number(text) * 1000).toLocaleDateString()}</p>,
    },
    {
      title: 'Duración (Meses)',
      dataIndex: 'leaseDuration',
      key: 'leaseDuration',
      render: (value) => <p>{Number(value)}</p>,
    },
    {
      title: 'Total pagado',
      dataIndex: 'totalRentPaid',
      key: 'totalRentPaid',
      render: (value) => (
        <p>
          {Number(value)}
          <span>€</span>
        </p>
      ),
    },
    {
      title: 'Depósito inicial / Fianza',
      dataIndex: 'property',
      key: 'property',
      render: (value: Property) => (
        <p>
          {Number(value.securityDeposit)}
          <span>€</span>
        </p>
      ),
    },
    {
      title: 'Estado',
      key: 'state',
      dataIndex: 'state',
      render: (state: number) => <span>{getTagByStatus(state)}</span>,
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => acceptAgreement(record.id)}
            disabled={record.state !== State.Created || record.tenant.email === userProfile?.email}
          >
            Aceptar
          </Button>
        </Space>
      ),
    },
  ];
  const [leaseAgreements, setLeaseAgreements] = useState<Array<LeaseAgreement> | undefined>([]);
  const { contractInstance } = useContractContext() || {};

  const [loading, setLoading] = useState<boolean>();

  const getLeaseAgreements = async () => {
    try {
      if (contractInstance && userProfile) {
        setLoading(true);
        const leaseAgreements: LeaseAgreement[] =
          await contractInstance?.getRegisteredLeaseAgreement();
        setLeaseAgreementsByRole(leaseAgreements);
        setLoading(false);
      }
    } catch (error: any) {
      notification.error({ message: error.reason });
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaseAgreements();
  }, [contractInstance, userProfile]);

  function setLeaseAgreementsByRole(leaseAgreements: Array<LeaseAgreement>) {
    if (userProfile?.roles?.includes('LANDLORD')) {
      setLeaseAgreements(
        leaseAgreements.filter((la) => la.property.landlord.email === userProfile.email)
      );
    } else if (userProfile?.roles?.includes('TENANT')) {
      setLeaseAgreements(leaseAgreements.filter((la) => la.tenant.email === userProfile.email));
    }
  }

  async function acceptAgreement(agreementId: number) {
    try {
      const tx = await contractInstance?.acceptLeaseAgreement(agreementId);
      tx.wait();
      getLeaseAgreements();
    } catch (error: any) {
      notification.error({
        message: error.reason,
      });
    }
  }

  function getTagByStatus(status: number): ReactNode {
    const tag = State[status];
    const stateColorMap = new Map<State, string>();
    stateColorMap.set(State.Created, 'green');
    stateColorMap.set(State.Started, 'yellow');
    stateColorMap.set(State.Terminated, 'red');
    const color = stateColorMap.get(status);
    return (
      <Tag color={color} key={status}>
        {tag.toUpperCase()}
      </Tag>
    );
  }

  return (
    <Table
      columns={columns}
      dataSource={leaseAgreements}
      loading={loading}
      rowKey={'id'}
      pagination={{ position: ['bottomCenter'], pageSize: 5 }}
      expandable={{
        expandedRowRender: (record) => (
          <Flex gap={'middle'} align="center" justify="space-around">
            <Card title={'Inquilino'}>
              <p>{record.tenant.email}</p>
              <p>{record.tenant.name}</p>
              <p>{record.tenant.phoneNumber}</p>
            </Card>
            <Card title={'Propiedad'}>
              <p>{record.property.postalAddress}</p>
              <p>{record.property.description}</p>
              <p>{record.property.price.toString()}€</p>
            </Card>
          </Flex>
        ),
      }}
    />
  );
}
