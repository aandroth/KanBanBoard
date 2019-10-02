//import axios from 'axios';
import axios from '../../node_modules/axios/index'; 

const HOST_URL = 'http://www.Awstest-env-2.hzfudedbwd.us-west-1.elasticbeanstalk.com/kb/';//'http://localhost:8080/kb/';

// Adding
async function sendBackendAPI(url, data) {
    console.log("Sending data to "+url + " with DB: " + data);

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
export async function saveEntityToDB(urlAppend, data) {

    let urlStr = HOST_URL + urlAppend;
    return await sendBackendAPI(urlStr, data);
}

// Loading
async function callBackendAPI(url) {

    //console.log("Fetching from DB with url " + url);

    try {
        return axios.get(url)
            .then(function (res) {
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
export async function loadEntityFromDB(urlAppend) {

    let urlStr = HOST_URL + urlAppend;
    return await callBackendAPI(urlStr);
};
export async function loginAndGetUserFromDB(userEmail, userPass) {

    let urlAppend = 'login/' + userEmail + '/' + userPass;
    let urlStr = HOST_URL + urlAppend;
    return await callBackendAPI(urlStr);
}

// Updating
async function updateBackendAPI (url, data) {

    try {
        return axios.put(url, data)
            .then(function (res) {
                console.log(res);
                console.log(res.data);
                return res.data;
            })
            .catch(function (err) {
                console.log("Error: " + err);
                return false;
            })
    }
    catch (err) { console.log(err); };
}
export async function updateEntityInDB(urlAppend, data) {

    let urlStr = HOST_URL + urlAppend;
    return await updateBackendAPI(urlStr, data);
}

// Deleting
async function deleteBackendAPI (url) {

    try {
        return await axios.delete(url)
            .then(function (res) {
                console.log(res);
                console.log(res.data);
                return res.data;
            })
            .catch(function (err) {
                console.log("Deletion Error: " + err);
            })
    }
    catch (err) { console.log(err); };
}
export async function deleteEntityFromDB(urlAppend) {

    let urlStr = HOST_URL + urlAppend;
    return await deleteBackendAPI(urlStr)
}