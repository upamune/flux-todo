import React from 'react';
import todoActions from '../actions/todoActions';
import TodoTextInput from './TodoTextInput';

export default class Header extends React.Component {

    render() {
        return (
            <header id="header">
                <h1>todos</h1>
                <TodoTextInput
                    id="new-todo"
                    placeholder="what needs to be done?"
                    onSave={this.handleSave}
                />
            </header>
        );
    }

    handleSave(text) {
        if (text.trim()) {
            todoActions.create(text);
        }
    }
}