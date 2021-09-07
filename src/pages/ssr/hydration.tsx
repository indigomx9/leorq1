import React from "react";
import { GetServerSideProps } from "next";
import { UseQueryResult, useQuery, QueryClient } from "react-query";
import { fetchPerson } from "../characters/index";
import { IPerson } from "../../models/IPerson";
import { dehydrate, DehydratedState } from "react-query/hydration";

export default function Hydration(): JSX.Element {
    const { error, isError, isLoading, data }: 
    UseQueryResult<IPerson, Error> = 
    useQuery<IPerson, Error>("person", fetchPerson);

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h3>Error is: {error?.message}</h3>;

    return (
        <React.Fragment>
            <h1>Person</h1>
            <p>{data?.id}</p>
            <p>{data?.name}</p>
            <p>{data?.age}</p>
        </React.Fragment>
    );
};

export const getServerSideProps: GetServerSideProps =
async (): Promise<{props: { dehydratedState: DehydratedState }}> => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("person", fetchPerson);
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};





