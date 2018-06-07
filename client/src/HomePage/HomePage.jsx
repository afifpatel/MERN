import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AlertLib } from "hellolibalemarcha";

import { userActions } from "../_actions";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="col-md-6 offset-md-3">
        <h1>
          Hi {user.firstName} {user.lastName}!
        </h1>
        <AlertLib message="You're logged in with React & JWT!!"></AlertLib>
        <h3>Users from secure api end point:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items &&
          users.items.users && (
            <ul>
              {users.items.users.map((user, index) => (
                <li key={user.id}>{user.firstName + " " + user.lastName}</li>
              ))}
            </ul>
          )}
        <p>
          <Link to="/login">Logout</Link>
        </p>
        <p>
          <Link to="/hello">Go to hellos</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  console.log(state);
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
