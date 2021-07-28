import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { fetchPerson } from "../pages/characters/index";
import { IPerson } from "../models/IPerson";

export const Actor = (): JSX.Element => {
    const { data }: UseQueryResult<IPerson, Error> =
    useQuery<IPerson, Error>("person", fetchPerson);

    return (
        <React.Fragment>
            <p>{data?.id}</p>
            <p>{data?.name}</p>
            <p>{data?.age}</p>
        </React.Fragment>
    );
};





