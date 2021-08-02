import React, {useState} from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersList, setusersList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setusersList((prevUsersList) => {
      return [...prevUsersList, { name: uName, age: uAge, id: Math.random().toString() }];
    });
  };

  return (
    <React.Fragment>
      {/* Add User */}
      <AddUser onAddUser={addUserHandler} />
      {/* Users List */}
      <UsersList users={usersList} />
    </React.Fragment>
  );
}

export default App;
