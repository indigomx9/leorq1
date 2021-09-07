export interface IPerson {
    id: string,
    name: string,
    age: number,
};

export interface IDProps {
    person: IPerson,
};

export interface ICParams {
    id: string,
    name: string,
    age: number,
};

export interface IContext {
    previousPerson: IPerson | undefined;
};


