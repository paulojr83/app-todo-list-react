import React, { Component } from 'react';
import ColumnList from './ColumnList'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentWillMount(){
    const toDoLilstItem = window.localStorage.getItem('toDoLilstItem') || '[]';
    this.setState({ items: JSON.parse( toDoLilstItem )});
  }

  updateLocalStorage =(items) =>{
      window.localStorage.setItem('toDoLilstItem', JSON.stringify(items));
  }

  addTask = (e) => {
    e.preventDefault();

    const { target = {}} = e;
    const input = target.querySelector('input') || {};
    const { value =''} = input;

    this.setState( function(prev){
        const { items =[]} = prev;
        const newTask = {
            id: items.length + 1,
            title: value,
            status: 'To Do'
        };
        items.push(newTask);
        this.updateLocalStorage(items);

        return { items };
    })
  };

  updateTask = (target, task)=> {
     this.setState(function (prev) {
        const { items } = prev;
        const s = items.filter(item => item.id !== task.id );

        task.status = target.checked ? "Done" : "To Do";
        s.push(task);

        this.updateLocalStorage(s);
        return { items : s};
     })
  }

  render() {
    const { items = [] } = this.state;
    const columns =[
        { title: 'To Do', items },
        { title: 'Done', items }
    ];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To-do List</h1>
        </header>
        <div className="App-container">
            <div className="app-lists">

                {columns.map( c=>(
                    <ColumnList title={c.title}
                                items={c.items}
                                addTask={this.addTask}
                                updateTask={this.updateTask}
                    />
                ))}

            </div>
        </div>
      </div>
    );
  }
}

export default App;
