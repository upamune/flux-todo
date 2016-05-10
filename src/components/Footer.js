import React from 'react';
import todoActions from '../actions/todoActions';

const PT = React.PropTypes;

export default class Footer extends React.Component {
    static propTypes = {
        allTodos: PT.object.isRequired
    };
    
    render() {
        const total = this._getTotal();
        
        if (!total) {
            return null;
        }
        
        const completedNum = this._getCompletedNum();
        const itemsLeft = total - completedNum;
        let itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
        itemsLeftPhrase += 'left';
        
        
        const clearCompleteButton = this._createClearCompleteButton(completedNum);
        
        return (
            <footer id="footer">
                <span id="todo-count">
                    <strong>
                        {itemsLeft}
                    </strong>
                    {itemsLeftPhrase}
                </span>
                {clearCompleteButton}
            </footer>
        );
    }

    _getTotal() {
        return Object.keys(this.props.allTodos).length;
    }
    
    _getCompletedNum() {
        let completed = 0;
        const allTodos = this.props.allTodos;
        
        for (let key in allTodos) {
            if (allTodos[key].complete) {
                completed++;
            }
        }
        
        return completed;
    }
    
    _createClearCompleteButton(completed) {
        if (!completed) {
            return null;
        }
        
        return (
            <button 
                id="clear-completed"
                onClick={this.handleClick}
            >
                Clear completed ({completed})
            </button>
        );
    }
    
    handleClick() {
        todoActions.destoryCompleted();
    }
    
}

