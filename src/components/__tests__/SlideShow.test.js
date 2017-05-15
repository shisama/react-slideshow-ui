import test from "ava";
import React from "react";
import {shallow} from "enzyme";
import SlideShow from "../SlideShow";

test("rendering SlideShow", t => {
  const wrapper = shallow(
    <SlideShow
      style={{fontWeight: "bold"}}
    />
  );
  t.is(wrapper.prop('style').fontWeight, "bold");
});