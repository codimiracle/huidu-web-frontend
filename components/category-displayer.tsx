import React from 'react';
import { Category } from '../types/category';
import Link from 'next/link';
import UploadUtil from '../util/upload-util';
import { API } from '../configs/api-config';

export interface CategoryViewProps {
  album: boolean
  category: Category
};
export interface CategoryViewState { };

export default class CategoryView extends React.Component<CategoryViewProps, CategoryViewState> {
  render() {
    const { category, album } = this.props;
    return (
      <div className="album">
        <Link href={`/categories/${category.id}`}>
          <a>
            {album && <img width="212px" height="343px" src={UploadUtil.absoluteUrl(API.UploadSource, category.extra.url)} />}
            <strong>{category.name}</strong>
          </a>
        </Link>
        <style jsx>{`
          .album {
            border-radius: 4px;
            text-align: center;
          }
          img {
            background-color: #f1f1f1;
            box-shadow: 0 0 4px 0 grey;
          }
          strong {
            display: block;
            padding-top: 16px;
          }
        `}</style>
      </div>
    )
  }
}