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

export const setVisibilityFilter = (filter: string) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})