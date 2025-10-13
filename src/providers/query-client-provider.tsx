"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: true,
      //  refetchOnReconnect: true,
      //  retry: 0,
    },
  },
});

/// This is only used onced in the app tree wrapping root layout chilren.
/// React Query requires for useMutation and useQuery to work - client side only.

export function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
