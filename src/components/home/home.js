import React from 'react';
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
  marginTop: "300px",
  cursor: "pointer"
}

class Home extends React.Component {  
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.history.push('/game');
  }

  render() {
    return (
      <button onClick={this.onClick} style={buttonStyle}>
        START NEW GAME
      </button>
    );
  }
}

export default withRouter(Home);
