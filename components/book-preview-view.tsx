import Link from 'next/link';
import React from 'react';
import { API } from '../configs/api-config';
import { Book, BookPreview } from '../types/book';
import UploadUtil from '../util/upload-util';

const EMPTY_IMAGE = '/assets/empty.png';

export interface BookPreviewViewProps {
  book: Book
};
export interface BookPreviewViewState { };

export default class BookPreviewView extends React.Component<BookPreviewViewProps, BookPreviewViewState> {
  render() {
    const { book } = this.props;
    const href = `/bookshop/${book.type}s/[book_id]`;
    const asPath = `/bookshop/${book.type}s/${book.id}`;
    const bookPreview = BookPreview.valueOf(book);
    return (
      <div className="book-preview-view">
        <img src={UploadUtil.absoluteUrl(API.CoverSource, bookPreview.cover) || EMPTY_IMAGE} />
        <div className="body">
          <div><Link href={href} as={asPath}><a><strong>{bookPreview.name}</strong></a></Link> <span>{bookPreview.author}</span></div>
          <p title={bookPreview.description}>{bookPreview.description}</p>
        </div>
        <style jsx>{`
        .book-preview-view {
          display: flex;
          max-height: 256px;
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
          width: 68px;
          height: 92px;
        }
      `}</style>
      </div>
    )
  }
}