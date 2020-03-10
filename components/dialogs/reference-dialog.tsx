import { message, Checkbox, Modal, Tabs, Input, List } from "antd";
import React from "react";
import { API } from "../../configs/api-config";
import { ElectronicBookListJSON } from "../../pages/api/electronic-books";
import { AudioBook } from "../../types/audio-book";
import { ElectronicBook } from "../../types/electronic-book";
import { fetchDataByGet } from "../../util/network-util";
import { AudioBookListJSON } from "../../pages/api/audio-books";
import { Book } from "../../types/book";
import BookPreviewView from "../book-preview-view";

const { Search } = Input;
const { TabPane } = Tabs;

export interface ReferenceDialogProps {
  visible: boolean,
  onSelected: (bookMap: any) => void,
  onCancel: () => void
}

export interface ReferenceDialogState {
  ebookResults: Array<ElectronicBook>,
  audioResults: Array<AudioBook>,
  reference: Map<string, Book>,
  searchingElectronicBook: boolean,
  searchingAudioBook: boolean
}

export class ReferenceDialog extends React.Component<ReferenceDialogProps, ReferenceDialogState>{
  constructor(props: ReferenceDialogProps) {
    super(props);
    this.state = {
      ebookResults: [],
      audioResults: [],
      reference: new Map(),
      searchingElectronicBook: false,
      searchingAudioBook: false
    }
  }
  onElectronicBookSearch(keyword: string) {
    this.setState({ searchingElectronicBook: true });
    fetchDataByGet<ElectronicBookListJSON>(API.ElectronicBookSearch, {
      keyword: keyword
    }).then((data) => {
      this.setState({ ebookResults: data.list });
    }).catch((err) => {
      message.error(`${err}`);
    }).finally(() => {
      this.setState({ searchingElectronicBook: false });
    });
  }
  onAudioBookSearch(keyword: string) {
    this.setState({ searchingAudioBook: true });
    fetchDataByGet<AudioBookListJSON>(API.AudioBookSearch, {
      keyword: keyword
    }).then((data) => {
      this.setState({ audioResults: data.list });
    }).catch((err) => {
      message.error(`${err}`);
    }).finally(() => {
      this.setState({ searchingAudioBook: false });
    });
  }
  onBookSearch(keyword: string) {
    if (keyword.length < 1) {
      return;
    }
    this.onElectronicBookSearch(keyword);
    this.onAudioBookSearch(keyword);
  }
  onOk() {
    const { onSelected, onCancel } = this.props;
    const { reference } = this.state;
    let iterator = reference.values();
    let books = [];
    while (true) {
      let pair = iterator.next();
      if (pair.done) {
        break;
      }
      if (pair.value) {
        books.push(pair.value);
      }
    }
    onSelected(books);
    onCancel();
  }
  onBookSelected(checked: boolean, item: Book) {
    this.setState((state) => {
      let reference = state.reference;
      reference.set(item.id, item);
      return { reference: reference };
    });
  }
  render() {
    const { visible, onCancel, onSelected } = this.props;
    const { ebookResults, audioResults, searchingAudioBook, reference, searchingElectronicBook } = this.state;
    return (
      <Modal
        title="引用书籍"
        visible={visible}
        onCancel={onCancel}
        onOk={() => this.onOk()}
      >
        <Search placeholder="搜索关键字" loading={searchingAudioBook || searchingElectronicBook} onSearch={(keyword) => this.onBookSearch(keyword)} />
        <Tabs>
          <TabPane tab="电子书" key="electronic-books">
            <List
              loading={searchingElectronicBook}
              renderItem={(item) => (
                <List.Item>
                  <Checkbox
                    style={{ paddingRight: '2em' }}
                    onChange={(e) => this.onBookSelected(e.target.checked, item)}
                  />
                  <BookPreviewView book={item} />
                </List.Item>
              )}
              dataSource={ebookResults}
            />
          </TabPane>
          <TabPane tab="有声书" key="audio-books">
            <List
              loading={searchingAudioBook}
              renderItem={(item) => (
                <List.Item>
                  <Checkbox
                    style={{ paddingRight: '2em' }}
                    onChange={(e) => this.onBookSelected(e.target.checked, item)}
                  />
                  <BookPreviewView book={item} />
                </List.Item>
              )}
              dataSource={audioResults}
            />
          </TabPane>
        </Tabs>
        <style jsx>{`
          h3 {
            padding: 0.5em 0;
          }
        `}</style>
      </Modal>
    )
  }
}