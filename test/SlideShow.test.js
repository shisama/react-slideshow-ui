import test from 'ava';
import React from 'react';
import {configure, shallow} from 'enzyme';
import SlideShow from '../src/SlideShow';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test("props style", t => {
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
  t.is(wrapper.find("div").at(0).prop("style").width, 100);
  props.style = Object.assign({}, props.style, {width: 80});
  wrapper.setProps(props);
  // style object must be immutable
  t.is(wrapper.find("div").at(0).prop("style").width, 100);
});

test("props images", t => {
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
  t.truthy(wrapper);
  t.is(wrapper.state().src, "static/test/page1");
  t.is(wrapper.state().index, 0);
});
test("componentWillMount props.src is undefined", t => {
  const wrapper = shallow(
    <SlideShow/>
  );
  t.is(wrapper.state().src, "");
});

test("componentWillMount props.src is empty", t => {
  const wrapper = shallow(
    <SlideShow images={[]}/>
  );
  t.is(wrapper.state().src, "");
});

test("componentWillMount props.src is null", t => {
  const wrapper = shallow(
    <SlideShow images={null}/>
  );
  t.is(wrapper.state().src, "");
});
