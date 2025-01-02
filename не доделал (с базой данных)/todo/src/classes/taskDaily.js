import {generateId} from '../scripts/generateId'

export class TaskDaily {
    constructor(taskId) {
        this._id = generateId();
        this._taskId = taskId;
        this._lastCompleted = [];
    }

    get id() {
        return this._id;
    }
    get taskId(){
        return this._taskId;
    }
    get lastCompleted(){
        return this._lastCompleted;
    }

    set id (id) {
        this._id = id
    }
    set taskId(taskId){
        this._taskId = taskId;
    }
    set lastCompleted(lastCompleted){
        this._lastCompleted = lastCompleted.push(lastCompleted);
    }

    update(fields) {
        Object.keys(fields).forEach((key) => {
            if (this.hasOwnProperty(`_${key}`)) {
                if (key === "lastCompleted") {
                    this._lastCompleted.push(fields[key]);
                } else {
                    this[`_${key}`] = fields[key];
                }
            }
        });
    }

}

