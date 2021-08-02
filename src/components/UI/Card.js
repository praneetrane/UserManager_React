import React from "react";
import styles from "./Card.module.css";

const Card = (props) => {
  //const classes='card '+ props.className;
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
