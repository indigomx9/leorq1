import { ITodo } from "./ITodo";

export interface IInfinite {
    nextCursor: number | undefined,
    page: {
        todos: ITodo[],
        hasMore: boolean,
    }
};





