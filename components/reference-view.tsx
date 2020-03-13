import { CSSProperties } from "react";
import { Book, BookPreview } from "../types/book";
import { Content, ContentType, Reference, Article } from "../types/content";
import ContentView from "./content-view";


interface BookReferenceViewProps {
  book: Book
}

const EMPTY_IMAGE = '/assets/empty.png';

function BookReferenceView(props: BookReferenceViewProps) {
  const { book } = props;
  const bookPreview = BookPreview.valueOf(book);
  return (
    <div className="book-reference-view">
      <img src={bookPreview.cover || EMPTY_IMAGE} />
      <div className="body">
        <div><strong>{bookPreview.name}</strong> <span>{bookPreview.author}</span></div>
        <p title={bookPreview.description}>{bookPreview.description}</p>
      </div>
      <style jsx>{`
        .book-reference-view {
          display: flex;
        }
        .body {
          display: flex;
          padding-left: 0.5em;
          flex-direction: column;
        }
        p {
          flex: 1;

          max-height: 3em;
          word-break: break-all;
          overflow: hidden;
        }
        img {
          width: 3.5em;
          height: 4.7em;
        }
      `}</style>
    </div>
  )
}

export interface ReferenceViewProps {
  references: Array<Reference<Content>>,
  style?: CSSProperties
}

export default function ReferenceView(props: ReferenceViewProps) {
  const { references, style } = props;
  let renderringReferences = references || [];
  let renderringReference = renderringReferences.length > 0 ? renderringReferences[0] : null;
  return (
    <>
      <div className="reference-displayer" style={style}>
        {
          renderringReference &&
          <div className="container">
            {
              renderringReference.type !== ContentType.Book &&
              <ContentView content={renderringReference.ref as Article} />
            }
            {
              renderringReference.type === ContentType.Book &&
              <BookReferenceView book={renderringReference.ref as Book} />
            }
          </div>
        }
      </div>
      <style jsx>{`
        .container {
          display: inline-block;
          border-radius: 4px;
          padding: 16px;
          background-color: #f2f2f2;
        }
      `}</style>
      <style jsx global>{`
        .reference-displayer .ant-comment-inner {
          padding: 0px;
        }
      `}</style>
    </>
  );
}