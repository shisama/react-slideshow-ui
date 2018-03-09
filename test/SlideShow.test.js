import React from 'react';
import {configure, shallow} from 'enzyme';
import SlideShow from '../src/SlideShow';
import Adapter from 'enzyme-adapter-react-16';

import FullscreenIcon from '../src/FullscreenIcon';
import FullscreenButton from '../src/FullscreenButton';
import PagingButton from '../src/PagingButton';

configure({adapter: new Adapter()});

describe("SlideShow", () => {
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
    expect(wrapper.find("div").at(0).prop("style").width).toBe(100);
    props.style = Object.assign({}, props.style, {width: 80});
    wrapper.setProps(props);
    // style object must be immutable
    expect(wrapper.find("div").at(0).prop("style").width).toBe(100);
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
    expect(wrapper.state().src).toBe("static/test/page1");
    expect(wrapper.state().index).toBe(0);
  });
  test("componentWillMount props.images is undefined", () => {
    const wrapper = shallow(
      <SlideShow/>
    );
    expect(wrapper.state().src).toBe("");
  });

  test("componentWillMount props.images is empty", () => {
    const wrapper = shallow(
      <SlideShow images={[]}/>
    );
    expect(wrapper.state().src).toBe("");
  });

  test("props images is null", () => {
    const wrapper = shallow(
      <SlideShow images={null}/>
    );
    expect(wrapper.state().src).toBe("");
  });

  test("pass isFullScreen to FullscreenIcon", () => {
    const wrapper = shallow(
      <SlideShow images={[
        "static/test/page1",
        "static/test/page2",
        "static/test/page3"
      ]}
      />
    );
    expect(wrapper.find(FullscreenIcon).props().isFullScreen).toBeFalsy();
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
    expect(wrapper.find(FullscreenIcon).exists()).toBeFalsy();
    expect(wrapper.find(FullscreenButton).exists()).toBeFalsy();
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
    expect(wrapper.find(FullscreenIcon).exists()).toBeTruthy();
    expect(wrapper.find(FullscreenButton).exists()).toBeTruthy();
  });

  test("click button to move page", () => {
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
    expect(wrapper.state().index).toBe(0);
    wrapper.find(PagingButton).at(1).simulate('click');
    expect(wrapper.state().index).toBe(1);
    wrapper.find(PagingButton).at(1).simulate('click');
    expect(wrapper.state().index).toBe(2);
    wrapper.find(PagingButton).at(0).simulate('click');
    expect(wrapper.state().index).toBe(1);
  });
});