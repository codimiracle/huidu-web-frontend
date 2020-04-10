import { List, Row } from 'antd';
import React from 'react';
import BookRank from '../components/book-rank-view';
import BookView from '../components/book-view';
import CategoryBar from '../components/category-bar';
import ReviewItemView from '../components/community/review-item-view';
import TopicItemView from '../components/community/topic-item-view';
import ContentRelatedView from '../components/content-related-view';
import ExhibitionParisingView from '../components/exhibition-parising-view';
import ExhibitionView from '../components/exhibition-view';
import SimpleListView from '../components/integral/simple-list-view';
import ParticipantView from '../components/participant-view';
import { PreviewableCarousel } from '../components/previewable-carousel';
import SectionView from '../components/section-view';
import TopicDisplayer from '../components/topic-view';
import { API } from '../configs/api-config';
import { Book, BookType } from '../types/book';
import { Category } from '../types/category';
import { Comment } from '../types/comment';
import { Review } from '../types/review';
import { Topic } from '../types/topic';
import { fetchDataByGet } from '../util/network-util';
import { RealtimeJSON } from './api/system/realtime';
import { CommunityFocus } from '../types/community';
import CommunityFocusView from '../components/community/community-focus-view';

export interface ComprehensivePageProps extends RealtimeJSON { }
export interface ComprehensivePageState { }

export interface BookAndTopComment {
  book: Book,
  comment: Comment
}

export interface ContentSectionProps {
  category: Category,
  bookType: BookType,
  title: string,
  asideTitle: string
}
export interface ContentSectionState {
  loading: boolean,
  loadingRanking: boolean,
  page: number,
  limit: number,
  list: Array<Book>
}

class ContentSection extends React.Component<ContentSectionProps, ContentSectionState> {
  constructor(props: ContentSectionProps) {
    super(props);
    this.state = {
      loading: false,
      loadingRanking: false,
      page: 1,
      limit: 6,
      list: []
    }
  }

  private fetchBookList(page: number, limit: number) {
    const { category, bookType } = this.props;
    let api = bookType == BookType.ElectronicBook ? API.ElectronicBookCollection : API.AudioBookCollection
    this.setState({ loading: true });
    fetchDataByGet<any>(api, {
      filter: JSON.stringify({
        category: category
      }),
      page: page,
      limit: limit
    }).then((bookList) => {
      this.setState({
        list: bookList.list,
        page: bookList.page,
        limit: bookList.limit
      })
    }).finally(() => {
      this.setState({ loading: false });
    })
  }

  componentDidMount() {
    const { page, limit } = this.state;
    this.fetchBookList(page, limit);
  }
  render() {
    const { title, asideTitle } = this.props;
    const { list } = this.state;
    return (
      <>
        <SectionView
          title={title}
          content={
            <List
              grid={{ gutter: 4, column: 2 }}
              dataSource={list}
              renderItem={(data: Book) => <List.Item key={data.id}><BookView book={data} /></List.Item>}
            />}
          asideTitle={asideTitle}
          aside={
            <BookRank
              category={this.props.category}
            />
          }
        />
      </>
    )
  }
}

class ComprehensivePage extends React.Component<ComprehensivePageProps, ComprehensivePageState> {
  constructor(props: Readonly<ComprehensivePageProps>) {
    super(props);
  }
  static async getInitialProps() {
    let data = fetchDataByGet<RealtimeJSON>(API.SystemRealtime);
    return data
  }
  render() {
    const { activities, sections, categories, community, recommendations } = this.props;
    return (
      <>
        <div className="home-page">
          <Row>
            <PreviewableCarousel activities={activities} />
          </Row>
          <Row>
            {
              categories &&
              <CategoryBar categories={categories} />
            }
          </Row>
          {
            sections.length > 0 && sections[1] &&
            <ExhibitionView<Book>
              category={sections[0]}
              getRequestExtraArgument={
                () => ({
                  type: [BookType.ElectronicBook]
                })
              }
              renderItem={(item) => <List.Item><BookView book={item} /></List.Item>}
              aside={
                <BookRank category={sections[0]} type={BookType.ElectronicBook} />
              }
            />
          }
          {
            sections.length > 1 && sections[1] &&
            <ExhibitionView<Book>
              category={sections[1]}
              getRequestExtraArgument={
                () => ({
                  type: [BookType.AudioBook]
                })
              }
              renderItem={(item) => <List.Item><BookView book={item} /></List.Item>}
              aside={
                <BookRank category={sections[1]} type={BookType.AudioBook} />
              }
            />
          }
          {sections.length > 2 && <ExhibitionParisingView category={sections[2]} />}
          <SectionView
            title="社区动态"
            content={
              <>
                <h3>交流热点</h3>
                <List
                  renderItem={(item: CommunityFocus, index: number) => <CommunityFocusView swap={index % 2 == 0} focus={item} />}
                  dataSource={community.focus}
                />
              </>
            }
            asideTitle="社区活跃榜"
            aside={
              <>
                <h3>热气话题</h3>
                <div>
                  <SimpleListView
                    api={API.CommunityTopicHotCollection}
                    renderItem={(item: Topic) => <TopicItemView topic={item} />}
                  />
                </div>
                <h3>热气书评</h3>
                <div>
                  <SimpleListView
                    api={API.CommunityReviewHotCollection}
                    renderItem={(item: Review) => <ReviewItemView review={item} />}
                  />
                </div>
              </>
            }
          />
        </div>
        <style jsx global>{`
          .home-page > .ant-row + .ant-row, .ant-row + .content-section, .content-section + .content-section {
            margin-top: 32px;
          }
        `}</style>
      </>
    )
  }
}

export default ComprehensivePage;