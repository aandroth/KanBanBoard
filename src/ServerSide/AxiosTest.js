
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../Redux/Actions';
import axios from 'axios';

const dup_error = 'ER_DUP_ENTRY';
const HOST_URL = 'http://localhost:8080/kb/';
class AxiosTest extends Component {

    state = {

        data: null

    };



    componentDidMount() {

        /////////////////////TESTING BLOCKS///////////////////////////////////////

        // A cascading test that creates, loads, updates, 
        // loads again, and then deletes a user and a proj
        // Great example of getting data from the batabase
        //this.testFnSave();

        // Test for login
        //this.testLoginFn();
        //this.testLoadAllProjsFn(3);
        this.mainProjTestFn();
        
        //this.saveEntityToDB('user', { userEmail: "A", userName: "A", userPass: "P" });
    }

    testLoginFn = async () => {
        let userEmail = "H";
        let userpass = "H@H.com";

        let urlStr = 'login/' + userEmail + '/' + userpass;
        let userData = await this.loadEntityFromDB(urlStr);
        console.log(userData);
    }

    //callAllProjsWithUserId = async(url, userId = 0) => {

    //    try {
    //        return axios.get(url)
    //            .then(function (res) {
    //                return res.data;
    //            })
    //            .catch(function (err) {
    //                console.log("Error: " + err);
    //            })
    //    } catch (error) {
    //        console.log("Error:");
    //        console.error(error)
    //    }
    //}

    mainProjTestFn = async () => {
        //let pArr = await this.testLoadAllProjsFn(12);
        //let id = await this.testSaveProjToUserId(12);
        //if (id > 0)
        //    this.testLoadOneProjFn(12, id);
        //this.testUpdateProjWithUserId(12, 4);
        //this.testDeleteProjWithUserId(12, 3);
        //let id = await this.testDeleteTaskWithUserIdAndProjIdAndId(12, 4, 10);
        //console.log(id + " returned");
        //this.testLoadTaskWithUserIdAndProjIdAndId(12, 4, 9);
        //this.testLoadOneProjFn(12, 4);
        //this.testLoadTasksByCategory(12, 4);
        //this.testUpdateTaskWithUserIdAndProjIdAndIdToCategory(12, 4, 1);
        //this.testUpdateTaskWithUserIdAndProjIdAndIdToCategory(12, 4, 11, 1);
        //this.testUpdateTaskWithUserIdAndProjIdAndIdToCategory(12, 4, 12, 2);
        //this.testUpdateTaskWithUserIdAndProjIdAndIdToCategory(12, 4, 13, 2);
        this.testLoadTasksByCategory(12, 4);
    }

