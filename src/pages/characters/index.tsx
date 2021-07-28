import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { IPerson } from "../../models/IPerson";

export const fetchPerson = async (): Promise<IPerson> => {
    const res = await fetch("/api/person");
    if (!res.ok) {
        throw new Error("Network Failed!");
    } else {
        return res.json();
    }
};

export default function Actors(): JSX.Element {
    const { isLoading, isError, error, data }: 
    UseQueryResult<IPerson, Error>
    = useQuery<IPerson, Error, IPerson, string>
        ("person", fetchPerson);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <p>Error: {error?.message}</p>

    return (
        <React.Fragment>
            <h1>Actors</h1>
            <p>Actor ID: {data?.id}</p>
            <p>Actor Name: {data?.name}</p>
            <p>Actor Age:  {data?.age}</p>
        </React.Fragment>
    );
};



