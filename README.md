# React SlideShow UI

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/shisama/react-slideshow/blob/master/LICENSE)
[![Join the chat at https://gitter.im/shisama/react-slideshow-ui](https://badges.gitter.im/shisama/react-slideshow-ui.svg)](https://gitter.im/shisama/react-slideshow-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<a href="https://david-dm.org/shisama/react-slideshow-ui/"><img src="https://david-dm.org/shisama/react-slideshow-ui.svg" alt="Dependency Status"></a>
<a href="https://david-dm.org/shisama/react-slideshow-ui/?type=dev"><img src="https://david-dm.org/shisama/react-slideshow-ui/dev-status.svg" alt="devDependency Status"></a>
[![npm](https://img.shields.io/npm/dt/react-slideshow-ui.svg)](https://www.npmjs.com/package/react-slideshow-ui)

React UI Component for slideshow like [SlideShare](https://www.slideshare.net/) or [SpeakerDeck](https://speakerdeck.com/).

[![NPM](https://nodei.co/npm/react-slideshow-ui.png?downloads=true&stars=true)](https://nodei.co/npm/react-slideshow-ui/) 

![React SlideShow](https://github.com/shisama/react-slideshow-ui/raw/master/screenshot.png) 

## [Demo](https://shisama.github.io/react-slideshow-ui/demo/)(Updated with every release)

## Installation
```
npm install --save react-slideshow-ui
```

## Usage
```javascript
import React from 'react';
import {render} from 'react-dom';
import SlideShow from 'react-slideshow-ui';

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
|images|Array\<string\>|Yes|url strings of images for slide.|
|prevIcon|Dom|No|icon for button to move previous page.|
|nextIcon|Dom|No|icon for button to move next page.|
|withTimestamp|boolean|No|set true if you want to add timestamp to img url. i.e. `example.png?1483228800`|
|pageWillUpdate|function|No|function that is invoked when the page is turned over.|

## Browser Support
Chrome@latest
Firefox@latest
Safari@latest
IE11

## License
This project is licensed under the terms of the
[MIT license](https://github.com/shisama/react-slideshow/blob/master/LICENSE)
