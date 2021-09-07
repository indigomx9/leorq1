import React from "react";
import { IInfinite } from "../../models/IInfinate";
import { QueryFunctionContext, useInfiniteQuery } from "react-query";

const fetchTodos = ({ pageParam = 0 }: QueryFunctionContext) => 
    fetch(`/api/todo/infinite/${pageParam}`)
    .then((res) => res.json());

export default function PaginatedTodo(): JSX.Element {
    const { hasNextPage, fetchNextPage, isFetchingNextPage, data } = 
    useInfiniteQuery<IInfinite, Error>(
        "infinite",
        fetchTodos,
        { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

    return (
        <main>
            {data?.pages.map((infinitePage, i) => (
                <React.Fragment key={i}>
                    {infinitePage.page.todos.map((todo) => (
                        <p key={todo.id}>{todo.message}</p>
                    ))}
                </React.Fragment>
            ))}

            <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage ? "Loading more..." : 
                hasNextPage ? "Load More" : 
                "noting more to load"}
            </button>
        </main>
    );
};


