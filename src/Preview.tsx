import * as React from 'react';

type Props = {
  images: string[],
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
 * @return {React.ReactNode}
 */
const Preview = ({
  images,
  imgClassName,
  isFullScreen,
  opacity,
  previewIndex,
}: Props) => {
  if (!images || images.length === 0) {
    return null;
  }
  const previews: React.ReactNode[] = images.map((img, index) => {
    const display: string = index === previewIndex ? 'inline' : 'none';
    const key: string = `preview-${index}`;
    return (
      <img
        className={key}
        style={{display, width: 200}}
        src={img}
        key={key}
      />
    );
  });

  let fullscreenBottom: number = 120;
  const imgView: HTMLElement | null = document.querySelector(imgClassName);
  if (imgView) {
    fullscreenBottom = window.screen.availHeight - imgView.offsetHeight + 30;
  }
  const bottom: number = isFullScreen ? fullscreenBottom : PREVIEW.bottom;
  const style = Object.assign({}, PREVIEW, {
    opacity,
    bottom,
  });
  return (
    <div style={style}>
      {previews}
      <p style={{margin: 0, textAlign: 'center', fontSize: 4}}>
        {`${previewIndex + 1} / ${images.length}`}
      </p>
    </div>
  );
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  if (prevProps.images.length !== nextProps.images.length) {
    return false;
  }
  for (let i = 0; i < prevProps.images.length; i++) {
    const prevImage = prevProps.images[i];
    const nextImage = nextProps.images[i];
    if (prevImage !== nextImage) {
      return false;
    }
  }
  return (
    prevProps.imgClassName === nextProps.imgClassName &&
    prevProps.isFullScreen === nextProps.isFullScreen &&
    prevProps.opacity === nextProps.opacity &&
    prevProps.previewIndex === nextProps.opacity
  );
}

export default React.memo(Preview, areEqual);