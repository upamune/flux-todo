import React from 'react';
import cx from 'classnames';
import todoActions from '../actions/todoActions';
import TodoTextInput from './TodoTextInput';

const PT = React.PropTypes;

export default class TodoItem extends React.Component {

    static protoTypes = {
        todo : PT.object.isRequired
    };

    state = { isEditing : false };

    render() {
        const todo = this.props.todo;
        let input;

        if (this.state.isEditing) {
            input = <TodoTextInput
                className="edit"
                onSave={this.handleSave.bind(this)}
                value={todo.text}
            />
        }

        return (
            <li
                className={this._getListClassName(todo)}
                key={todo.id}
            >
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.complete}
                        onChange={this.handleChangeCheckbox.bind(this)}
                    />
                    <label onDoubleClick={this.handleDoubleClick.bind(this)} >
                        {todo.text}
                    </label>
                    <button
                        className="destroy"
                        onClick={this.handleDestroyClick.bind(this)}
                    />
                </div>
                {input}
            </li>
        );
    }
    
    _getListClassName(todo) {
        return cx({
            'completed' : todo.complete,
            'editing' : this.state.isEditing
        });
    }
    
    handleChangeCheckbox() {
        todoActions.toggleComplete(this.props.todo);
    }
    
    handleDoubleClick() {
        this.setState({ isEditing: true});
    }
    
    handleSave(text) {
        todoActions.updateText(this.props.todo.id, text);
        this.setState({ isEditing: false});
    }
    
    handleDestroyClick() {
        todoActions.destory(this.props.todo.id);
    }
}                

