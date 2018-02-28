import React from 'react';
import {configure, shallow} from 'enzyme';
import SlideShow from '../src/SlideShow';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test("props style", () => {
  const props = {
    images: [
      "static/test/page1",
      "static/test/page2",
      "static/test/page3"
    ],
    style: {width: 100}
  };
  const wrapper = shallow(
    <SlideShow
      {...props}
    />
  );
  expect(wrapper.find("div").at(0).prop("style").width).toEqual(100);
  props.style = Object.assign({}, props.style, {width: 80});
  wrapper.setProps(props);
  // style object must be immutable
  expect(wrapper.find("div").at(0).prop("style").width).toEqual(100);
});

test("props images", () => {
  const wrapper = shallow(
    <SlideShow
      images={[
        "static/test/page1",
        "static/test/page2",
        "static/test/page3"
      ]}
      style={{fontWeight: "bold"}}
    />
  );
  expect(wrapper.state().src).toEqual("static/test/page1");
  expect(wrapper.state().index).toEqual(0);
});
test("componentWillMount props.images is undefined", () => {
  const wrapper = shallow(
    <SlideShow/>
  );
  expect(wrapper.state().src).toEqual("");
});

test("componentWillMount props.images is empty", () => {
  const wrapper = shallow(
    <SlideShow images={[]}/>
  );
  expect(wrapper.state().src).toEqual("");
});

test("componentWillMount props.images is null", () => {
  const wrapper = shallow(
    <SlideShow images={null}/>
  );
  expect(wrapper.state().src).toEqual("");
});
