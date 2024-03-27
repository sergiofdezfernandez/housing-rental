import ProposalView from '@/components/ui/proposals/ProposalView';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return <ProposalView id={id}></ProposalView>;
}
