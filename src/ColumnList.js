import React from 'react'
import './ColumsList.css';
import If from './If.js';

const ColumnList = ({title, items =[], addTask, updateTask}) =>{
    const currentItems = items.filter( item => item.status === title);

    return (
        <div className="column-list">
            <h3>{title}</h3>

            <If test={title === 'To Do'}>
                <form onSubmit={addTask}>
                    <input type="text" placeholder="Criar uma nova tarefa"/>
                    <button type="submit">Criar</button>
                </form>
            </If>
            <ul className="list-items">
                { currentItems.map(item => (
                    <li key={item.id}>
                        <input
                            type="checkbox"
                            onChange={(e) => updateTask(e.target, item)}
                            checked={title === 'Done'} />
                        <span>{item.title }</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ColumnList;