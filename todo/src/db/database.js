const db = require('better-sqlite3')('database.db');

export const createUserTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        );
    `;
    db.prepare(sql).run();
};



const createTodoTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS todo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            type_id INTEGER NOT NULL,
            task_status INTEGER NOT NULL DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            color TEXT,
            FOREIGN KEY (type_id) REFERENCES taskType (id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
        )
    `;
    db.prepare(sql).run();
};


const createTaskDailyTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS taskDaily (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id INTEGER NOT NULL,
            last_completed DATETIME,
            FOREIGN KEY (task_id) REFERENCES todo (id) ON DELETE CASCADE
        )
    `;
    db.prepare(sql).run();
};

const createTaskDeadlinesTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS taskDeadlines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id INTEGER NOT NULL,
            deadline DATETIME NOT NULL,
            FOREIGN KEY (task_id) REFERENCES todo (id) ON DELETE CASCADE
        )
    `;
    db.prepare(sql).run();
};

const createTaskRepetitionsTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS taskRepetitions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id INTEGER NOT NULL,
            target_count INTEGER NOT NULL,
            completed_count INTEGER DEFAULT 0,
            FOREIGN KEY (task_id) REFERENCES todo (id) ON DELETE CASCADE
        )
    `;
    db.prepare(sql).run();
};

const createTaskTargetsTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS taskTargets (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           task_id INTEGER NOT NULL,
           target_values INTEGER NOT NULL,
           current_values INTEGER DEFAULT 0,
           FOREIGN KEY (task_id) REFERENCES todo (id) ON DELETE CASCADE
        )
    `;
    db.prepare(sql).run();
};

const createTaskTypeTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS taskType (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type_name TEXT NOT NULL
        )
    `;
    db.prepare(sql).run();
};

// createUserTable();
// createTaskTypeTable();
// createTodoTable();
// createTaskDailyTable();
// createTaskDeadlinesTable();
// createTaskRepetitionsTable();
// createTaskTargetsTable();

