import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProgressBar from '../src/ProgressBar';
import styles from '../src/styles';
import sinon from 'sinon';

configure({adapter: new Adapter()});

const progress = 30;

describe("ProgressBar", () => {
  test("props progress", () => {
    const wrapper = mount(
      <ProgressBar
        style={styles}
        progress={progress}
        onClick={() => {return}}
        onMouseMove={() => {return}}
        onMouseLeave={() => {return}}
      />
    );
    expect(wrapper.find('div').at(1).props().style.width).toBe(progress + "%");
  });

  test("click event", () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <ProgressBar
        style={styles}
        progress={progress}
        onClick={spy}
        onMouseMove={() => {return}}
        onMouseLeave={() => {return}}
      />
    );
    expect(spy.called).toBe(false);
    wrapper.find('div').at(0).simulate('click');
    wrapper.find('div').at(0).simulate('click');
    expect(spy.callCount).toBe(2);
  });

  test("mousemove event", () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <ProgressBar
        style={styles}
        progress={progress}
        onMouseMove={spy}
        onClick={() => {return}}
        onMouseLeave={() => {return}}
      />
    );
    expect(spy.called).toBe(false);
    wrapper.find('div').at(0).simulate('mousemove');
    expect(spy.called).toBe(true);
  });

  test("mouseleave event", () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <ProgressBar
        style={styles}
        progress={progress}
        onMouseLeave={spy}
        onMouseMove={() => {return}}
        onClick={() => {return}}
      />
    );
    expect(spy.called).toBeFalsy();
    wrapper.find('div').at(0).simulate('mouseleave');
    expect(spy.called).toBeTruthy();
  });
});