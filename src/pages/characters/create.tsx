import React from "react";
import { useMutation, UseMutationResult, useQuery, 
    useQueryClient, UseQueryResult } from "react-query";
import { fetchPerson } from ".";
import { IPerson, ICParams, IContext } from "../../models/IPerson";

const createPerson = 
async (id: string, name: string, age: number): Promise<IPerson> => {
    const res = await fetch("/api/person/create", {
        method: "POST",
        body: JSON.stringify({
            id,
            name,
            age,
        }),
    });
    if (!res.ok) {
        throw new Error("Error create");
    }
    return res.json();
};

export default function CreatePage(): JSX.Element {
    const [enabled, setEnabled] = React.useState(false);
    const { data: queryData }: UseQueryResult<IPerson, Error> = 
    useQuery<IPerson, Error>("person", fetchPerson, {
        enabled
    });

    const queryClient = useQueryClient();
    
    const mutation: UseMutationResult<IPerson, Error, ICParams> =
    useMutation<IPerson, Error, ICParams, IContext | undefined>(
    "createPerson", async ({id, name, age}) => createPerson(id, name, age), {
            onMutate: async (_variables: ICParams) => {
                await queryClient.cancelQueries("person");
                const previousPerson: IPerson | undefined = 
                    queryClient.getQueryData("person");
                const newPerson: IPerson = {
                    id: "123",
                    age: 200,
                    name: "Lebron James",
                };
                queryClient.setQueryData("person", newPerson);
                return { previousPerson }
            },
            onSuccess: (
                data: IPerson, 
                _variables: ICParams, 
                _context: IContext | undefined
            ) => {
                queryClient.setQueryData("person", data);
                return console.log("mutation data", data);
            },
            onError: (
                error: Error,
                _variables: ICParams,
                context: IContext | undefined
            ) => {
                console.log("error", error.message);
                return console.log(`rolling back: ${context?.previousPerson?.id}`);
            },
            onSettled: (
                _data: IPerson | undefined,
                _error: Error | null,
                _variables: ICParams | undefined,
                _context: IContext | undefined
            ) => {
                return console.log("complete mutation!");
            },
        }
    );

    const handleSubmit: React.FormEventHandler = 
    async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            name: { value: string };
            age: { value: number };
        };
        const id = "1";
        const name = target.name.value;
        const age = target.age.value;
        mutation.mutate({ id, name, age });
    };

    return (
        <React.Fragment>
            {mutation.isLoading ? (
                <p>Adding todo</p>
            ) : (
                <React.Fragment>
                    {mutation.isError ? <aside>An error: 
                        {mutation?.error?.message}
                        </aside> : null}
                    {mutation.isSuccess ? (
                        <aside>
                            Actor's name is {mutation?.data?.name} 
                            and he/she is {mutation?.data?.age}
                        </aside>
                    ) : null}{" "}
                </React.Fragment>
            )}

            <button
                type="button"
                onClick={() => {
                    setEnabled(false);
                    queryClient.invalidateQueries("person");
                }}>Invalidate Cache
            </button>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <br />
                <input type="text" id="name" name="name" />
                <br />
                <label htmlFor="age">Age:</label>
                <br />
                <input type="number" id="age" name="age" />
                <br />
                <br />
                <input type="submit" value="Submit" />
            </form>

            {queryData && (
                <section>
                    <h1>Person is</h1>
                    <p>Name: {queryData?.name}</p>
                    <p>Age: {queryData?.age}</p>
                </section>
            )}
        </React.Fragment>
    );
};




