import { connect } from 'react-redux';

const fetchData = () => {
    alert("fetching");

    //let newState = dispatch({ type: "GET_TASKS" });

    //if (!newState)
    //    alert("state is undefined");
    //else if (!newState.tasklist)
    //    alert("state.tasklist is undefined " + newState.username);
    //else if (newState.tasklist.length == 0)
    //    alert("state.tasklist is empty");
    //else
    //    alert("returned tasks: " + newState.tasklist[0].title);
    //if (newState.tasklist)
    //    return newState.tasklist;
    //else
    //    return [];

};

export default connect()(fetchData)