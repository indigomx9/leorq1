import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { IPaginated } from "../../models/IPaginated";

export default function PTodoPage(): JSX.Element {
    const [page, setPage] = React.useState(0);
    const fetchTodos = 
    (pageNumber = 0) => fetch(`/api/todo/${pageNumber}`)
    .then((res) => res.json());

    const queryClient = useQueryClient();
    const { isLoading, isFetching, isPreviousData, data } 
    = useQuery<IPaginated, Error>(
        ["todos", page],
        () => fetchTodos(page),
        { keepPreviousData: true }
    );

    React.useEffect(() => {
        if (data?.hasMore) {
            queryClient.prefetchQuery(["todos", page + 1], () => fetchTodos(page + 1));
            queryClient.prefetchQuery(["todos", page + 2], () => fetchTodos(page + 2));
        }
    }, [data, page, queryClient]);

    if (isLoading) {
        return <aside>Loading...</aside>
    };

    return (
        <React.Fragment>
            {data?.todos.map((todo) => (
                <p key={todo.id}>{todo.message}</p>
            ))}
            <span>Current Page: {page + 1}</span>
            <br />
            <button
                type="button"
                onClick={() => setPage((old) => Math.max(old - 1, 0))} 
                disabled={page === 0}
                >Previous Page
            </button>
            <button
                type="button"
                onClick={() => {
                    if (!isPreviousData && data?.hasMore) {
                        setPage((old) => old + 1);
                    }
                }}
                disabled={isPreviousData || !data?.hasMore}
                >Next Page
            </button>
            {isFetching ? <span>Loading...</span> : null}{" "}
        </React.Fragment>
    );
};





