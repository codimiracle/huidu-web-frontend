import React from 'react';
import PaperBookView from './paper-book-view';
import { Book } from '../types/book';
import PreviewableRank from './previewable-rank';
import { API } from '../configs/api-config';
import { message } from 'antd';
import { ListJSON } from '../types/api';
import { fetchDataByGet } from '../util/network-util';
import UploadUtil from '../util/upload-util';

export interface ExhibitionRecommendationAsideProps { };
export interface ExhibitionRecommendationAsideState {
  interestingList: Array<Book>;
  sameInterestingList: Array<Book>;
  fetchingInteresting: boolean;
  fetchingSameInteresting: boolean;
};

export default class ExhibitionRecommendationAside extends React.Component<ExhibitionRecommendationAsideProps, ExhibitionRecommendationAsideState> {
  constructor(props: ExhibitionRecommendationAsideProps) {
    super(props);
    this.state = {
      fetchingInteresting: false,
      fetchingSameInteresting: false,
      interestingList: [],
      sameInterestingList: []
    };
  }
  fetchSameIntrestingRecommendation() {
    this.setState({ fetchingSameInteresting: true });
    fetchDataByGet<ListJSON<Book>>(API.RecommendationSameInteresting, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 4,
    }).then((data) => {
      this.setState({ sameInterestingList: data.list });
    }).catch((err) => {
      message.error(`获取推荐数据失败：${err}`);
    }).finally(() => {
      this.setState({ fetchingSameInteresting: false });
    });
  }
  fetchIntrestingRecommendation() {
    this.setState({ fetchingInteresting: true });
    fetchDataByGet<ListJSON<Book>>(API.RecommendationInteresting, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 4,
    }).then((data) => {
      this.setState({ interestingList: data.list });
    }).catch((err) => {
      message.error(`获取推荐数据失败：${err}`);
    }).finally(() => {
      this.setState({ fetchingInteresting: false });
    });
  }
  componentDidMount() {
    this.fetchIntrestingRecommendation();
    this.fetchSameIntrestingRecommendation();
  }
  render() {
    return (
      <div>
        <h3>根据 阅读兴趣 推荐</h3>
        <div>
          <PreviewableRank
            loading={this.state.fetchingInteresting}
            dataSource={this.state.interestingList}
            renderItem={(data: Book) => <img style={{width: '100%'}} src={UploadUtil.absoluteUrl(API.CoverSource, data.metadata.cover)} />}
          />
        </div>
        <h3 style={{ marginTop: '32px' }}>同样兴趣的人读了</h3>
        <div>
          <PreviewableRank
            loading={this.state.fetchingSameInteresting}
            dataSource={this.state.sameInterestingList}
            renderItem={(data: Book) => <img style={{width: '100%'}} src={UploadUtil.absoluteUrl(API.CoverSource, data.metadata.cover)} />}
          />
        </div>
      </div>
    )
  }
}