    testLoadTasksByCategory = async (userId, projId) => {
        let urlStr = "tasksByCategory/" + userId + "/" + projId;
        let result = await this.loadEntityFromDB(urlStr);
        console.log(result);
        console.log(result[0][0].taskTitle);
        console.log(result[1][0].taskTitle);
        console.log(result[2][0].taskTitle);
    }
    testDeleteTaskWithUserIdAndProjIdAndId = async (userId, projId, id) => {
        let urlString = "task/" + userId + "/" + projId + "/" + id;
        console.log("Task Deleting Test: " + urlString);
        let result = await this.deleteEntityFromDB(urlString);
        console.log(result);
    }
    testUpdateTaskWithUserIdAndProjIdAndId = async (userId, projId, id) => {
        let urlString = "task/" + userId + "/" + projId + "/" + id;
        let taskData = {
            categoryIdx: 0, taskTitle: 'editTitle', taskSummary: 'eSum', taskCriteria: 'eCrit',
            taskDueDate: 'eDue', taskPriority: 0,
        };
        console.log("Task Loading Test: " + urlString);
        let result = await this.updateEntityInDB(urlString, taskData);
        console.log(result);
    }
    testUpdateTaskWithUserIdAndProjIdAndIdToCategory = async (userId, projId, id, catIdx) => {
        let urlString = "task/" + userId + "/" + projId + "/" + id;
        let taskData = {
            categoryIdx: catIdx, taskTitle: 'eTitle', taskSummary: 'eSum', taskCriteria: 'eCrit',
            taskDueDate: 'eDue', taskPriority: 0,
        };
        console.log("Task Loading Test: " + urlString);
        let result = await this.updateEntityInDB(urlString, taskData);
        console.log(result);
    }
    testLoadTaskWithUserIdAndProjIdAndId = async (userId, projId, id) => {
        let urlString = "task/" + userId + "/" + projId + "/" + id;
        console.log("Task Loading Test: " + urlString);
        let result = await this.loadEntityFromDB(urlString);
        console.log(result);
    }
    testSaveTaskWithUserIdAndProjId = async (userId, projId) => {
        let urlString = "task/" + userId + "/" + projId;
        console.log("Task Saving Test: " + urlString);
        let taskData = {
            categoryIdx: 0, taskTitle: 'tTitle', taskSummary: 'tSum', taskCriteria: 'tCrit',
            taskDueDate: 'tDue', taskPriority: 0
        };
        return this.saveEntityToDB(urlString, taskData);
    }
    testDeleteProjWithUserId = async (userId, id) => {
        let urlString = "proj/" + userId + "/" + id;
        console.log("Deleting Test");
        console.log(urlString + ', ' + id);
        this.deleteEntityFromDB(urlString, id);
    }
    testUpdateProjWithUserId = async (userId, id) => {
        // Saving testing
        console.log("Update Proj with userId Test");
        let urlStr = 'proj/' + userId +"/"+id;
        let projData = {
            projTitle: 'EditedProject', projSubtitle: 'eSub', projDescription: 'eDescrip',
            projStartDate: 'eStart', projEndDate: 'eEnd'
        };
        let updateSuccess = await this.updateEntityInDB(urlStr, projData);
        console.log("updateSuccess: " + updateSuccess);
        return updateSuccess;
    }
    testSaveProjToUserId = async (userId) => {
        // Saving testing
        console.log("Saving Proj with userId Test");
        let urlStr = 'proj/' + userId;
        let projData = {
            projTitle: 'OwnedProject', projSubtitle: 'pSub', projDescription: 'pDescrip',
            projStartDate: 'pStart', projEndDate: 'pEnd'
        };
        let testProjId = await this.saveEntityToDB(urlStr, projData);
        console.log("testProjId: " + testProjId);
        return testProjId;
    }
    testLoadAllProjsFn = async (userId) => {
        //userId = 12;
        console.log("Loading all projs with userId " + userId);

        let urlStr = 'projs/' + userId;
        let projDataList = await this.loadEntityFromDB(urlStr);
        console.log(projDataList);
        console.log("Entry 0: ");
        console.log(projDataList[0]);
    }
    testLoadOneProjFn = async (userId, id) => {
        //userId = 12;
        console.log("Loading proj with userId " + userId +" and projId "+id);

        let urlStr = 'proj/' + userId + '/' + id;
        let resultString = await this.loadEntityFromDB(urlStr);
        console.log("Result is");
        console.log(resultString.projTitle);
    }

    testFnSave = async () => {
        // Saving testing
        console.log("Saving Test");
        let testUserId = 21;
        let testProjId = 1;
        let projData = {
            userId: 39, projTitle: 'OwnedProject', projSubtitle: 'pSub', projDescription: 'pDescrip',
            projStartDate: 'pStart', projEndDate: 'pEnd'
        };
        let list1 = [];
        list1.push(projData);
        let userData = {
            userEmail: 'u@u.com', userName: 'Test User', userPass: 'pass', projList: list1
        };

        //testUserId = await this.saveEntityToDB('user', userData);
        //console.log("Testing with:");
        //console.log(userData);
        //this.testFnLoad('user', testUserId);

        testProjId = await this.saveEntityToDB('proj', projData);
        console.log("testProjId: " + testProjId);
        //this.testFnLoad('proj', testProjId);
    }
    testFnLoad = async (className, id) => {

        console.log("Loading Test");
        console.log(className + ', ' + id);
        await this.loadEntityFromDB(className, id);
        //this.testFnUpdate(className, id);
    }
    testFnUpdate = async (className, _id) => {
        let data;
        if (className == 'user') {
            let L1 = [{
                id: _id, projTitle: 'Edited Title', projSubtitle: 'Edited Sub',
                projDescription: 'Edited Descript', projStartDate: 'Edited Start', projEndDate: 'Edited End'
            }];
            data = {
                id: _id, userEmail: 'u@u.com',
                userName: 'Edited User', userPass: 'editpass',
                projList: L1,
            };
        }
        else if (className == 'proj') {
            data = {
                id: _id, userId: 3, projTitle: 'Edited Title', projSubtitle: 'Edited Sub',
                projDescription: 'Edited Descript', projStartDate: 'Edited Start', projEndDate: 'Edited End'
            };
        }
        console.log("Updating Test");
        console.log(className + ', ' + _id);

        await this.updateEntityInDB(className, _id, data);
        this.testFnLoadUpdate(className, _id);
    }
    testFnLoadUpdate = async (className, id) => {

        console.log("Loading Update Test");
        console.log(className + ', ' + id);
        await this.loadEntityFromDB(className, id);
        //this.testFnDelete(className, id);
    }
    testFnDelete = async (className, id) => {

        console.log("Deleting Test");
        console.log(className + ', ' + id);
        this.deleteEntityFromDB(className, id);
    }

