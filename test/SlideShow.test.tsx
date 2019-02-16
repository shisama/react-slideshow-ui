import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import React from "react";
import renderer from "react-test-renderer";
import SlideShow from "../src/SlideShow";

import PagingButton from "../src/PagingButton";
import ProgressBar from "../src/ProgressBar";

configure({ adapter: new Adapter() });

describe("SlideShow", () => {
  test("props style", () => {
    const props = {
      images: ["static/test/page1", "static/test/page2", "static/test/page3"],
      style: { width: 100 },
      withTimestamp: false,
      pageWillUpdate: () => {
        return;
      },
      showFullscreenIcon: false,
      className: "test"
    };
    const tree = renderer.create(<SlideShow {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("props images", () => {
    const tree = renderer
      .create(
        <SlideShow
          images={[
            "static/test/page1",
            "static/test/page2",
            "static/test/page3"
          ]}
          style={{ fontWeight: "bold" }}
          withTimestamp={false}
          pageWillUpdate={() => {
            return;
          }}
          showFullscreenIcon={false}
          className="test"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("componentWillMount props.images is empty", () => {
    const tree = renderer
      .create(
        <SlideShow
          images={[]}
          style={{ fontWeight: "bold" }}
          withTimestamp={false}
          pageWillUpdate={() => {
            return;
          }}
          showFullscreenIcon={false}
          className="test"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("props showFullscreenIcon is false", () => {
    const tree = renderer
      .create(
        <SlideShow
          images={[
            "static/test/page1",
            "static/test/page2",
            "static/test/page3"
          ]}
          style={{ fontWeight: "bold" }}
          withTimestamp={false}
          pageWillUpdate={() => {
            return;
          }}
          showFullscreenIcon={false}
          className="test"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("props showFullscreenIcon is true", () => {
    const tree = renderer
      .create(
        <SlideShow
          images={[
            "static/test/page1",
            "static/test/page2",
            "static/test/page3"
          ]}
          style={{ fontWeight: "bold" }}
          withTimestamp={false}
          pageWillUpdate={() => {
            return;
          }}
          showFullscreenIcon={true}
          className="test"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("click button to move page", () => {
    const wrapper = shallow(
      <SlideShow
        images={["static/test/page1", "static/test/page2", "static/test/page3"]}
        style={{ fontWeight: "bold" }}
        withTimestamp={false}
        pageWillUpdate={() => {
          return;
        }}
        showFullscreenIcon={true}
        className="test"
      />
    );
    wrapper
      .find(PagingButton)
      .at(1)
      .simulate("click");
    wrapper
      .find(PagingButton)
      .at(1)
      .simulate("click");
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test("mousemove on progress bar", () => {
    const wrapper = shallow(
      <SlideShow
        images={["static/test/page1", "static/test/page2", "static/test/page3"]}
        showFullscreenIcon={true}
        style={{ width: 500 }}
        withTimestamp={false}
        pageWillUpdate={() => {
          return;
        }}
        className="test"
      />
    );
    wrapper.find(ProgressBar).simulate("mousemove", {
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
          };
        }
      }
    });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  test("mousemove on progress bar2", () => {
    const wrapper = shallow(
      <SlideShow
        images={["static/test/page1", "static/test/page2", "static/test/page3"]}
        showFullscreenIcon={true}
        style={{ width: 500 }}
        withTimestamp={false}
        pageWillUpdate={() => {
          return;
        }}
        className="test"
      />
    );
    wrapper.find(ProgressBar).simulate("mousemove", {
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
          };
        }
      }
    });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
