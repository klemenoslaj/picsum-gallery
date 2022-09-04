import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PicturesList } from './PicturesList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PicturesList />
    </QueryClientProvider>
  );
}

export default App;
