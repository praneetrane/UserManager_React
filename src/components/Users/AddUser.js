import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  //---- useStates to collect user inputs
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();
  //----username handler
  const userNameChangedHandler = (event) => {
    setEnteredUserName(event.target.value);
  };

  // age change handler
  const ageChangedHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  //Add user handler
  const addUserHandler = (event) => {
    event.preventDefault();
    //----if state isValid is false then we should not proceed with handler

    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }

    //Generally in javascript and in DOM all the input will be in string but by just comparing it <1 will work.
    //But to super safe we can prepent enteredAge with '+' symbol (+enteredAge)
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0).",
      });
      return;
    }

    props.onAddUser(enteredUserName, enteredAge);

    //----Reseting the values
    setEnteredUserName("");
    setEnteredAge("");
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <Wrapper>
      {error && <ErrorModal title={error.title} message={error.message}  onConfirm={errorHandler}/>}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={enteredUserName}
            type="text"
            onChange={userNameChangedHandler}
          />

          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            value={enteredAge}
            type="number"
            onChange={ageChangedHandler}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
