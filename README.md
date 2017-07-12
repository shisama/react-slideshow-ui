# React SlideShow UI

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/shisama/react-slideshow/blob/master/LICENSE)

React UI Component for slideshow like [SlideShare](https://www.slideshare.net/) or [SpeakerDeck](https://speakerdeck.com/).

[Demo](https://shisama.github.io/react-slideshow-ui/demo/)(Updated with every release)

## Installation
```
npm install --save react-slideshow-ui
```

## Usage
```javascript
import React from 'react';
import {render} from 'react-dom';
import SlideShow from 'react-slideshow';

class App extends React.Component {
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

```

## Props

|name|type|reqired|description|
|----|----|-------|-----------|
|style|Object|Yes|style of this component.|
|images|Array<string>|Yes|url of image for slide.|
|prevIcon|Node|No|icon for button to move previous page.|
|nextIcon|Node|No|icon for button to move next page.|
|withTimestamp|boolean|No|if you want to add unixtime to img url. i.e. `example.png?1483228800`|
|pageWillUpdate|function|No|function that is emitted when moving page.|

## License
This project is licensed under the terms of the
[MIT license](https://github.com/shisama/react-slideshow/blob/master/LICENSE)