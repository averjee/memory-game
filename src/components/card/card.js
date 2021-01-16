import React from "react";
import { withRouter } from 'react-router-dom';
import Flippy, { BackSide, FrontSide } from "react-flippy";
import "../game/game.css";

const cardStyle = {
    width: 190,
    height: 190,
    display: "flex",
    cursor: "pointer",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)"
};
const flipperStyle = {
    margin: "10px",
    display: "inline-block",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)"
};

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.matched && !this.props.imageUp) {
      this.props.onClick(this.props.id);
    }
  }

  render() {
    const frontImage = require(`../../images/${this.props.image}.png`);
    return (
      <Flippy
        flipOnClick={true}
        flipDirection="horizontal"
        ref={r => (this.flippy = r)}
        isFlipped={this.props.imageUp}
        style={flipperStyle}
      >
        <FrontSide onClick={this.onClick} id="grad" style={cardStyle} />
        <BackSide
          style={{
            backgroundImage: `url(${frontImage})`,
            backgroundSize: "cover",
            width: 190,
            height: 190
          }}
        />
      </Flippy>
    );
  }
}

export default withRouter(Card);
