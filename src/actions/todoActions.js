import TodoDispatcher from '../dispatcher/TodoDispatcher';
import todoConstants from '../constants/todo';

export default {
    create: (text) => {
        TodoDispatcher.dispatch({
            actionType: todoConstants.CREATE,
            text: text
        });
        
        // api save
    },
    
    updateText: (id, text) => {
        TodoDispatcher.dispatch({
            actionType: todoConstants.UPDATE_TEXT,
            id: id,
            text: text
        });
        
        // update
    },

    toggleComplete: (todo) => {
        let id = todo.id;
        let actionType = todo.complete ? todoConstants.UNDO_COMPLETE : todoConstants.COMPLETE;
        
        TodoDispatcher.dispatch({
            actionType: actionType,
            id: id
        });

        // update
    },

    toggleCompleteAll: () => {
        TodoDispatcher.dispatch({
            actionType: todoConstants.TOGGLE_COMPLETE_ALL
        });
        
        // complete all
    },

    destory: (id) => {
        TodoDispatcher.dispatch({
            actionType: todoConstants.DESTROY,
            id: id
        });
        
        // destory
    },

    destoryCompleted: () => {
        TodoDispatcher.dispatch({
            actionType: todoConstants.DESTROY_COMPLETE
        });
        
        // destroy completed
    },

    fetchTodos: () => {
        // fetch
    },
    
    syncTodos: (todos) => {
        // sync
    }
}
