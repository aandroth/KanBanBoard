import React from 'react';

let nextTaskKey = 1;
let nextProjectKey = 2;
// Actions
export const addTask = (_title, _summary, _acc_crit, _due_date, _priority, _categoryIdx) => ({
    type: 'ADD_TASK',
    key: nextTaskKey++,
    title: _title,
    summary: _summary,
    acc_Crit: _acc_crit,
    due_Date: _due_date,
    priority: _priority,
    categoryIdx: _categoryIdx,
});

export const updateTask = (_title, _summary, _acc_crit, _due_date, _priority, _cat, _idx, _key, _categoryIdx) => ({
    type: 'UPDATE_TASK',
    idx: _idx,
    key: _key,
    title: _title,
    summary: _summary,
    acc_Crit: _acc_crit,
    due_Date: _due_date,
    priority: _priority,
    maybe_new_cat: _cat,
    categoryIdx: _categoryIdx,
});

export const deleteTask = (id, _categoryIdx) => ({
    type: 'DEL_TASK',
    id: id,
    categoryIdx: _categoryIdx,
});

export const getTasks = () => ({
    type: 'GET_TASKS',
});

export const addProject = (_title, _subtitle, _description, _start_date, _end_date) => ({
    type: 'ADD_PROJECT',
    key: nextProjectKey++,
    title: _title,
    subtitle: _subtitle,
    description: _description,
    start_date: _start_date,
    end_date: _end_date,
})

export const updateProject = (_title, _subtitle, _description, _start_date, _end_date, _idx, _key) => ({
    type: 'UPDATE_PROJECT',
    idx: _idx,
    key: _key,
    title: _title,
    subtitle: _subtitle,
    description: _description,
    start_date: _start_date,
    end_date: _end_date,
});

export const deleteProject = (_id) => ({
    type: 'DEL_PROJECT',
    id: _id,
});

export const changeFilled = () => ({
    type: 'CHANGE_FILLED',
});

export const initFn = () => ({
    type: 'INIT'
});