import * as React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FullscreenIcon from '../src/FullscreenIcon';

configure({adapter: new Adapter()});

describe('FullscreenIcon', () => {
  test('props isFullScreen false', () => {
    const wrapper = mount(
      <FullscreenIcon isFullScreen={false}/>
    );
    expect(wrapper.find('svg').prop('id')).toBe('fullscreen');
  });
  test('props isFullScreen true', () => {
    const wrapper = mount(
      <FullscreenIcon isFullScreen={true}/>
    );
    expect(wrapper.find('svg').prop('id')).toBe('no-fullscreen');
  });
});