import {generateId} from '../scripts/generateId'

export class TaskDeadlines {
    constructor(taskId, deadline) {
        this._id = generateId();
        this._taskId = taskId;
        this._deadline = deadline;
    }

    get id() {
        return this._id;
    }
    get taskId(){
        return this._taskId;
    }
    get deadline(){
        return this._deadline;
    }

    set id (id) {
        this._id = id
    }
    set taskId(taskId){
        this._taskId = taskId;
    }
    set deadline(deadline){
        this._deadline = deadline;
    }
}