import { CSSProperties, useState } from "react";
import UploadUtil from "../../util/upload-util";
import { API } from "../../configs/api-config";

export interface CoverProps {
  background?: boolean;
  src: string;
  size?: 'mini' | 'small' | 'default' | 'large',
  style?: CSSProperties;
}

export default function Cover(props: CoverProps) {
  const [error, setError] = useState(false);
  let width = '7em';
  let height = '9.4em';
  if (props.size === 'mini') {
    width = '3.5em';
    height = '4.7em';
  }
  if (props.size === 'small') {
    width = '5em';
    height = '6.7em';
  }
  if (props.size === 'large') {
    width = '192px';
    height = '264px';
  }
  let realCover = error ? '/assets/empty.png' : UploadUtil.absoluteUrl(API.CoverSource, props.src);
  return (
    <>
      {
        !props.background ?
          <img src={realCover} onError={() => setError(true)} style={props.style} /> :
          <span style={{ backgroundImage: `url(${realCover})` }}></span>
      }
      <style jsx>{`
        img {
          max-width: ${width};
          height: ${height};
        }
        span {
          display: block;
          max-width: ${width};
          height: ${height};
          background-position: left top;
        }
      `}</style>
    </>
  )
}