import React from "react";
import SlideShow from "../src/components/SlideShow";

export default () => (
  <div>
    <SlideShow
      style={{width: "50%"}}
      src={[
        "static/img/example1.png",
        "static/img/example2.png",
        "static/img/example3.png",
      ]}
    />
  </div>
)