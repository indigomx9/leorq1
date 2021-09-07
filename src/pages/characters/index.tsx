import React from "react";
import Link from "next/link";
import { useQueries, useQuery, useQueryClient, 
    UseQueryResult } from "react-query";
import { IPerson } from "../../models/IPerson";
import { ITodo } from "../../models/ITodo";

const URL = "http://localhost:8080";
export const fetchPerson = async (): Promise<IPerson> => {
    const res = await fetch(`${URL}/api/person`);
    if (!res.ok) {
        throw new Error("Network Failed!");
    } else {
        return res.json();
    };
};

export const fetchTodo = async (): Promise<ITodo> => {
    const res = await fetch(`/api/todo`);
    if (!res.ok) {
        throw new Error("Network Failed!");
    } else {
        return res.json();
    };
};

export default function Actors(): JSX.Element {
    const [enabled, setEnabled] = React.useState(true);
    const { isLoading, isError, isSuccess: personSuccess, error, data }: 
    UseQueryResult<IPerson, Error>
    = useQuery<IPerson, Error>("person", fetchPerson, { enabled });

    const { isSuccess: todoSuccess }: UseQueryResult<ITodo, Error> 
    = useQuery<ITodo, Error>("todo", fetchTodo, { enabled });
    
    // dynamic parallel queries
    const userQueries = useQueries(
        ["1", "2", "3"].map((id) => {
            return {
                queryKey: ["todo", { page: id }],
                queryFn: () => {
                    return id;
                },
                enabled,
            }
        })
    );

    const queryClient = useQueryClient();

    if (personSuccess && todoSuccess && enabled) {
        setEnabled(false);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <p>Error: {error?.message}</p>

    return (
        <React.Fragment>
            <Link href="/">
                <a>Home</a>
            </Link>
            <br />
            <button 
                type="button" 
                onClick={(event) => {
                    event.preventDefault();
                    queryClient.invalidateQueries();
            }}>
                Invalidate Queries
            </button>
            <br />
            <button 
                type="button" 
                onClick={(event) => {
                    event.preventDefault();
                    queryClient.invalidateQueries("person");
            }}>
                Invalidate Person
            </button>
            <br />
            <button 
                type="button" 
                onClick={(event) => {
                    event.preventDefault();
                    // queryClient.invalidateQueries({
                    //     predicate: (query) => {
                    //         return parseInt(query.queryKey[1].page) % 2 === 1;
                    //     },
                    // });
            }}>
                Invalidate Todo
            </button>
            <br />
            <p>Actor ID: {data?.id}</p>
            <p>Actor Name: {data?.name}</p>
            <p>Actor Age:  {data?.age}</p>
        </React.Fragment>
    );
};



