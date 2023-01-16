import Todo from "../types/todoTypes"

const initialState: Todo[] = [];

const todos = (state = initialState, action: { type: string, id: number, text: string }) => {
	switch (action.type) {
		case "ADD":
			return [
            ...state, 
            {
              id: action.id,
              text: action.text,
              completed: false
            }];
		case "TOGGLE":
			return state.map(todo =>
                todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
              )
		default:
			return [...state];
	}
}

export default todos;
