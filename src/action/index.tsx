let nextTodoId = 0

export const TodoAdd = (text: string) => {
    return {
        type: "ADD",
        id: nextTodoId++,
        text
    }
}

export const ToggleTodo = (id: number) => {
    return {
        type: "TOGGLE",
        id
    }
}