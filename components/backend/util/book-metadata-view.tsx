import { BookMetadata } from "../../../types/book";

const EMPTY_IMAGE = '/assets/empty.png';

export interface BookMetadataProps {
  metadata: BookMetadata
}

export function BookMetadataView(props: BookMetadataProps) {
  const { metadata } = props;
  return (
    <div className="book-metadata-view">
      <img src={metadata.cover || EMPTY_IMAGE} />
      <div className="body">
        <div><strong>{metadata.name}</strong> <span>{metadata.author}</span></div>
        <p>{metadata.description}</p>
      </div>
      <style jsx>{`
        .book-metadata-view {
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
  );
}
