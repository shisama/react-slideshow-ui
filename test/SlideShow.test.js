import React from 'react';
import {configure, shallow} from 'enzyme';
import SlideShow from '../src/SlideShow';
import Adapter from 'enzyme-adapter-react-16';

import FullscreenIcon from '../src/FullscreenIcon';
import FullscreenButton from '../src/FullscreenButton';

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

test("pass correct props to FullscreenIcon", () => {
  const wrapper = shallow(
    <SlideShow images={[
      "static/test/page1",
      "static/test/page2",
      "static/test/page3"
    ]}
    />
  );
  expect(wrapper.find(FullscreenIcon).props().isFullScreen).toEqual(false);
});

test("props showFullscreenIcon is false", () => {
  const wrapper = shallow(
    <SlideShow
      images={[
        "static/test/page1",
        "static/test/page2",
        "static/test/page3"
      ]}
      showFullscreenIcon={false}
    />
  );
  expect(wrapper.find(FullscreenIcon).exists()).toEqual(false);
  expect(wrapper.find(FullscreenButton).exists()).toEqual(false);
});

test("props showFullscreenIcon is true", () => {
  const wrapper = shallow(
    <SlideShow
      images={[
        "static/test/page1",
        "static/test/page2",
        "static/test/page3"
      ]}
      showFullscreenIcon={true}
    />
  );
  expect(wrapper.find(FullscreenIcon).exists()).toEqual(true);
  expect(wrapper.find(FullscreenButton).exists()).toEqual(true);
});