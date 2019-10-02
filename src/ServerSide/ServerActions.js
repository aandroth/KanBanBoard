import {
    saveEntityToDB,
    loadEntityFromDB,
    updateEntityInDB,
    deleteEntityFromDB
} from './ServerFunctions';

// Actions
export const addTaskDb = async (userId, projId, _title, _summary, _acc_crit, _due_date, _priority, _categoryIdx) => {

    let urlStr = "task/" + userId + "/" + projId;
    let taskData = {
        categoryIdx: _categoryIdx, taskTitle: _title,
        taskSummary: _summary, taskCriteria: _acc_crit,
        taskDueDate: _due_date, taskPriority: _priority,
    };
    return await saveEntityToDB(urlStr, taskData);
};

export const updateTaskDb = async (userId, projId, id, _title, _summary, _acc_crit, _due_date, _priority, _cat) => {

    let urlStr = "task/" + userId + "/" + projId + "/" + id;
    let taskData = {
        categoryIdx: _cat, taskTitle: _title,
        taskSummary: _summary, taskCriteria: _acc_crit,
        taskDueDate: _due_date, taskPriority: _priority,
    };
    return await updateEntityInDB(urlStr, taskData);
};

export const deleteTaskDb = async (userId, projId, id) => {

    let urlStr = "task/" + userId + "/" + projId + "/" + id;
    return await deleteEntityFromDB(urlStr);
};

export const getTaskDb = async (userId, projId, id) => {

    let urlStr = "task/" + userId + "/" + projId + "/" + id;
    return await loadEntityFromDB(urlStr);
};

export const getTasksOfProjectOrganizedByCategory = async (userId, projId) => {

    let urlStr = "tasksByCategory/" + userId + "/" + projId;
    return await loadEntityFromDB(urlStr);
};

export const addProjectDb = async (userId, _title, _subtitle, _description, _start_date, _end_date) => {

    let urlStr = 'proj/' + userId;
    let projData = {
        projTitle: _title,
        projSubtitle: _subtitle,
        projDescription: _description,
        projStartDate: _start_date, projEndDate: _end_date
    };
    return await saveEntityToDB(urlStr, projData);
};

export const updateProjectDb = async (userId, id, _title, _subtitle, _description, _start_date, _end_date) => {

    let urlStr = 'proj/' + userId + "/" + id;
    let projData = {
        projTitle: _title,
        projSubtitle: _subtitle,
        projDescription: _description,
        projStartDate: _start_date, projEndDate: _end_date
    };
    return await updateEntityInDB(urlStr, projData);
};

export const deleteProjectDb = async (userId, id) => {

    let urlString = "proj/" + userId + "/" + id;
    return await deleteEntityFromDB(urlString);
};

export const getProjectDb = async (userId, id) => {

    let urlString = "proj/" + userId + "/" + id;
    return await loadEntityFromDB(urlString);
};

export const getProjectListOfUserDb = async (userId) => {

    let urlString = "projs/" + userId;
    return await loadEntityFromDB(urlString);
};

export const signup = async (_name, _email, _password) => {
    let urlStr = 'user';
    let userData = {
        userEmail: _email,
        userName: _name,
        userPass: _password
    };
    let _userId = await saveEntityToDB(urlStr, userData);

    let projData = {
        projTitle: 'Example Project',
        projSubtitle: 'The Subtitle',
        projDescription: 'A Description',
        projStartDate: 'Start', projEndDate: 'End'
    };
    let _projId = await addProjectDb(_userId, projData);

    let taskData = {
        categoryIdx: 0, taskTitle: 'Example Task',
        taskSummary: 'Summary', taskCriteria: 'No criteria',
        taskDueDate: 'LATER', taskPriority: 0
    };
    await addTaskDb(_userId, _projId, taskData);
};

export const login = async (_email, _pass) => {

    let urlStr = 'login/' + _email + '/' + _pass;
    return await loadEntityFromDB(urlStr);
};

export const initFn = async () => {
    //                                                                                                                          type: 'INIT',
};
