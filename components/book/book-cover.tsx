import { Book, BookPreview } from "../../types/book";
import { useState, CSSProperties } from "react";

export interface BookCoverProps {
  book: Book;
  size?: 'small' | 'default' | 'large',
  style?: CSSProperties;
}

export default function BookCover(props: BookCoverProps) {
  const [error, setError ] = useState(false);
  let bookPreview = BookPreview.valueOf(props.book);
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
  let realCover = error ? '/assets/empty.png' : bookPreview.cover;
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