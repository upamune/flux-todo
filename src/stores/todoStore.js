import { EventEmitter } from 'events';
import TodoDispatcher from '../dispatcher/TodoDispatcher';
import todoConstants from '../constants/todo';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _todos = {};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function create(text) {
    const id = guid()
    _todos[id] = {
        'id' : id,
        complete : false,
        text: text
    };
}

function update(id, updates) {
    _todos[id] = assign({}. _todos[id], updates);
}

function updateAll(updates) {
    for (let id in _todos) {
        update(id, updates);
    }
}

function destory(id) {
    delete _todos[id];
}

function destoryCompleted() {
    for(let id in _todos) {
        if (_todos.complete) {
            destory(id)
        }
    }
}

class TodoStore extends EventEmitter {
    constructor() {
        super();

        TodoDispatcher.register(this.handler.bind(this));
    }
    
    areAllComplete() {
        for (let id in _todos) {
            if (!_todos[id].complete) {
                return false;
            }
        }
        return true;
    }
    
    getAll() {
        return _todos;
    }
    
    emitChange() {
        this.emit(CHANGE_EVENT);
    }
    
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }
    
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
    
    handler(action) {
        let text;
        
        switch (action.actionType) {
            case todoConstants.CREATE:
                text = action.text.trim();
                if (text != '') {
                    create(text);
                    this.emitChange();
                }
                break;
            case todoConstants.UPDATE_TEXT:
                text = action.text.trim();
                if (text != '') {
                    update(action.id, {text : text});
                    this.emitChange();
                }
                break;
            case todoConstants.COMPLETE:
                update(action.id, { complete : true});
                this.emitChange();
                break;
            case todoConstants.UNDO_COMPLETE:
                update(action.id, {complete:false});
                this.emitChange();
                break;
            case todoConstants.TOGGLE_COMPLETE_ALL:
                if (this.areAllComplete()) {
                    updateAll({ complete : false });
                } else {
                    updateAll({ complete : true });
                }
                break;
            case todoConstants.DESTROY:
                destory(action.id);
                this.emitChange();
                break;
            case todoConstants.DESTROY_COMPLETE:
                destoryCompleted();
                this.emitChange();
                break;
            case todoConstants.FETCH_TODOS:
            case todoConstants.SYNC_TODOS:
                _todos = action.todos;
                this.emitChange();
                break;
            default:
        }
        
    }
}

const todoStore = new TodoStore();

export default todoStore;
