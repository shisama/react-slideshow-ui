import test from 'ava';
import React from 'react';
import {configure, shallow} from 'enzyme';
import sinon from 'sinon';
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
  t.is(wrapper.find("div").at(0).prop("style").width, 80);
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

test("re-render should run", (t) => {
  const spy = sinon.spy(SlideShow.prototype, "render");
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
  t.is(SlideShow.prototype.render.callCount, 1);
  wrapper.setProps(Object.assign(props.style, {width: 80}));
  t.is(wrapper.find("div").at(0).prop("style").width, 80);
  t.is(SlideShow.prototype.render.callCount, 2);
  wrapper.setProps(Object.assign(props.style, {width: 80}));
  t.is(wrapper.find("div").at(0).prop("style").width, 80);
  t.is(SlideShow.prototype.render.callCount, 2);

  spy.restore();
});
