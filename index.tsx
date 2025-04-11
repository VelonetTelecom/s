
import dynamic from 'next/dynamic';

const RoletaPontualidade = dynamic(() => import('../RoletaPontualidade'), { ssr: false });

export default function Home() {
  return <RoletaPontualidade />;
}
