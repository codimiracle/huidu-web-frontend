import React from 'react';
import { ElectronicBook } from '../types/electronic-book';
import { Tag, Button, Rate } from 'antd';

const EMPTY_IMAGE = '/assets/empty.png';

export interface ElectronicBookViewProps {
  id?: string,
  book?: ElectronicBook
};
export interface ElectronicBookViewState {
  book: ElectronicBook
};

export default class ElectronicBookView extends React.Component<ElectronicBookViewProps, ElectronicBookViewState> {
  constructor(props: ElectronicBookViewProps) {
    super(props);
  }
  private onJoinShelfClick() {

  }
  private onOnlineReading() {

  }
  render() {
    let renderringBook: ElectronicBook = this.props.book || this.state.book;
    return (
      <div className="electronic-book">
        <div>
          <img src={renderringBook.metadata.cover || EMPTY_IMAGE} />
        </div>
        <div className="body">
    <div><strong>{renderringBook.metadata.name}</strong> <Tag>{renderringBook.status}</Tag> <span className="author">{renderringBook.metadata.authors.join('')}</span></div>
          <div><Rate defaultValue={2.5} disabled style={{ fontSize: '18px' }} /></div>
          <p className="description">{renderringBook.metadata.description}</p>
          <div className="actions">
            <Button>在线阅读</Button> <Button>加入书架</Button>
          </div>
        </div>
        <style jsx>{`
          .electronic-book {
            padding: 0.5em;
            display: flex;
          }
          img {
            background-color: #f7f7f7;
            border-radius: 4px;
            width: 128px;
            height: 172px;
          }
          .body {
            padding: 0.5em;
            display: flex;
            flex-direction: column;
          }
          .description {
            flex: 1;
          }
        `}</style>
      </div>
    )
  }
}