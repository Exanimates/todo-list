import React from "react";
import { useState } from "react"
import { connect } from "react-redux";
import { TodoAdd, ToggleTodo, setVisibilityFilter } from "../action/index";
import { Todo, Counter } from "../types/todoTypes"

interface AppPropType {
	todos: Todo[];
  counter: Counter;
  currentFilter: string;
  onAddTodo: Function;
  onToggle: Function;
  onFilter: Function;
}

const App: React.FC<AppPropType> = ({ todos, counter, currentFilter, onAddTodo, onToggle, onFilter }) => {

  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.length <= 5) {
      onAddTodo(inputValue);
      setInputValue("");
    }
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
  let validationMessage = "";

  if (inputValue.length > 5) {
    validationMessage = "Ошибка. Длина должна быть меньше или равной 5 символам"
  }

    return (
      <div className="App">
        <input type={"text"} value= { inputValue } onChange={ handleInputChange }></input>
        { validationMessage }
        <button onClick={() => addTodo()}>Добавить задачу</button>
        |
        <button style={{ color: "SHOW_ALL" === currentFilter ? "blue" : "black"}} onClick={() => filter("SHOW_ALL")}>Все</button>
        <button style={{ color: "SHOW_COMPLETED" === currentFilter ? "blue" : "black"}} onClick={() => filter("SHOW_COMPLETED")}>Выполенные { counter.completedCount }</button>
        <button style={{ color: "SHOW_INCOMPLETED" === currentFilter ? "blue" : "black"}} onClick={() => filter("SHOW_INCOMPLETED")}>Не выполненные { counter.incompletedCount }</button>
        <div>
          {
            todos.map((elem: Todo) => { return <p> <span onClick={() => toggle(elem.id)}>{elem.text} {elem.completed ? "Выполено" : "Не выполнено"}</span></p> })
          }
        </div>
      </div>
    );
  }

  const getVisibleTodos = (todos: Todo[] = [], filter: string) => {
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

  const getCounter = (todos: Todo[]) => {
    return {
      allCount: todos.length,
      completedCount: todos.filter(t => t.completed).length,
      incompletedCount: todos.filter(t => !t.completed).length
    }
  }

  const mapStateToProps = (state: any) => {    
    return {
      todos: getVisibleTodos(state.todos, state.filter),
      counter: getCounter(state.todos),
      currentFilter: state.filter
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