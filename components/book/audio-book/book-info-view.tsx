import { Button, message } from "antd";
import React from "react";
import { API } from "../../../configs/api-config";
import { AudioBook } from "../../../types/audio-book";
import { fetchMessageByPost } from "../../../util/network-util";
import DirectLink from "../../direct-link";
import BookCover from "../book-cover";
import BookDescription from "../book-description";
import BookHeader from "../book-header";

export interface BookInfoProps {
  book: AudioBook
}
export interface BookInfoState {
  joining: boolean,
  joined: boolean
}

export default class BookInfo extends React.Component<BookInfoProps, BookInfoState> {
  constructor(props: BookInfoProps) {
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
        <BookCover book={book} size="large" />
        <div className="body">
          <BookHeader book={book} status link={false} />
          <div>{book.metadata.author} 著</div>
          <BookDescription book={book} size="large" style={{ flex: 1 }} />
          <div className="huidu-actions-left">
            <DirectLink href={`/player/[book_id]`} as={`/player/${book.id}`}><Button size="large" type="primary">在线听书</Button></DirectLink> <Button size="large" loading={joining} disabled={joined} onClick={() => this.onJoinShelfClick()}>{joined ? '已加入' : '加入书架'}</Button>
          </div>
        </div>
        <style jsx>{`
        img {
          width: 192px;
          height: 264px;
          border-radius: 4px;
          background-image: url(/assets/empty.png);
          background-size: cover;
        }
        .book-info {
          display: flex;
        }
        .body {
          display: flex;
          flex-direction: column;
          padding: 0.5em 1em;
        }
      `}</style>
      </div >
    )
  }
}
