import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProject } from '../Redux/Actions';

const updateUrl = (projectkey) => {
    return "updateproject?k=" + projectkey;
}

const Project = ({title, subtitle, projKey, onClick }) => {
    console.log("props.projKey: " + projKey);
    return (
        <div style={{ border: "solid 2px", width: "50%", height: "50%" }}>
            <p style={{ top: "10px", left: "10px" }}>Type</p>
            <div style={{ width: "10%", left: "50px", border: "solid blue 1px" }}>
                {title}
                <br />
                {subtitle}
            </div>
            <div style={{ width: "10%", textAlign: "right", padding: "10px", right: "0px", border: "solid red 1px" }}>
                <Link to="projectview"><button>View</button></Link>
                <br />
                <Link to={updateUrl(projKey)}><button>Update</button></Link>
                <br />
                <button onClick={() => onClick(projKey)}>Delete</button>
            </div>
        </div>
    )
}

class Dashboard extends React.Component {

render() {
        return (
            <div>
                <Link to="addproject"><button>Create Project</button></Link>
                <ul>
                    {this.props.project_list.map(t => <Project title={t.title} subtitle={t.subtitle} projKey={t.key} key={t.key} onClick={this.props.deleteProject} />)}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    project_list: state.reducerFn.project_list,
})

const mapDispatchToProps = {
    deleteProject,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);