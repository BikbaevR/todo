import {generateId} from '../scripts/generateId'

export class TaskRepetitions {
    constructor(taskId, targetCount, completedCount) {
        this._id = generateId();
        this._taskId = taskId;
        this._targetCount = targetCount;
        this._completedCount = completedCount;
    }

    get id(){
        return this._id;
    }
    get taskId(){
        return this._taskId;
    }
    get targetCount(){
        return this._targetCount;
    }
    get completedCount(){
        return this._completedCount;
    }

    set id (id) {
        this._id = id
    }
    set taskId(taskId){
        this._taskId = taskId;
    }
    set targetCount(targetCount){
        this._targetCount = targetCount;
    }
    set completedCount(targetCount){
        this._completedCount = targetCount;
    }
}