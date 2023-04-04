import Todo from "@/models/todo";

const apiHost = process.env.NEXT_PUBLIC_API_HOST; 

export function getTodos (): Promise<Todo[]> {
    return fetch(`${apiHost}/todos`)
        .then(x => x.json()) as Promise<Todo[]>
}

export function completeTodo (id: number, isCompleted: boolean): Promise<void> {
    return fetch(`${apiHost}/checktodos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id, isCompleted: isCompleted})
    })
    .then();
}

export function clearCompleted (): Promise<void> {
    return fetch(`${apiHost}/removecompletedtodos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then();
}

export function addTodos (content: string,id?: number): Promise<void> {
    return fetch(`${apiHost}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id, content:content})
    })
    .then();
}