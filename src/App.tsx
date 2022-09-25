import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import OfflineBadge from '~common/OfflineBadge';

import { PicturesList } from './PicturesList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PicturesList />
      <OfflineBadge />
    </QueryClientProvider>
  );
}

export default App;
