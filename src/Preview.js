import * as React from 'react';
import {pure} from 'recompose';

const PREVIEW = {
  position: 'absolute',
  zIndex: 1,
  bottom: 50,
  opacity: 0,
  left: '50%',
  marginLeft: -100,
  backgroundColor: '#323232',
  color: '#fff',
  border: '3px solid #323232',
  borderRadius: '3px',
};

/**
 *
 * @param props
 * @return {XML}
 */
export default pure(function({
  images,
  imgClassName,
  isFullScreen,
  opacity,
  previewIndex,
}) {
  if (!images || images.length === 0) {
    return null;
  }
  let previews = images.map((img, index) => {
    const display = index === previewIndex ? 'inline' : 'none';
    const key = `preview-${index}`;
    return (
      <img
        className={key}
        style={{display: display, width: 200}}
        src={img}
        key={key}
      />
    );
  });

  let fullscreenBottom = 120;
  const imgView = document.querySelector(imgClassName);
  if (imgView) {
    fullscreenBottom = window.screen.availHeight - imgView.offsetHeight + 30;
  }
  const bottom = isFullScreen ? fullscreenBottom : PREVIEW.bottom;
  const style = Object.assign({}, PREVIEW, {
    opacity: opacity,
    bottom: bottom,
  });
  return (
    <div style={style}>
      {previews}
      <p style={{margin: 0, textAlign: 'center', fontSize: 4}}>
        {`${previewIndex + 1} / ${images.length}`}
      </p>
    </div>
  );
});
