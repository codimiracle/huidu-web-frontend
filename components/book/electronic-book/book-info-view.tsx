import { Button, message } from "antd";
import React from "react";
import { API } from "../../../configs/api-config";
import { ElectronicBook } from "../../../types/electronic-book";
import { fetchMessageByPost } from "../../../util/network-util";
import DirectLink from "../../direct-link";
import ElectronicBookStatusView from "../../electronic-book-status-view";
import BookHeader from "../book-header";
import BookDescription from "../book-description";
import BookCover from "../book-cover";

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
      joined: false,
      joining: false
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
            <DirectLink href="/reader/[book_id]" as={`/reader/${book.id}`}><Button type="primary" size="large">在线阅读</Button></DirectLink> <Button size="large" loading={joining} disabled={joined} onClick={() => this.onJoinShelfClick()}>{joined ? '已加入' : '加入书架'}</Button>
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