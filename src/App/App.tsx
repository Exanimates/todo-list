import React from "react";
import { useState } from "react"
import { connect } from "react-redux";
import { TodoAdd, ToggleTodo, setVisibilityFilter } from "../action/index";
import Todo from "../types/todoTypes"

interface AppPropType {
	todos: Todo[];
  onAddTodo: Function;
  onToggle: Function;
  onFilter: Function;
}

const App: React.FC<AppPropType> = ({ todos, onAddTodo, onToggle, onFilter }) => {

  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
		onAddTodo(inputValue);
	};

  const toggle = (id: number) => {
    onToggle(id);
  }

  const filter = (selection: string) => {
    onFilter(selection);
  }

  function handleInputChange(event: any) {
    setInputValue(event.target.value);
  };


    return (
      <div className="App">
        <input type={"text"} onChange={ handleInputChange }></input>
        <button onClick={() => addTodo()}>Добавить задачу</button>
        |
        <button onClick={() => filter("SHOW_ALL")}>Все</button>
        <button onClick={() => filter("SHOW_COMPLETED")}>Выполенные</button>
        <button onClick={() => filter("SHOW_INCOMPLETED")}>Не выполненные</button>
        <div>
          {
            todos.map((elem: Todo) => { return <p> <span onClick={() => toggle(elem.id)}>{elem.text} {elem.completed ? "Выполено" : "Не выполнено"}</span></p> })
          }
        </div>
      </div>
    );
  }

  const getVisibleTodos = (todos: Todo[] = [], filter: string) => {
    debugger;
    switch (filter) {
      case "SHOW_ALL":
        return todos
      case "SHOW_COMPLETED":
        return todos.filter(t => t.completed)
      case "SHOW_INCOMPLETED":
        return todos.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + filter)
    }
  }

  const mapStateToProps = (state: any) => {    
    return {
      todos: getVisibleTodos(state.todos, state.filter)
    };
  };

  const mapDispatchToProps = (dispatch: any) => {
    return {
      onAddTodo: (text: string) => {
        dispatch(TodoAdd(text));
      },
      onToggle: (todoId: number) => {
        dispatch(ToggleTodo(todoId));
      },
      onFilter: (filter: string) => {
        dispatch(setVisibilityFilter(filter))
      }
    }
  };


  export default connect(mapStateToProps, mapDispatchToProps)(App);