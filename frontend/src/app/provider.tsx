'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { toast } from 'react-toastify';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TError } from '~/types/generic.types';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError(_err, _key, _config) {
              const msg = parseErrorMessage(_err as unknown as TError);
              if (Array.isArray(msg)) {
                return msg.map((item) => toast(item));
              }

              return toast(msg);
            },
          },
          queries: {
            refetchOnWindowFocus: false,
            retry: 3,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
