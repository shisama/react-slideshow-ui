// @flow
import React from "react";

type Props = {
  style: Object
}

export default class SlideShow extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={this.props.style}>
        Hell, Word!
      </div>
    );
  }
}