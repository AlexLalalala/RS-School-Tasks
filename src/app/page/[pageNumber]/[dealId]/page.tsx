import DealPanel from '@/components/DealPanel';
import DealsList from '@/components/DealsList';

export default async function DealPage() {
  return <DealsList panel={<DealPanel />} />;
}
