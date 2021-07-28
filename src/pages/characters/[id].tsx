import React from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "react-query";
import { IPerson } from "../../models/IPerson";

const getPersonById = 
async (id: string | string[] | undefined): Promise<IPerson> => {
    if (typeof id === "string") {
        const res = await fetch(`/api/person/${id}`);
        if (res.ok) return res.json();
    };
    throw new Error("invalid id");
};

export default function PersonPage(): JSX.Element {
    const {query: {id}} = useRouter();
    const { isLoading, isError, error, data } = 
    useQuery<IPerson, Error>
    (["person", id], () => getPersonById(id), {
        enabled: !!id, // 
    });

    if (isLoading) return <aside>Loading...</aside>;
    if (isError) return <aside>{error?.message}</aside>;

    return (
        <React.Fragment>
            <Link href="/"><a>Home</a></Link>
            <p>{data?.id}</p>
            <p>{data?.name}</p>
            <p>{data?.age}</p>
        </React.Fragment>
    );
};





