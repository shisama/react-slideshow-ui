import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import SlideShow from '../src/SlideShow';

import FullscreenButton from '../src/FullscreenButton';
import FullscreenIcon from '../src/FullscreenIcon';
import PagingButton from '../src/PagingButton';
import ProgressBar from '../src/ProgressBar';

configure({adapter: new Adapter()});

describe("SlideShow", () => {
  test("props style", () => {
    const props = {
      images: [
        "static/test/page1",
        "static/test/page2",
        "static/test/page3"
      ],
      style: {width: 100},
      withTimestamp: false,
      pageWillUpdate: () => {return},
      showFullscreenIcon: false,
      className: "test"
    };
    const wrapper = shallow(
      <SlideShow
        {...props}
      />
    );
    expect((wrapper.find("div").at(0).prop("style") as any).width).toBe(100);
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
        withTimestamp={false}
        pageWillUpdate={() => {return}}
        showFullscreenIcon={false}
        className="test"
      />
    );
    expect((wrapper.state() as any).src).toBe("static/test/page1");
    expect((wrapper.state() as any).index).toBe(0);
  });

  test("componentWillMount props.images is empty", () => {
    const wrapper = shallow(
      <SlideShow
        images={[]}
        style={{fontWeight: "bold"}}
        withTimestamp={false}
        pageWillUpdate={() => {return}}
        showFullscreenIcon={false}
        className="test"/>
    );
    expect((wrapper.state() as any).src).toBe("");
  });

  test("props showFullscreenIcon is false", () => {
    const wrapper = shallow(
      <SlideShow
        images={[
          "static/test/page1",
          "static/test/page2",
          "static/test/page3"
        ]}
        style={{fontWeight: "bold"}}
        withTimestamp={false}
        pageWillUpdate={() => {return}}
        showFullscreenIcon={false}
        className="test"
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
        style={{fontWeight: "bold"}}
        withTimestamp={false}
        pageWillUpdate={() => {return}}
        showFullscreenIcon={true}
        className="test"
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
        style={{fontWeight: "bold"}}
        withTimestamp={false}
        pageWillUpdate={() => {return}}
        showFullscreenIcon={true}
        className="test"
      />
    );
    expect((wrapper.state() as any).index).toBe(0);
    wrapper.find(PagingButton).at(1).simulate('click');
    expect((wrapper.state() as any).index).toBe(1);
    wrapper.find(PagingButton).at(1).simulate('click');
    expect((wrapper.state() as any).index).toBe(2);
    wrapper.find(PagingButton).at(0).simulate('click');
    expect((wrapper.state() as any).index).toBe(1);
  });

  test("mousemove on progress bar", () => {
    const wrapper = shallow(
      <SlideShow
        images={[
          "static/test/page1",
          "static/test/page2",
          "static/test/page3"
        ]}
        showFullscreenIcon={true}
        style={{width: 500}}
        withTimestamp={false}
        pageWillUpdate={() => {return}}
        className="test"
      />
    );
    wrapper.find(ProgressBar).simulate('mousemove', {
      clientX: 690,
      currentTarget: {
        parentElement: {
          children: [
            {
              offsetWidth: 400
            }
          ]
        },
        getBoundingClientRect: () => {
          return {
            left: 600
          }
        }
      }
    });
    expect((wrapper.state() as any).previewIndex).toBe(0);

    wrapper.find(ProgressBar).simulate('mousemove', {
      clientX: 690,
      currentTarget: {
        parentElement: {
          children: [
            {
              offsetWidth: 400
            }
          ]
        },
        getBoundingClientRect: () => {
          return {
            left: 100
          }
        }
      }
    });
    expect((wrapper.state() as any).previewIndex).toBe(2);
  });
});