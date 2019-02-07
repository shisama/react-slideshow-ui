import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import sinon from 'sinon';
import styles from '../src/styles';
import Viewer from '../src/Viewer';

configure({adapter: new Adapter()});

const _src = 'test/image';
const _timestamp = 1234567890;
const _imgClassName = 'testImage';

describe("Viewer", () => {
  test('props src', () => {
    const wrapper = mount(
      <Viewer
        src={_src}
        styles={styles}
        onClickPrevButton={() => {return}}
        onClickNextButton={() => {return}}
        timestamp={null}
        imgClassName="test"
      />
    );
    expect(wrapper.find("img").props().src).toBe(_src);
  });

  test('props src & timestamp', () => {
    const wrapper = mount(
      <Viewer
        src={_src}
        styles={styles}
        timestamp={_timestamp}
        onClickPrevButton={() => {return}}
        onClickNextButton={() => {return}}
        imgClassName="test"
      />
    );
    expect(wrapper.find("img").props().src).toBe(`${_src}?${_timestamp}`);
  });

  test('props imgClassName', () => {
    const wrapper = mount(
      <Viewer
        src={_src}
        styles={styles}
        timestamp={_timestamp}
        imgClassName={_imgClassName}
        onClickPrevButton={() => {return}}
        onClickNextButton={() => {return}}
      />
    );
    expect(wrapper.find("img").props().className).toBe(_imgClassName);
  });

  test('click props onClickPrevButton', () => {
    const _onClickPrevButton = sinon.spy();
    const wrapper = mount(
      <Viewer
        src={_src}
        styles={styles}
        onClickPrevButton={_onClickPrevButton}
        onClickNextButton={() => {return}}
        timestamp={Math.floor(Date.now() / 1000)}
        imgClassName="test"
      />
    );
    wrapper.find('div').at(1).simulate('click');
    wrapper.find('div').at(1).simulate('click');
    expect(_onClickPrevButton.callCount).toBe(2);
  });

  test('click props onClickPrevButton', () => {
    const _onClickNextButton = sinon.spy();
    const wrapper = mount(
      <Viewer
        styles={styles}
        onClickNextButton={_onClickNextButton}
        src={_src}
        onClickPrevButton={() => {return}}
        timestamp={Math.floor(Date.now() / 1000)}
        imgClassName="test"
      />
    );
    wrapper.find('div').at(2).simulate('click');
    wrapper.find('div').at(2).simulate('click');
    wrapper.find('div').at(2).simulate('click');
    expect(_onClickNextButton.callCount).toBe(3);
  });
});