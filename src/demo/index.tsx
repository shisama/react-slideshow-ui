import React from "react";
import ReactDOM from "react-dom";
import SlideShow from "../SlideShow";

/**
 * entry point class for demo
 */
class App extends React.Component {
  /**
   * rendering view
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <SlideShow
          style={{ width: 400, left: "40%", top: 50 }}
          images={[
            "./img/example1.png",
            "./img/example2.png",
            "./img/example3.png"
          ]}
          withTimestamp={true}
          pageWillUpdate={(index, image) => {
            console.log(`Page Update! index: ${index}, image: ${image}`);
          }}
          showFullscreenIcon={true}
          className="react-slideshow-ui-demo"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("slideshow"));
