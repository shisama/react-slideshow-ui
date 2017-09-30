import test from 'ava';
import React from 'react';
import {configure, shallow} from 'enzyme';
import sinon from 'sinon';
import SlideShow from '../src/SlideShow';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

test("props style", t => {
  const wrapper = shallow(
    <SlideShow
      images={[
        "static/test/page1",
        "static/test/page2",
        "static/test/page3"
      ]}
      style={{width: 100}}
    />
  );
  t.is(wrapper.props().style.width, 100);
});

test("props src", t => {
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
  t.is(wrapper.find(".content").props().src, "static/test/page1");
  t.is(wrapper.find(".content").type(), "img");
  t.is(wrapper.state().src, "static/test/page1");
  t.is(wrapper.state().index, 0);
});

test("props prevIcon", t => {
  const wrapper = shallow(
    <SlideShow
      images={["static/test/page1"]}
      prevIcon={"Left"}
    />
  );
  t.is(wrapper.find(".prevButton").text(), "Left");
});

test("props nextIcon", t => {
  const wrapper = shallow(
    <SlideShow images={["static/test/page1"]} nextIcon="Right"/>
  );
  t.is(wrapper.find(".nextButton").text(), "Right");
});

test("onclick next page event", t => {
  const wrapper = shallow(
    <SlideShow
      images={[
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
  t.is(wrapper.state().progress, 67);

  wrapper.find(".nextButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page3");
  t.is(wrapper.state().src, "static/test/page3");
  t.is(wrapper.state().index, 2);
  t.is(wrapper.state().progress, 100);

  wrapper.find(".nextButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page3");
  t.is(wrapper.state().src, "static/test/page3");
  t.is(wrapper.state().index, 2);
  t.is(wrapper.state().progress, 100);
});

test("onclick prev page event", t => {
  const wrapper = shallow(
    <SlideShow
      images={[
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
  t.is(wrapper.state().progress, 34);

  wrapper.find(".nextButton").simulate("click");
  wrapper.find(".nextButton").simulate("click");
  wrapper.find(".prevButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page2");
  t.is(wrapper.state().src, "static/test/page2");
  t.is(wrapper.state().index, 1);
  t.is(wrapper.state().progress, 67);

  wrapper.find(".prevButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page1");
  t.is(wrapper.state().src, "static/test/page1");
  t.is(wrapper.state().index, 0);
  t.is(wrapper.state().progress, 34);

  wrapper.find(".prevButton").simulate("click");
  t.is(wrapper.find(".content").props().src, "static/test/page1");
  t.is(wrapper.state().src, "static/test/page1");
  t.is(wrapper.state().index, 0);
  t.is(wrapper.state().progress, 34);
});

test("componentWillMount props.src is undefined", t => {
  const wrapper = shallow(
    <SlideShow/>
  );
  t.is(wrapper.find(".content").props().src, "");
  t.is(wrapper.state().src, "");
});

test("componentWillMount props.src is empty", t => {
  const wrapper = shallow(
    <SlideShow images={[]}/>
  );
  t.is(wrapper.find(".content").props().src, "");
  t.is(wrapper.state().src, "");
});

test("componentWillMount props.src is null", t => {
  const wrapper = shallow(
    <SlideShow images={null}/>
  );
  t.is(wrapper.find(".content").props().src, "");
  t.is(wrapper.state().src, "");
});

test("props withTimestamp", t => {
  // to get fake time with sinon when Date.getTime is called.
  const now = new Date();
  const clock = sinon.useFakeTimers(now.getTime());
  const timestamp = Math.floor(now.getTime() / 1000);

  const wrapper = shallow(
    <SlideShow
      images={[
        "static/test/page1",
        "static/test/page2",
        "static/test/page3"
      ]}
      style={{width: 100}}
      withTimestamp={true}
      pageWillUpdate={(index, image) => {console.log(`index: ${index}, image: ${image}`)}}
    />
  );
  t.truthy(wrapper);
  t.is(wrapper.find(".content").props().src, `static/test/page1?${timestamp}`);
  t.is(wrapper.state().src, "static/test/page1");

  // click next button
  wrapper.find(".nextButton").simulate("click");
  t.is(wrapper.find(".content").props().src, `static/test/page2?${timestamp}`);
  t.is(wrapper.state().src, "static/test/page2");

  // click prev button
  wrapper.find(".prevButton").simulate("click");
  t.is(wrapper.find(".content").props().src, `static/test/page1?${timestamp}`);
  t.is(wrapper.state().src, "static/test/page1");

  clock.restore();
});
