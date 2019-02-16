import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import FullscreenIcon from "../src/FullscreenIcon";

configure({ adapter: new Adapter() });

describe("FullscreenIcon", () => {
  test("props isFullScreen false", () => {
    const wrapper = shallow(<FullscreenIcon isFullScreen={false} />);
    expect(wrapper.find("svg").prop("id")).toBe("fullscreen");
  });
  test("props isFullScreen true", () => {
    const wrapper = shallow(<FullscreenIcon isFullScreen={true} />);
    expect(wrapper.find("svg").prop("id")).toBe("no-fullscreen");
  });
});
