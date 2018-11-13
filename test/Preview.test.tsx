import * as React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Preview from '../src/Preview';

configure({adapter: new Adapter()});

describe("Preview", () => {
  test("preview index props", () => {
    const wrapper = mount(
      <Preview
        images={[
          "test/image1.png",
          "test/image2.png",
          "test/image3.png"
        ]}
        previewIndex={0}
        isFullScreen={false}
        opacity={1}
        imgClassName="test"
      />
    );
    expect(wrapper.find('p').text()).toBe('1 / 3');

    wrapper.setProps({previewIndex: 1});
    expect(wrapper.find('p').text()).toBe('2 / 3');

    wrapper.setProps({previewIndex: 2});
    expect(wrapper.find('p').text()).toBe('3 / 3');
  });
});
