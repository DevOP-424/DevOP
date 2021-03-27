import React from "react";
import "./card.css";

// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';

export default class card extends React.Component {
  render() {
    return (
      <>
        <div className="taskcard">
          <label className="cardnametitle">
            Name <input type="text" className="cardfirstlastname"></input>
          </label>

          <br />
          <label className="cardtasktitle">
            Task <input type="text" className="cardassigntask"></input>
          </label>
        </div>
      </>
    );
  }
}
