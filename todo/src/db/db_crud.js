const db = require('better-sqlite3')('database.db');
const { promisify } = require('util');


// ==================== TODO CRUD ====================
export const createTodo = (title, description, type, taskStatus = 0, color = null) => {
    const sql = `
        INSERT INTO todo (title, description, type, task_status, color)
        VALUES (?, ?, ?, ?, ?)
    `;
    const result = db.prepare(sql).run(title, description, type, taskStatus, color);
    return result.lastInsertRowid;
};

export const getTodo = (id) => {
    const sql = `SELECT * FROM todo WHERE id = ?`;
    return db.prepare(sql).get(id);
};

export const getAllTodos = () => {
    const sql = `SELECT * FROM todo`;
    return db.prepare(sql).all();
};

export const updateTodo = (id, updates) => {
    const sql = `
        UPDATE todo
        SET title = COALESCE(?, title),
            description = COALESCE(?, description),
            type = COALESCE(?, type),
            task_status = COALESCE(?, task_status),
            updated_at = CURRENT_TIMESTAMP,
            color = COALESCE(?, color)
        WHERE id = ?
    `;
    db.prepare(sql).run(
        updates.title,
        updates.description,
        updates.type,
        updates.task_status,
        updates.color,
        id
    );
};

export const deleteTodo = (id) => {
    const sql = `DELETE FROM todo WHERE id = ?`;
    db.prepare(sql).run(id);
};

// ==================== TASK DAILY CRUD ====================
export const createTaskDaily = (taskId, lastCompleted = null) => {
    const sql = `
        INSERT INTO taskDaily (task_id, last_completed)
        VALUES (?, ?)
    `;
    const result = db.prepare(sql).run(taskId, lastCompleted);
    return result.lastInsertRowid;
};

export const getTaskDaily = (id) => {
    const sql = `SELECT * FROM taskDaily WHERE id = ?`;
    return db.prepare(sql).get(id);
};

export const updateTaskDaily = (id, lastCompleted) => {
    const sql = `
        UPDATE taskDaily
        SET last_completed = COALESCE(?, last_completed)
        WHERE id = ?
    `;
    db.prepare(sql).run(lastCompleted, id);
};

export const deleteTaskDaily = (id) => {
    const sql = `DELETE FROM taskDaily WHERE id = ?`;
    db.prepare(sql).run(id);
};

// ==================== TASK DEADLINES CRUD ====================
export const createTaskDeadline = (taskId, deadline) => {
    const sql = `
        INSERT INTO taskDeadlines (task_id, deadline)
        VALUES (?, ?)
    `;
    const result = db.prepare(sql).run(taskId, deadline);
    return result.lastInsertRowid;
};

export const getTaskDeadline = (id) => {
    const sql = `SELECT * FROM taskDeadlines WHERE id = ?`;
    return db.prepare(sql).get(id);
};

export const updateTaskDeadline = (id, deadline) => {
    const sql = `
        UPDATE taskDeadlines
        SET deadline = COALESCE(?, deadline)
        WHERE id = ?
    `;
    db.prepare(sql).run(deadline, id);
};

export const deleteTaskDeadline = (id) => {
    const sql = `DELETE FROM taskDeadlines WHERE id = ?`;
    db.prepare(sql).run(id);
};

// ==================== TASK REPETITIONS CRUD ====================
export const createTaskRepetition = (taskId, targetCount, completedCount = 0) => {
    const sql = `
        INSERT INTO taskRepetitions (task_id, target_count, completed_count)
        VALUES (?, ?, ?)
    `;
    const result = db.prepare(sql).run(taskId, targetCount, completedCount);
    return result.lastInsertRowid;
};

export const getTaskRepetition = (id) => {
    const sql = `SELECT * FROM taskRepetitions WHERE id = ?`;
    return db.prepare(sql).get(id);
};

export const updateTaskRepetition = (id, updates) => {
    const sql = `
        UPDATE taskRepetitions
        SET target_count = COALESCE(?, target_count),
            completed_count = COALESCE(?, completed_count)
        WHERE id = ?
    `;
    db.prepare(sql).run(updates.targetCount, updates.completedCount, id);
};

export const deleteTaskRepetition = (id) => {
    const sql = `DELETE FROM taskRepetitions WHERE id = ?`;
    db.prepare(sql).run(id);
};

// ==================== TASK TARGETS CRUD ====================
export const createTaskTarget = (taskId, targetValues, currentValues = 0) => {
    const sql = `
        INSERT INTO taskTargets (task_id, target_values, current_values)
        VALUES (?, ?, ?)
    `;
    const result = db.prepare(sql).run(taskId, targetValues, currentValues);
    return result.lastInsertRowid;
};

export const getTaskTarget = (id) => {
    const sql = `SELECT * FROM taskTargets WHERE id = ?`;
    return db.prepare(sql).get(id);
};

export const updateTaskTarget = (id, updates) => {
    const sql = `
        UPDATE taskTargets
        SET target_values = COALESCE(?, target_values),
            current_values = COALESCE(?, current_values)
        WHERE id = ?
    `;
    db.prepare(sql).run(updates.targetValues, updates.currentValues, id);
};

export const deleteTaskTarget = (id) => {
    const sql = `DELETE FROM taskTargets WHERE id = ?`;
    db.prepare(sql).run(id);
};

// ==================== TASK TYPE CRUD ====================
export const createTaskType = (typeName) => {
    const sql = `INSERT INTO taskType (type_name) VALUES (?)`;
    const result = db.prepare(sql).run(typeName);
    return result.lastInsertRowid;
};

export const getTaskType = (id) => {
    const sql = `SELECT * FROM taskType WHERE id = ?`;
    return db.prepare(sql).get(id);
};

export const getAllTaskTypes = () => {
    const sql = `SELECT * FROM taskType`;
    return db.prepare(sql).all();
};

export const updateTaskType = (id, typeName) => {
    const sql = `
        UPDATE taskType
        SET type_name = COALESCE(?, type_name)
        WHERE id = ?
    `;
    db.prepare(sql).run(typeName, id);
};

export const deleteTaskType = (id) => {
    const sql = `DELETE FROM taskType WHERE id = ?`;
    db.prepare(sql).run(id);
};

// ==================== USER CRUD ====================
export const createUser = (username, password) => {
    const sql = `
        INSERT INTO user (username, password)
        VALUES (?, ?)
    `;
    const result = db.prepare(sql).run(username, password);
    return result.lastInsertRowid;
};

export const getUser = (id) => {
    const sql = `SELECT * FROM user WHERE id = ?`;
    return db.prepare(sql).get(id);
};

export const getAllUsers = () => {
    const sql = `SELECT * FROM user`;
    return db.prepare(sql).all();
};

export const updateUser = (id, updates) => {
    const sql = `
        UPDATE user
        SET username = COALESCE(?, username),
            password = COALESCE(?, password)
        WHERE id = ?
    `;
    db.prepare(sql).run(updates.username, updates.password, id);
};

export const deleteUser = (id) => {
    const sql = `DELETE FROM user WHERE id = ?`;
    db.prepare(sql).run(id);
};

export const findUser = (username, password) => {
    const sql = `SELECT * FROM user WHERE username = ? and password = ?`;
    return db.prepare(sql).get(username, password);
}
