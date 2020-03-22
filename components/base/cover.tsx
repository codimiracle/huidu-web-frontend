import { CSSProperties, useState } from "react";

export interface CoverProps {
  src: string;
  size?: 'small' | 'default' | 'large',
  style?: CSSProperties;
}

export default function Cover(props: CoverProps) {
  const [error, setError ] = useState(false);
  let width = '7em';
  let height = '9.4em';
  if (props.size === 'small') {
    width = '5em';
    height = '6.7em';
  }
  if (props.size === 'large') {
    width = '192px';
    height = '264px';
  }
  let realCover = error ? '/assets/empty.png' : props.src;
  return (
    <>
      <img src={realCover} onError={() => setError(true)} style={props.style}/>
      <style jsx>{`
        img {
          max-width: ${width};
          height: ${height};
        }
      `}</style>
    </>
  )
}