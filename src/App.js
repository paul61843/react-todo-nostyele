import React, { Component } from 'react';
import './App.css'

class TodoTitle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h3>{this.props.title}</h3>
    )
  }
}

class AddTodoBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    const { addFunc } = this.props;
    const { value } = this.state;

    event.preventDefault();
    addFunc(value);
    this.setState({value: ''});
  }

  render() {
    return (
      <form className="add-block" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <button type="submit" >增加</button>
      </form>
    );
  }
}

class TodoList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { todos } = this.props;
    const { deleteFunc, completedFunc } = this.props;

    return (
      <ul>{todos.map(item => 
        <li key={item.id} style={{textDecoration: (item.isCompleted) ? 'line-through' : 'none'}}>
          {item.text}
          <button onClick={() => { deleteFunc(item.id) }}>刪除</button>
          <button onClick={() => { completedFunc(item.id) }}>完成</button>
        </li>
      )}</ul> 
    )
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: 'TODO',
      todos: [],
    }

    this.id = 0;

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completedTodo = this.completedTodo.bind(this);
  }

  addTodo(todoText) {
    const { todos } = this.state;
    const newTodos = [
      ...todos, 
      { text: todoText, id: this.id, isCompleted: false }
    ]
    this.setState({ todos: newTodos });
    this.id++;
  }

  deleteTodo(id) {
    const { todos } = this.state;
    const newTodos = todos.filter(item => item.id !== id);
    this.setState({ todos: newTodos })
  }

  completedTodo(id) {
    const { todos } = this.state;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = todos;
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    this.setState({ todos: newTodos });
  }

  render() {
    const { title, todos } = this.state;
    const { addTodo, deleteTodo, completedTodo } = this;

    return (
      <div>      
        <TodoTitle title={title}></TodoTitle>  
        <AddTodoBlock todos={todos} addFunc={addTodo}></AddTodoBlock>
        <TodoList todos={todos} 
          deleteFunc={deleteTodo} 
          completedFunc={completedTodo}>
        </TodoList>
      </div>
    );
  }
}

export default App;
