
import {generateId} from '../scripts/generateId'
import {generateRandomColor} from "../scripts/generateRandomColor";


export class Task {
    constructor(id, title, description = null, type, taskStatus, color = generateRandomColor()) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._type = type;
        this._taskStatus = taskStatus;
        this._created_at = Date.now();
        this._updated_at = Date.now();
        this._color = color;
    }


    get id(){
        return this._id;
    }
    get title(){
        return this._title;
    }
    get description(){
        return this._description;
    }
    get type(){
        return this._type;
    }
    get taskStatus(){
        return this._taskStatus;
    }
    get created_at(){
        return this._created_at;
    }
    get updated_at(){
        return this._updated_at;
    }
    get color(){
        return this._color;
    }

    set id (id) {
        this._id = id
    }
    set title(title){
        this._title = title;
    }
    set description(description){
        this._description = description;
    }
    set type(type){
        this._type = type;
    }
    set taskStatus(taskStatus){
        this._taskStatus = taskStatus;
    }
    set created_at(created_at){
        this._created_at = created_at;
    }
    set updated_at(updated_at){
        this._updated_at = updated_at;
    }
    set color(color){
        this._color = color;
    }
}