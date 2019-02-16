import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import sinon from "sinon";
import FullscreenButton from "../src/FullscreenButton";

configure({ adapter: new Adapter() });

describe("FullscreenButton", () => {
  test("click event", () => {
    const spy = sinon.spy();
    const wrapper = shallow(<FullscreenButton onClick={spy} />);
    expect(spy.called).toBeFalsy();
    wrapper.find("button").simulate("click");
    wrapper.find("button").simulate("click");
    wrapper.find("button").simulate("click");
    expect(spy.callCount).toBe(3);
  });
});
