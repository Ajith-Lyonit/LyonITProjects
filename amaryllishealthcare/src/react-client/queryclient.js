import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,        // delete cache immediately
      staleTime: 0,        // always refetch
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});

export default queryClient;
