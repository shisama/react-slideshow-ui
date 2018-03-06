import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Viewer from '../src/Viewer';
import styles from '../src/styles';
import sinon from 'sinon';

configure({adapter: new Adapter()});

const _src = 'test/image';
const _timestamp = 1234567890;
const _imgClassName = 'testImage';

test('props src', () => {
  const wrapper = mount(
    <Viewer
      src={_src}
      styles={styles}
    />
  );
  expect(wrapper.find("img").props().src).toEqual(_src);
});

test('props src & timestamp', () => {
  const wrapper = mount(
    <Viewer
      src={_src}
      styles={styles}
      timestamp={_timestamp}
    />
  );
  expect(wrapper.find("img").props().src).toEqual(`${_src}?${_timestamp}`);
});

test('props imgClassName', () => {
  const wrapper = mount(
    <Viewer
      src={_src}
      styles={styles}
      timestamp={_timestamp}
      imgClassName={_imgClassName}
    />
  );
  expect(wrapper.find("img").props().className).toEqual(_imgClassName);
});

test('click props onClickPrevButton', () => {
  const _onClickPrevButton = sinon.spy();
  const wrapper = mount(
    <Viewer
      styles={styles}
      onClickPrevButton={_onClickPrevButton}
    />
  );
  wrapper.find('div').at(1).simulate('click');
  wrapper.find('div').at(1).simulate('click');
  expect(_onClickPrevButton.callCount).toEqual(2);
});

test('click props onClickPrevButton', () => {
  const _onClickNextButton = sinon.spy();
  const wrapper = mount(
    <Viewer
      styles={styles}
      onClickNextButton={_onClickNextButton}
    />
  );
  wrapper.find('div').at(2).simulate('click');
  wrapper.find('div').at(2).simulate('click');
  wrapper.find('div').at(2).simulate('click');
  expect(_onClickNextButton.callCount).toEqual(3);
});