    sendBackendAPI = async (url, data) => {
        //console.log("Sending data to DB: " + data);

        try {
            return axios.post(url, data)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (err) {
                    console.log("Error: " + err);
                })
        }
        catch (err) { console.log(err); };
    }
    // User:    'user/id'
    // Project: '{userid}/proj/{id}'
    saveEntityToDB = async (urlAppend, data) => {

        let urlStr = HOST_URL + urlAppend;
        console.log("Saving to url: " + urlStr);
        let result;
        return await this.sendBackendAPI(urlStr, data)
            .then(function (data) {
                console.log("Saving");
                result = data;
                console.log(result);
                return result;
            })
    }

    callBackendAPI = async (url) => {

        //console.log("Fetching from DB with url " + url);

        try {
            return axios.get(url)
                .then(function (res) {
                    console.log("res: ");
                    console.log(res.data);
                    console.log("data: ");
                    return res.data;
                })
                .catch(function (err) {
                    console.log("Error: " + err);
                })
        } catch (error) {
            console.log("Error:");
            console.error(error)
        }
    };
    loadEntityFromDB = async (urlAppend, id = 0) => {

        let urlStr = '';
        //if (id > 0)
            //urlStr = HOST_URL + urlAppend;
        //else
        urlStr = HOST_URL + urlAppend;

        let result;
        return await this.callBackendAPI(urlStr)
            .then(function (data) {
                console.log("Loading " + urlStr);
                result = data;
                console.log(result);
                return data;
            })
        return result;
    };

    updateBackendAPI = async (url, data) => {

        try {
            return axios.put(url, data)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (err) {
                    console.log("Error: " + err);
                })
        }
        catch (err) { console.log(err); };
    }
    updateEntityInDB = async (urlAppend, data) => {

        let urlStr = HOST_URL + urlAppend;

        let result;
        return await this.updateBackendAPI(urlStr, data)
            .then(function (data) {
                console.log("Updating " + urlStr);
                result = data;
                console.log(result);
            })
        return result;
    }

    deleteBackendAPI = async (url) => {

        try {
            await axios.delete(url)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (err) {
                    console.log("Deletion Error: " + err);
                })
        }
        catch (err) { console.log(err); };
    }
    deleteEntityFromDB = async (urlAppend) => {

        let urlStr = HOST_URL + urlAppend;

        return await axios.delete(urlStr)
            .then(function (data) {
                console.log("Deleting " + urlStr);
                console.log(data);
                return data;
            })
    }

    createUsers = (data) => {
        for (let ii = 0; ii < data.length; ++ii)
            this.props.dispatch(signup(this.state.data[ii].userName,
                this.state.data[ii].userEmail,
                this.state.data[ii].userPass));
    }

    render() {
        //for (let ii = 0; ii<this.state.data.length)
        //<p className="App-intro">{this.state.data}</p>
        
        // Render the newly fetched data inside of this.state.data 
        return (
            <div className="App">

                <header className="App-header">

                    <h1 className="App-title">Welcome to React</h1>

                </header>


            </div>

        );

    }

}




export default connect()(AxiosTest)
