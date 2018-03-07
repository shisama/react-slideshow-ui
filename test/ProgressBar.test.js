import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProgressBar from '../src/ProgressBar';
import styles from '../src/styles';

configure({adapter: new Adapter()});

test("props progress", () => {
  const progress = 30;
  const wrapper = mount(
    <ProgressBar
      styles={styles}
      progress={progress}
    />
  );
  expect(wrapper.find('div').at(1).props().style.width).toEqual(progress + "%");
});
