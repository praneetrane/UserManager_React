import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  //---- useStates to collect user inputs
  //const [enteredUserName, setEnteredUserName] = useState("");
  //const [enteredAge, setEnteredAge] = useState("");
  //---- We no longer need these useStates/States here since we are making use of Ref

  const [error, setError] = useState();

  /*
  //----We no longer need these userName and age handler functions as we are now using ref
  //----username handler
  const userNameChangedHandler = (event) => {
    setEnteredUserName(event.target.value);
  };

  // age change handler
  const ageChangedHandler = (event) => {
    setEnteredAge(event.target.value);
  };
 */
  //Add user handler
  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    //----if state isValid is false then we should not proceed with handler

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }

    //Generally in javascript and in DOM all the input will be in string but by just comparing it <1 will work.
    //But to super safe we can prepent enteredAge with '+' symbol (+enteredAge)
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0).",
      });
      return;
    }

    props.onAddUser(enteredName, enteredUserAge);

    //----Reseting the values
    // setEnteredUserName("");
    // setEnteredAge("");
    // We no longer need there reset functions as we are using Ref

    //----To reset values using Ref. This is not recommanded appraoch and we can rarely do that.
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";

    //Note- While choosing between Ref vs State. Use Ref when we only need to read and not to update it.
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    //Instead of our created <Wrapper/> component. We can user React built-in Fragment i.e.<React.Fragment></React.Fragment>  or <></>
    //Note that <> </> is based on your project setup hence may not work everywhere whereas fragment would work.
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            /*  As we are using Ref, this is no longer require.
            value={enteredUserName}            
            onChange={userNameChangedHandler} */
            ref={nameInputRef}
          />

          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            /*  As we are using Ref, this is no longer require.
            value={enteredAge}
            onChange={ageChangedHandler} */
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
