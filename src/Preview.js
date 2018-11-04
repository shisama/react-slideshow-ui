// @flow
import * as React from 'react';
import {pure} from 'recompose';

type Props = {
  images: Array<string>,
  imgClassName: string,
  isFullScreen: boolean,
  opacity: number,
  previewIndex: number,
};

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
export default pure<Props>(function({
  images,
  imgClassName,
  isFullScreen,
  opacity,
  previewIndex,
}: Props) {
  if (!images || images.length === 0) {
    return null;
  }
  const previews: Array<React.Node> = images.map((img, index) => {
    const display: string = index === previewIndex ? 'inline' : 'none';
    const key: string = `preview-${index}`;
    return (
      <img
        className={key}
        style={{display: display, width: 200}}
        src={img}
        key={key}
      />
    );
  });

  let fullscreenBottom: number = 120;
  const imgView: ?HTMLElement = document.querySelector(imgClassName);
  if (imgView) {
    fullscreenBottom = window.screen.availHeight - imgView.offsetHeight + 30;
  }
  const bottom: number = isFullScreen ? fullscreenBottom : PREVIEW.bottom;
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
