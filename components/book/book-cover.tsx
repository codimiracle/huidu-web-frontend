import { Book, BookPreview } from "../../types/book";

export interface BookCoverProps {
  book: Book;
  size?: 'small' | 'default' | 'large'
}

export default function BookCover(props: BookCoverProps) {
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
  return (
    <>
      <img src={bookPreview.cover}/>
      <style jsx>{`
        img {
          max-width: ${width};
          height: ${height};
        }
      `}</style>
    </>
  )
}