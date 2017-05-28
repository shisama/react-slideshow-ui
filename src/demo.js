import React from "react";
import {render} from "react-dom";
import SlideShow from "./components/SlideShow";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SlideShow
          style={{width: "50%"}}
          src={[
            "./img/example1.png",
            "./img/example2.png",
            "./img/example3.png",
          ]}
        />
      </div>
    )
  }
}

render(
  <App/>,
  document.getElementById("slideshow")
);
