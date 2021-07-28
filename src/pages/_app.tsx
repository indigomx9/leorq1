import React from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

const QClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 1000,
        },
    },
});

export default function
App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={QClient}>
            <React.StrictMode>
                <ReactQueryDevtools initialIsOpen={false} />
                <Component {...pageProps} />
            </React.StrictMode>
        </QueryClientProvider>
    );
};






