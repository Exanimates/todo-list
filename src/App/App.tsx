import React from "react";
import { useState } from "react"
import { connect } from "react-redux";
import { TodoAdd, ToggleTodo } from "../action/index";
import Todo from "../types/todoTypes"

interface AppPropType {
	todos: Todo[];
  onAddTodo: Function;
  onToggle: Function;
}

const App: React.FC<AppPropType> = ({ todos, onAddTodo, onToggle }) => {

  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
		onAddTodo(inputValue);
	};

  const toggle = (id: number) => {
    onToggle(id);
  }

  // const notCompleted = (todo: string) => {
  //   onNoteCompleted(todo)
  // };

  // const completed = (todo: string) => {
  //   onCompleted(todo);
  // }

  function handleInputChange(event: any) {
    setInputValue(event.target.value);
  };


    return (
      <div className="App">
        {
          todos.map((elem: Todo) => { return <span onClick={() => toggle(elem.id)}>{elem.text} {elem.completed ? "Completed" : "Not completed"}</span> })
        }
        <input type={"text"} onChange={ handleInputChange }></input>
        <button onClick={() => addTodo()}>Добавить задачу</button>
      </div>
    );
  }

  const mapStateToProps = (state: any) => {    
    return {
      todos: state.todos
    };
  };

  const mapDispatchToProps = (dispatch: any) => {
    return {
      onAddTodo: (text: string) => {
        dispatch(TodoAdd(text));
      },
      onToggle: (todoId: number) => {
        dispatch(ToggleTodo(todoId));
      }
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);