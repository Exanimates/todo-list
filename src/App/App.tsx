import React from "react";
import { useState } from "react"
import { connect } from "react-redux";
import { TodoAdd, ToggleTodo, setVisibilityFilter } from "../action/index";
import { Todo, Counter } from "../types/todoTypes"
import "../styles/App.css";

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
  const [validationMessage, setValidationMessage] = useState("");

  const addTodo = () => {
    debugger;

    if (inputValue.length === 0) {
      setValidationMessage("Ошибка. Поле обязательно для заполнения"); 
      return 
    };

    if (inputValue.length > 10)  { 
      setValidationMessage("Ошибка. Длина должна быть меньше или равной 10 символам"); 
      return 
    };

    setValidationMessage("");

      onAddTodo(inputValue);
      setInputValue("");
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
      <div className="app">
        <div className="app__input">
          <div className="app__input-field">
            <input placeholder="Введите название задачи" className="text-field__input" type={"text"} value= { inputValue } onChange={ handleInputChange }></input>
            <button className="custom-btn btn-4 add_button" onClick={() => addTodo()}>Добавить задачу</button>
          </div>
          <div className="break"></div>
          <div >
            { <span className="danger">{validationMessage}</span>  }
          </div>
        </div>
        <div className="app__filter">
          <button className={ currentFilter === "SHOW_ALL" ? "glow-button" : "deactive-button" } onClick={() => filter("SHOW_ALL")}>Все</button>
          <button className={ currentFilter === "SHOW_COMPLETED" ? "glow-button" : "deactive-button" } onClick={() => filter("SHOW_COMPLETED")}>Выполенные { counter.completedCount }</button>
          <button className={ currentFilter === "SHOW_INCOMPLETED" ? "glow-button" : "deactive-button" } onClick={() => filter("SHOW_INCOMPLETED")}>Не выполненные { counter.incompletedCount }</button>
        </div>
        <div>
          <ol className="rounded">
            {
              todos.map((elem: Todo) => { 
                return <li key={elem.id}> 
                <a className={  elem.completed ? "rounded-positive" : "rounded-negative" } onClick={() => toggle(elem.id)}>{elem.text}</a>
              </li> }
              )
            }
          </ol>
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