import React from "react";
import { withRouter } from "react-router";
import { socket } from "../../socketHelper";
import "./task.css";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TaskNum: "",
      TaskName: "",
      TaskDescription: "",
      AssignedTo: "",
      StartDate: "",
      EndDate: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.socket = io.connect("http://localhost:22446");
  // }

  // componentWillUnmount() {
  //   this.socket.close();
  // }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state);
    this.props.history.push("/client/board/board");
    event.preventDefault();
    // this.socket.emit("task_insert", this.state);
    socket.emit("task_insert", this.state);
  }

  render() {
    return (
      <>
        <form>
          <label id="taskFrom">
            TaskName:
            <input
              name="TaskName"
              type="text"
              value={this.state.TaskName}
              onChange={this.handleChange}
            />
          </label>
          <br></br>

          <label id="taskFrom">
            Assigned To:
            <input
              name="AssignedTo"
              type="text"
              value={this.state.AssignedTo}
              onChange={this.handleChange}
            />
          </label>
          <br></br>

          <label id="taskFrom">
            Start Date:
            <input
              name="StartDate"
              type="date"
              value={this.state.StartDate}
              onChange={this.handleChange}
            />
          </label>
          <br></br>

          <label id="taskFrom">
            End Date:
            <input
              name="EndDate"
              type="date"
              value={this.state.EndDate}
              onChange={this.handleChange}
            />
          </label>
          <br></br>

          <label id="taskFrom">
            Task Description:
            <textarea
              name="TaskDescription"
              type="date"
              value={this.state.TaskDescription}
              onChange={this.handleChange}
            />
          </label>
          <input
            id="submit"
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
          />
        </form>
      </>
    );
  }
}

export default withRouter(Task);
