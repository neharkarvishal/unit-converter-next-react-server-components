import 'server-only';
import { cache } from 'react';

const fetchData = cache(async () => {
  return {};
});

export default fetchData;
