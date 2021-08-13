let nextTaskKey = 2;
let nextProjectKey = 2;
// Actions
export const addTask = (_title, _summary, _acc_crit, _due_date, _priority, _categoryIdx, _taskId) => ({
    type: 'ADD_TASK',
    key: _taskId,
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

export const getTasksForProject = (_key, _categories) => ({
    type: 'GET_TASKS_FOR_PROJECT',
    key: _key,
    categories: _categories,
});

export const addProject = (_key, _title, _subtitle, _description, _start_date, _end_date) => ({
    type: 'ADD_PROJECT',
    key: _key,
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

export const getProjects = (_id) => ({
    type: 'GET_PROJECT'
});

export const changeProjectIdx = (_key) => ({
    type: 'CHANGE_PROJECT_IDX',
    key: _key,
})

export const changeFilled = () => ({
    type: 'CHANGE_FILLED',
});

export const signup = (_name, _email, _password) => ({
    type: 'SIGNUP',
    name: _name,
    email: _email,
    password: _password,
})

export const login = (_name, _email, _key, _projs) => ({
    type: 'LOGIN',
    name: _name,
    email: _email,
    key: _key,
    projs: _projs,
})

export const initFn = () => ({
    type: 'INIT'
});

export const updateDashboardScroll = (_value) => ({
    type: 'UPDATE_DASHBOARD_SCROLL',
    value: _value
});

export const updateProjectScroll = (_value) => ({
    type: 'UPDATE_PROJECT_SCROLL',
    value: _value
});