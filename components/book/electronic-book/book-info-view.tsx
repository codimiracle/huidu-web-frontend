import { Button, message } from "antd";
import React from "react";
import { API } from "../../../configs/api-config";
import { ElectronicBook } from "../../../types/electronic-book";
import { fetchMessageByPost } from "../../../util/network-util";
import DirectLink from "../../direct-link";
import LoginRequiredView from "../../user/login-required-view";
import BookCover from "../book-cover";
import BookDescription from "../book-description";
import BookHeader from "../book-header";

export interface BookInfoViewProps {
  book: ElectronicBook
}

export interface BookInfoViewState {
  joining: boolean,
  joined: boolean
}

export class BookInfoView extends React.Component<BookInfoViewProps, BookInfoViewState> {
  constructor(props: BookInfoViewProps) {
    super(props);
    this.state = {
      joined: props.book.joinedShelf,
      joining: false
    }
  }
  componentDidUpdate() {
    if (this.props.book.joinedShelf && !this.state.joined) {
      this.setState({joined: this.props.book.joinedShelf});
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
    const { book } = this.props;
    const { joined, joining } = this.state;
    return (
      <div className="book-info">
        <BookCover size="large" book={book} />
        <div className="body">
          <BookHeader book={book} status link={false} />
          <div>{book.metadata.author} 著</div>
          <BookDescription book={book} size="large" style={{ flex: 1 }} />
          <div className="huidu-actions-left">
            <DirectLink href="/reader/[book_id]" as={`/reader/${book.id}`}><Button type="primary" size="large">在线阅读</Button></DirectLink> <LoginRequiredView
              renderNonlogin={(opener) =>
                <Button size="large" onClick={opener}>加入书架</Button>
              }
            ><Button size="large" loading={joining} disabled={joined} onClick={() => this.onJoinShelfClick()}>{joined ? '已加入' : '加入书架'}</Button></LoginRequiredView>
          </div>
        </div>
        <style jsx>{`
        .book-info {
          display: flex;
        }
        .body {
          display: flex;
          flex-direction: column;
          padding: 0.5em 1em;
        }
        p {
          flex: 1;
        }
      `}</style>
      </div>
    )
  }
}