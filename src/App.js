import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import uuid from 'uuid';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import axios from 'axios';

import './App.css';
import About from './components/pages/About';

class App extends Component {
  state = {
    todos: [
      // {
      //   id: uuid.v4(),
      //   title: 'Take out the trash',
      //   completed: false
      // },
      // {
      //   id: uuid.v4(),
      //   title: 'Dinner with wife',
      //   completed: false
      // },
      // {
      //   id: uuid.v4(),
      //   title: 'Meeting with boss',
      //   completed: false
      // }
    ]
  };

  componentDidMount() {
    axios
      .get('http://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }));
  }

  // Toggle Complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  // Delete Todo
  delTodo = id => {
    // this.setState({
    //   todos: [...this.state.todos.filter(todo => todo.id !== id)]
    // });
    axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
  };

  // Add Todo
  addTodo = title => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // };
    // this.setState({
    //   todos: [...this.state.todos, newTodo]
    // });
    axios
      .post('http://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
      })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  render() {
    // console.log(this.state.todos);
    return (
      <Router>
        <div className="App">
          <Header />
          <Route
            exact
            path="/"
            render={props => (
              <>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              </>
            )}
          />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
