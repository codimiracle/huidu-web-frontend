import { Button, message, Rate } from 'antd';
import React from 'react';
import { API } from '../configs/api-config';
import { ElectronicBook } from '../types/electronic-book';
import { fetchMessageByPost } from '../util/network-util';
import { Row, Col } from 'antd';
import book from './book';
import BookCover from './book/book-cover';
import BookHeader from './book/book-header';
import BookDescription from './book/book-description';
import LoginRequiredView from './user/login-required-view';


export interface ElectronicBookMiniViewProps {
  id?: string,
  book?: ElectronicBook
};
export interface ElectronicBookMiniViewState {
  book: ElectronicBook,
  joining: boolean,
  joined: boolean
};

export default class ElectronicBookMiniView extends React.Component<ElectronicBookMiniViewProps, ElectronicBookMiniViewState> {
  constructor(props: ElectronicBookMiniViewProps) {
    super(props);
    this.state = {
      book: props.book,
      joined: props.book && props.book.joinedShelf,
      joining: false
    };
  }
  componentDidUpdate() {
    if (this.props.book.joinedShelf && !this.state.joined) {
      this.setState({ joined: this.props.book.joinedShelf });
    }
  }
  private onJoinShelfClick() {
    const { book } = this.props;
    this.setState({ joining: true });
    fetchMessageByPost(API.UserShelfJoin, {
      book_id: book.id
    }).then((msg) => {
      if (msg.code == 200) {
        this.setState({ joined: true });
      } else {
        message.error(msg.message);
      }
    }).catch((err) => {
      message.error(`加入书架失败：${err}`);
    }).finally(() => {
      this.setState({ joining: false });
    })
  }
  render() {
    const { joined, joining } = this.state;
    let renderringBook: ElectronicBook = this.props.book || this.state.book;
    return (
      <Row type="flex" gutter={8}>
        <Col>
          <BookCover book={renderringBook} />
        </Col>
        <Col style={{ flex: 1 }}>
          <BookHeader book={renderringBook} />
          <div><span className="author">{renderringBook.metadata.author}</span></div>
          <div><Rate defaultValue={renderringBook.rate} disabled style={{ fontSize: '1em' }} /></div>
          <BookDescription size="small" book={renderringBook} />
          <div className="huidu-actions-left">
            <LoginRequiredView
              renderNonlogin={(opener) =>
                <Button size="small" onClick={opener}>加入书架</Button>
              }
            >
              <Button size="small" loading={joining} disabled={joined} onClick={() => this.onJoinShelfClick()}>{joined ? '已加入' : '加入书架'}</Button>
            </LoginRequiredView>
          </div>
        </Col>
      </Row>
    )
  }
}