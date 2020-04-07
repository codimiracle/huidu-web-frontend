import React from 'react';
import { Category } from '../types/category';
import ExhibitionRankingAsideView from './exhibition-ranks-aside-view';
import { Book, BookType } from '../types/book';
import BookRankItem from './book-rank-item';
import BookPreviewView from './book-preview-view';
import BookMiniView from './book-mini-view';

export interface BookRankViewProps {
  category: Category;
  type?: BookType;
};
export interface BookRankViewState { };

export default class BookRankView extends React.Component<BookRankViewProps, BookRankViewState> {
  render() {
    const { category } = this.props;
    return (
      <>
        <ExhibitionRankingAsideView<Book>
          category={category}
          getRequestExtraArgument={() => ({
            type: this.props.type ? [this.props.type] : []
          })}
          renderItem={(item, index, selected) => <BookRankItem book={item} rank={index + 1} selected={selected} />}
          renderPreview={(item) => <BookMiniView book={item} />}
        />
      </>
    )
  }
}