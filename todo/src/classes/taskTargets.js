import {generateId} from '../scripts/generateId'

export class TaskTargets {
    constructor(taskId, targetValue, currentValue) {
        this._id = generateId();
        this._taskId = taskId;
        this._targetValue = targetValue;
        this._currentValue = currentValue;
    }

    get id(){
        return this._id;
    }
    get taskId(){
        return this._taskId;
    }
    get targetValue(){
        return this._targetValue;
    }
    get currentValue(){
        return this._currentValue;
    }

    set id (id) {
        this._id = id
    }
    set taskId(taskId){
        this._taskId = taskId;
    }
    set targetValue(targetValue){
        this._targetValue = targetValue;
    }
    set currentValue(targetValue){
        this._currentValue = targetValue;
    }
}