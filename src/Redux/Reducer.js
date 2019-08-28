import React from 'react';
import { combineReducers } from 'redux';

// Reducer
export const reducerFn = (state = {}, action) => {
    console.log("in reducer")

    switch (action.type) {
        case 'ADD_TASK':
        {
            console.log("add task");
            console.log("adding " + action.title + " to category " + action.categoryIdx + " with key " + action.key);
            let add_categories = [...state.categories];
            add_categories[action.categoryIdx] = [...add_categories[action.categoryIdx], {
                key: action.key,
                title: action.title,
                summary: action.summary,
                acc_Crit: action._acc_crit,
                due_Date: action._due_date,
                priority: action._priority,
            }];
            console.log("returning  added-to list");
            return { ...state, categories: add_categories };
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
            let update_categories = [...state.categories];
            if (action.maybe_new_cat != action.categoryIdx) {
                console.log("Moving task from category " + action.categoryIdx + " to category " + action.maybe_new_cat);
                update_categories[action.categoryIdx].splice(action.idx, 1);
                update_categories[action.maybe_new_cat].push(updateObj);
                action.categoryIdx = action.maybe_new_cat;
            }
            else {
                update_categories[action.categoryIdx][action.idx] = updateObj;
            }

            console.log("update task");
            console.log("updating " + action.title + " to category " + action.categoryIdx + " with idx " + action.idx);
            console.log("returning  updated categories");
            console.log("Category sizes are 0:" + update_categories[0].length +
                ", 1:" + update_categories[1].length +
                ", 2:" + update_categories[2].length);
            //categories[action.categoryIdx] = add_list;
            return { ...state, categories: update_categories };
        }
        case 'GET_TASKS':
        {
            console.log("get tasks");
            if (!state)
                console.log("state is undefined");
            else if (!state.tasklist)
                console.log("state.tasklist is undefined");
            else if (state.tasklist.length == 0)
                console.log("state.tasklist is empty");
            else
                console.log("get tasks: " + state.tasklist[0].title);
            return state;
        }
        case 'DEL_TASK':
        {
            console.log("delete task");
            let categories = state.categories;
            console.log("delete " + action.id + " from: " + action.categoryIdx);
            let del_list = [...state.categories[action.categoryIdx]];
            if (del_list.length <= 1) {
                console.log("delete, list has one item, or less");
                del_list = [];
            }
            else {
                for (let ii = 0; ii < del_list.length; ++ii) {
                    console.log("delete, comparing: " + del_list[ii].key + " and " + action.id);
                    if (del_list[ii].key == action.id) {
                        del_list.splice(ii, 1);
                        break;
                    }
                }
            }
            categories[action.categoryIdx] = del_list
            return { ...state, categories: categories };
        }
        case 'ADD_PROJECT':
        {
            console.log("add project");
            console.log("adding " + action.title + " to profile " + 0 + " with key " + action.key);
            let add_projects = [...state.project_list];
            for (let ii = 0; ii < add_projects.length; ++ii) {
            }
            add_projects = [...add_projects, {
                key: action.key,
                title: action.title,
                subtitle: action.subtitle,
                description: action.description,
                start_date: action.start_date,
                end_date: action.end_date,
            }];
            console.log("returning  added-to-projects list");
            return { ...state, project_list: add_projects };
        }
        case 'DEL_PROJECT':
        {
            console.log("delete project called.");
            let del_proj_list = [...state.project_list];
            console.log("List has " + del_proj_list.length + " entries.");
            if (del_proj_list.length <= 1) {
                console.log("delete, list has one item, or less");
                del_proj_list = [];
            }
            else {
                for (let ii = 0; ii < del_proj_list.length; ++ii) {
                    console.log("delete, comparing: " + del_proj_list[ii].key + " and " + action.id);
                    if (del_proj_list[ii].key == action.id) {
                        console.log("match found in idx: " + ii);
                        del_proj_list.splice(ii, 1);
                        console.log("match found in idx: " + ii);
                        break;
                    }
                }
            }
            console.log("List has " + del_proj_list.length + " entries.");
            return { ...state, project_list: del_proj_list };
        }
        case 'INIT':
        {
            if (!state.project_list) {
                    console.log("init: project_list undefined, creating it now");
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
                list1.push({
                    title: "Example Project2", subtitle: "Subtitle2", description: "description 2 here", start_date: "was now", end_date: "maybe later", key: 1,
                });
                return { filled: true, project_list: list1, categories: [[], [], []], username: "John Doe", passhash: "hash" };
            }
            console.log("init: no changes");
            return state;
        }
        default:
        {
            console.log("default");
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