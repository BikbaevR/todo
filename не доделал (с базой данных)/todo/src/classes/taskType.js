import {generateId} from '../scripts/generateId'

export class TaskType {
    constructor(typeName) {
        this._id = generateId();
        this._typeName = typeName;
    }

    get id() {
        return this._id;
    }
    get typeName(){
        return this._typeName;
    }

    set id (id) {
        this._id = id
    }
    set typeName(value){
        this._typeName = value;
    }
}

export const taskTypes = [
    new TaskType('С датой окончания'),
    new TaskType('Повторяющиеся'),
    new TaskType('Ежедневные'),
    new TaskType('Целевые'),
]