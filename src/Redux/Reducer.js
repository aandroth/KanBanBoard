import { combineReducers } from 'redux';

// Reducer
export const reducerFn = (state = {}, action) => {
    console.log("in reducer")

    switch (action.type) {
        case 'ADD_TASK':
            {
                console.log("add task");
                console.log("adding " + action.title + " to category " + action.categoryIdx + " with key " + action.key);
                console.log("all for user " + state.active_user.name + " of idx " + state.active_user.idx);
                let add_task_projectlist = [...state.user_list[state.active_user.idx].project_list];
                add_task_projectlist[state.project_idx].categories[action.categoryIdx] = [...add_task_projectlist[state.project_idx].categories[action.categoryIdx], {
                    key: action.key,
                    title: action.title,
                    summary: action.summary,
                    acc_Crit: action.acc_Crit,
                    due_Date: action.due_Date,
                    priority: action.priority,
                }];
                let add_task_to_user_list = [...state.user_list];
                add_task_to_user_list[state.active_user.idx].project_list = add_task_projectlist;
                console.log("returning  added-to list");
                return { ...state, user_list: add_task_to_user_list };
            }
        case 'UPDATE_TASK':
            {
                let updateObj = {
                    key: action.key,
                    title: action.title,
                    summary: action.summary,
                    acc_Crit: action.acc_Crit,
                    due_Date: action.due_Date,
                    priority: action.priority,
                };
                let update_task_to_user_list = [...state.user_list];
                //let updatetask_projectlist = [...update_task_to_user_list[state.active_user.idx].project_list];
                let update_cats = [...update_task_to_user_list[state.active_user.idx].project_list[state.project_idx].categories];//updatetask_projectlist[state.project_idx].categories;
                if (action.maybe_new_cat !== action.categoryIdx) {
                    console.log("Moving task from category " + action.categoryIdx + " to category " + action.maybe_new_cat);
                    update_cats[action.categoryIdx].splice(action.idx, 1);
                    update_cats[action.maybe_new_cat].push(updateObj);
                    action.categoryIdx = action.maybe_new_cat;
                }
                else {
                    update_cats[action.categoryIdx][action.idx] = updateObj;
                }

                console.log("update task");
                console.log("updating " + action.title + " to category " + action.categoryIdx + " with idx " + action.idx);
                console.log("returning  updated categories");
                    console.log("Category sizes are 0:" + update_cats[0].length +
                        ", 1:" + update_cats[1].length +
                        ", 2:" + update_cats[2].length);
                update_task_to_user_list[state.active_user.idx].project_list[state.project_idx].categories = update_cats;
                return { ...state, user_list: update_task_to_user_list };
            }
        case 'GET_TASKS':
            {
                console.log("get tasks");
                if (!state)
                    console.log("state is undefined");
                else if (!state.tasklist)
                    console.log("state.tasklist is undefined");
                else if (state.tasklist.length === 0)
                    console.log("state.tasklist is empty");
                else
                    console.log("get tasks: " + state.tasklist[0].title);
                return state;
            }
        case 'GET_TASKS_FOR_PROJECT':
            {
                let get_tasks_for_project_for_user_list = [...state.user_list];
                let projList = state.user_list[state.active_user.idx].project_list;
                let projIdx = 0;
                for (let ii = 0; ii < projList.length; ++ii) {
                    console.log("get_project, comparing: " + projList[ii].key + " and " + action.key);
                    if (projList[ii].key === action.key) {
                        projIdx = ii;
                        break;
                    }
                }
                console.log(get_tasks_for_project_for_user_list[0]);
                console.log(action.categories);

                get_tasks_for_project_for_user_list[0].project_list[projIdx] = {
                    ...get_tasks_for_project_for_user_list[0].project_list[projIdx],
                    categories: action.categories,
                }
                console.log(get_tasks_for_project_for_user_list[0]);

                return { ...state, user_list: get_tasks_for_project_for_user_list };
            }
        case 'DEL_TASK':
            {
                console.log("delete task" + action.id + " from: " + action.categoryIdx);
                let del_task_userlist = [...state.user_list];
                let del_list = [...del_task_userlist[state.active_user.idx].project_list[state.project_idx].categories[action.categoryIdx]];
                if (del_list.length <= 1) {
                    console.log("delete, list has one item, or less");
                    del_list = [];
                }
                else {
                    for (let ii = 0; ii < del_list.length; ++ii) {
                        console.log("delete, comparing: " + del_list[ii].key + " and " + action.id);
                        if (del_list[ii].key === action.id) {
                            del_list.splice(ii, 1);
                            break;
                        }
                    }
                }
                del_task_userlist[state.active_user.idx].project_list[state.project_idx].categories[action.categoryIdx] = del_list
                return { ...state, user_list: del_task_userlist };
            }
        case 'ADD_PROJECT':
            {
                console.log("add project");
                console.log("adding " + action.title + " to profile " + 0 + " with key " + action.key);
                let add_projects_to_userlist = [...state.user_list];
                let add_projects = [...add_projects_to_userlist[state.active_user.idx].project_list];
                for (let ii = 0; ii < add_projects.length; ++ii) {
                }
                add_projects = [...add_projects, {
                    key: action.key,
                    title: action.title,
                    subtitle: action.subtitle,
                    description: action.description,
                    start_date: action.start_date,
                    end_date: action.end_date,
                    categories: [[], [], []],
                }];
                add_projects_to_userlist[state.active_user.idx].project_list = add_projects;
                console.log("returning  added-to-projects list");
                return { ...state, user_list: add_projects_to_userlist };
            }
        case 'UPDATE_PROJECT':
            {
                let update_project_to_userlist = [...state.user_list];
                let update_project_list = [...state.user_list[state.active_user.idx].project_list];

                update_project_list[action.idx] = {
                    ...update_project_list[action.idx],
                    title: action.title,
                    subtitle: action.subtitle,
                    description: action.description,
                    start_date: action.start_date,
                    end_date: action.end_date,
                }
                update_project_to_userlist[state.active_user.idx].project_list = update_project_list;
                console.log("returning  updated projects list");
                return { ...state, userlist: update_project_to_userlist };
            }
        case 'DEL_PROJECT':
            {
                console.log("delete project:");
                let del_project_to_userlist = [...state.user_list];
                let del_proj_list = [...state.user_list[state.active_user.idx].project_list];
                console.log("List has " + del_proj_list.length + " entries.");
                if (del_proj_list.length <= 1) {
                    console.log("delete, list has one item, or less");
                    del_proj_list = [];
                }
                else {
                    for (let ii = 0; ii < del_proj_list.length; ++ii) {
                        console.log("delete, comparing: " + del_proj_list[ii].key + " and " + action.id);
                        if (del_proj_list[ii].key === action.id) {
                            console.log("match found in idx: " + ii);
                            del_proj_list.splice(ii, 1);
                            break;
                        }
                    }
                }
                console.log("List has " + del_proj_list.length + " entries.");
                del_project_to_userlist[state.active_user.idx].project_list = del_proj_list;
                return { ...state, project_list: del_project_to_userlist };
            }
        case 'CHANGE_PROJECT_IDX':
            {
                console.log("Changing project idx using key " + action.key);
                let proj_list = state.user_list[state.active_user.idx].project_list;
                let idx = 0;
                for (let ii = 0; ii < proj_list.length; ++ii) {
                    if (proj_list[ii].key === action.key) {
                    console.log("Found project key match at idx: " + ii);
                    idx = ii;
                    break;
                    }
                }
                return { ...state, project_idx: idx };
            }
        case 'SIGNUP':
            {
                let list0 = [];
                list0.push({
                    title: "Example Task in Project", summary: "blank summary", acc_Crit: "acc_Crit",
                    due_Date: "due_Date", priority: "priority", key: "0"
                });
                let catlist0 = [list0, [], []];
                let list1 = [];
                list1.push({
                    title: "Example Project", subtitle: "Subtitle", description: "description here", start_date: "now", end_date: "later", categories: catlist0, key: 0,
                });

                console.log("SignUp: Adding user " + action.name + " with email " + action.email + " and password " + action.password);
                let add_user_list = [...state.user_list];
                // Changed this to overwrite the user 0
                add_user_list[0] = ({ name: action.name, key: action.email, email: action.email, passhash: action.password, project_list: list1 });
                return {
                    ...state, user_list: add_user_list, 
                }
            }
        case 'LOGIN':
            {
                console.log("User is now " + action.name + " with email " + action.email + " and idx " + action.key);
                let list0 = [];
                list0.push({
                    title: "Example Task in Project", summary: "blank summary", acc_Crit: "acc_Crit",
                    due_Date: "due_Date", priority: "priority", key: "0"
                });
                let catlist0 = [list0, [], []];
                let list1 = action.projs;//[];
                for (let ii = 0; ii < list1.length; ++ii)
                    list1[ii] = { ...list1[ii], categories: catlist0 };
                return {
                    ...state, active_user: { name: action.name, email: action.email, idx: 0, key: action.key, project_list: list1 },
                    user_list: [{ name: action.name, key: action.key, email: action.email, idx: 0, project_list: list1 }],
                    logged_in: true
                }
            }
        case 'INIT':
            {
                if (!state.project_list) {
                        console.log("init: project_list undefined, creating it now");
                    let list0 = [];
                    list0.push({
                        title: "Example Task in Project", summary: "blank summary", acc_Crit: "acc_Crit",
                        due_Date: "due_Date", priority: "priority", key: "0", category: 0
                    });
                    let catlist0 = [list0, [], []];
                    let list1 = [];
                    let list2 = [];
                    list1.push({
                        title: "Example Project", subtitle: "Subtitle", description: "description here", start_date: "now", end_date: "later", categories: catlist0, key: 0,
                    });
                    list2.push({
                        title: "Example Project2", subtitle: "Subtitle2", description: "description 2 here", start_date: "was now", end_date: "maybe later", categories: [[], [], []], key: 1,
                    });
                    console.log("init:So list1 has list1[0].categories[0][0].title: " + list1[0].categories[0][0].title);
                    let _user_list = [];
                    _user_list.push({ name: "Nobody", key: 0, email: "n@n.com", passhash: null, project_list: list1 });
                    return {
                        filled: true, project_list: list1, user_list: _user_list, active_user: { name: "Nobody", email: "n@n.com", idx: 0, key: 0 }, project_idx: 0, logged_in: false
                    };
                }
                console.log("init: no changes");
                return state;
            }
        default:
            {
                console.log("DEFAULT");
                if (action.type)
                    console.log("action.type: " + action.type);
                else
                    console.log("No action.type: ");
                return state;
            }
    }
}

export const reducersCombined = combineReducers({
    reducerFn,
})
