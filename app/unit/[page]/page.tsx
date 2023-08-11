import fetchData from 'lib/fetch-data';
import UnitForm from '../../../components/unit-form';

export const dynamicParams = true;

export async function generateStaticParams() {
  return [1];
}

export default async function RSCPage({ params }) {
  const payload = await fetchData();

  return (
    <>
      <UnitForm payload={payload} />
    </>
  );
}
