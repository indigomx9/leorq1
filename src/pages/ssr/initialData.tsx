import React from "react";
import { GetServerSideProps } from "next";
import { UseQueryResult, useQuery } from "react-query";
import { fetchPerson } from "../characters/index";
import { IDProps, IPerson } from "../../models/IPerson";

export default function 
InitialData({ person }: IDProps): JSX.Element {
    const { error, isError, isLoading, data }: 
    UseQueryResult<IPerson, Error> = 
    useQuery<IPerson, Error>(
        "person", 
        fetchPerson, 
        { initialData: person }
    );

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

const URL = "http://localhost:8080/api/person";
export const getServerSideProps: GetServerSideProps =
async (): Promise<{props: { person: IPerson }}> => {
    const person = await fetch(URL)
    .then((res) => res.json());
    return {
        props: {
            person
        }
    };
};





