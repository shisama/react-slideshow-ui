import React from 'react';
import {render} from 'react-dom';
import SlideShow from '../SlideShow';

/**
 * entry point class for demo
 */
class App extends React.Component {
  /**
   * rendering view
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <SlideShow
          style={{width: 400}}
          images={[
            './img/example1.png',
            './img/example2.png',
            './img/example3.png',
          ]}
          withTimestamp={true}
          pageWillUpdate={(index, image) => {
            console.log(`Page Update! index: ${index}, image: ${image}`);
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('slideshow'));
