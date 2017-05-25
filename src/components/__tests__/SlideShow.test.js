import test from "ava";
import React from "react";
import {shallow, mount} from "enzyme";
import SlideShow from "../SlideShow";

test("pass styles to SlideShow", t => {
  const wrapper = shallow(
    <SlideShow
       src={[
         "static/test/page1",
         "static/test/page2",
         "static/test/page3"
       ]}
      style={{width: 100}}
    />
  );
  t.is(wrapper.props().style.width, 100);
});

test("pass src to SlideShow", t => {
  const wrapper = shallow(
    <SlideShow
      src={[
        "static/test/page1",
        "static/test/page2",
        "static/test/page3"
      ]}
      style={{fontWeight: "bold"}}
    />
  );
  t.truthy(wrapper);
  t.is(wrapper.find(".content").props().src, "static/test/page1");
  t.is(wrapper.find(".content").type(), "img");
  t.is(wrapper.state().src, "static/test/page1");
  t.is(wrapper.state().index, 0);
});

test("onclick next page event", t => {
  const wrapper = shallow(
    <SlideShow
      src={[
        "static/test/page1",
        "static/test/page2",
        "static/test/page3"
      ]}
      />
  );
  t.truthy(wrapper);
  wrapper.find(".nextButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page2");
  t.is(wrapper.state().src, "static/test/page2");
  t.is(wrapper.state().index, 1);

  wrapper.find(".nextButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page3");
  t.is(wrapper.state().src, "static/test/page3");
  t.is(wrapper.state().index, 2);

  wrapper.find(".nextButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page3");
  t.is(wrapper.state().src, "static/test/page3");
  t.is(wrapper.state().index, 2);
});


test("onclick prev page event", t => {
  const wrapper = shallow(
    <SlideShow
      src={[
        "static/test/page1",
        "static/test/page2",
        "static/test/page3"
      ]}
    />
  );
  t.truthy(wrapper);
  wrapper.find(".prevButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page1");
  t.is(wrapper.state().src, "static/test/page1");
  t.is(wrapper.state().index, 0);

  wrapper.find(".nextButton").simulate("click");
  wrapper.find(".nextButton").simulate("click");
  wrapper.find(".prevButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page2");
  t.is(wrapper.state().src, "static/test/page2");
  t.is(wrapper.state().index, 1);

  wrapper.find(".prevButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page1");
  t.is(wrapper.state().src, "static/test/page1");
  t.is(wrapper.state().index, 0);

  wrapper.find(".prevButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page1");
  t.is(wrapper.state().src, "static/test/page1");
  t.is(wrapper.state().index, 0);
});

test("componentWillMount props.src is undefined", t => {
  const wrapper = shallow(
    <SlideShow/>
  );
  t.is(wrapper.find(".content").props().src, "");
  t.is(wrapper.state().src, "");
});