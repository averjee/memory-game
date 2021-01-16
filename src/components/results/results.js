import React from "react";
import { withRouter } from 'react-router-dom';

const buttonStyle = {
  margin: "25px auto auto",
  backgroundColor: "#fd2b03",
  color: "#fff",
  outline: "none",
  border: "none",
  borderRadius: "5px",
  width: "170px",
  height: "50px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer"
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.restart = this.restart.bind(this);
    this.result = this.props.history.location.state.result;
  }

  restart() {
    this.props.history.push('/');
  }
  render() {
    return (
      <div className="status" style={{ textAlign: "center", paddingTop: 150 }}>
        <h1>Well Done!</h1>
        <h3>Game Completed with {this.result} turns</h3>
        <div>
          <button style={buttonStyle} onClick={this.restart}>Restart</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Results);
