import { message, Select, Spin } from 'antd';
import React from 'react';
import { API } from '../../../configs/api-config';
import { ListJSON } from '../../../types/api';
import { Book, BookPreview } from '../../../types/book';
import { fetchDataByGet } from '../../../util/network-util';
import BookPreviewView from '../../book-preview-view';

export interface BookSelectProps {
  initialBook?: Book;
  value?: string;
  onChange?: (value: string) => void;
};
export interface BookSelectState {
  list: Array<Book>;
  fetching: boolean;
};

export default class BookSelect extends React.Component<BookSelectProps, BookSelectState> {
  constructor(props: BookSelectProps) {
    super(props);
    this.state = {
      list: props.initialBook ? [props.initialBook] : [],
      fetching: false
    }
  }
  fetchBook(keyword: string) {
    this.setState({ fetching: true });
    fetchDataByGet<ListJSON<Book>>(API.BackendBookSuggestion, {
      keyword: keyword
    }).then((data) => {
      this.setState({ list: data.list });
    }).catch((err) => {
      message.error(`读取书籍数据失败：${err}`)
    }).finally(() => {
      this.setState({ fetching: false });
    });
  }
  fireChange(selectedValue) {
    const { onChange } = this.props;
    onChange && onChange(selectedValue);
  }
  render() {
    const { list, fetching } = this.state;
    return (
      <Select
        placeholder="搜索选择书籍"
        loading={this.state.fetching}
        value={this.props.value}
        showSearch
        filterOption={false}
        optionLabelProp="label"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        onSearch={(value) => this.fetchBook(value)}
        onSelect={(value) => this.fireChange(value)}
        style={{ minWidth: '256px' }}
      >
        {
          list.map((book) => {
            let bookPreview = BookPreview.valueOf(book);
            return (
              <Select.Option key={book.id} value={book.id} label={<span><strong>{bookPreview.name}</strong> {bookPreview.author}</span>}>
                <BookPreviewView book={book} />
              </Select.Option>
            )
          })
        }
      </Select>
    )
  }
}