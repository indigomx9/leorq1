import React from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { Hydrate } from "react-query/hydration";

export default function
App({ Component, pageProps }: AppProps) {
    const [QClient] = React.useState(
        () => 
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 20 * 1000,
                    },
                },
            })
    );

    return (
        <React.StrictMode>
            <QueryClientProvider client={QClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Component {...pageProps} />
                </Hydrate>
            </QueryClientProvider>
        </React.StrictMode>
    );
};






