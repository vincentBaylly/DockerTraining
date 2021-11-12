"use strict";

class Tasks extends React.Component {
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>description</th>
            <th>Couleur</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tasks &&
            this.props.tasks.map((task) => {
              return (
                <tr key={task._id}>
                  <td>{task._id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.color}</td>
                  <td>{task.status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      title: "",
      id: "",
      description: "",
      color: "",
      status: "",
    };

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // get all entities - GET
    fetch("https://localhost:8080/task/taskModel", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          tasks: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  create(e) {
    // add entity - POST
    e.preventDefault();

    // creates entity
    fetch("https://localhost:8080/task/taskModel", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        notes: this.state.notes,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update(e) {
    // update entity - PUT
    e.preventDefault();

    // this will update entries with PUT
    fetch("https://localhost:8080/task/taskModel", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        _id: this.state.id,
        name: this.state.name,
        notes: this.state.notes,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  delete(e) {
    // delete entity - DELETE
    e.preventDefault();
    // deletes entities
    fetch(`https://localhost:8080/task/taskModel/_id/${this.state.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="display-4 text-center">Make An API Call in React</h1>
            <form className="d-flex flex-column">
              <legend className="text-center">Add-Update-Delete Task</legend>
              <label htmlFor="name">
                Task Name:
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={(e) => this.handleChange({ name: e.target.value })}
                  required
                />
              </label>
              <label htmlFor="notes">
                Task notes:
                <input
                  name="notes"
                  id="notes"
                  type="test"
                  className="form-control"
                  value={this.state.notes}
                  onChange={(e) => this.handleChange({ notes: e.target.value })}
                  required
                />
              </label>
              <label htmlFor="id">
                Task ID:
                <input
                  name="id"
                  id="id"
                  type="text"
                  className="form-control"
                  value={this.state.id}
                  onChange={(e) => this.handleChange({ id: e.target.value })}
                />
              </label>
              <button
                className="btn btn-primary"
                type="button"
                onClick={(e) => this.create(e)}
              >
                Add
              </button>
              <button
                className="btn btn-info"
                type="button"
                onClick={(e) => this.update(e)}
              >
                Update
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={(e) => this.delete(e)}
              >
                Delete
              </button>
            </form>
            <Tasks tasks={this.state.tasks} />
          </div>
        </div>
      </div>
    );
  }
}

let domContainer = document.querySelector("#App");
ReactDOM.render(<App />, domContainer);
