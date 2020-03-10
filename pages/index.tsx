import { Card, List, Row } from 'antd';
import React from 'react';
import BookRank from '../components/book-rank-view';
import BookView from '../components/book-view';
import CategoryBar from '../components/category-bar';
import ContentRelatedView from '../components/content-related-view';
import ExhibitionParisingView from '../components/exhibition-parising-view';
import ExhibitionView from '../components/exhibition-view';
import ParticipantView from '../components/participant-view';
import { PreviewableCarousel } from '../components/previewable-carousel';
import SectionView from '../components/section-view';
import TopicDisplayer from '../components/topic-view';
import { API } from '../configs/api-config';
import { Book, BookType } from '../types/book';
import { Category } from '../types/category';
import { Comment } from '../types/comment';
import { Topic } from '../types/topic';
import { fetchDataByGet } from '../util/network-util';
import { RealtimeJSON } from './api/system/realtime';
import { Review } from '../types/review';

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
          <ExhibitionView<Book>
            category={sections[0]}
            renderItem={(item) => <List.Item><BookView book={item} /></List.Item>}
            aside={
              <BookRank category={sections[0]} />
            }
          />
          <ExhibitionView<Book>
            category={sections[1]}
            renderItem={(item) => <List.Item><BookView book={item} /></List.Item>}
            aside={
              <BookRank category={sections[1]} />
            }
          />
          {/* 
          <ContentSection category={sections[0]} bookType={BookType.ElectronicBook} title="" asideTitle="悦读榜" />
          <ContentSection category={sections[1]} bookType={BookType.AudioBook} title="阅读有声" asideTitle="动听榜" /> */}

          <ExhibitionParisingView category={sections[2]} />
          <SectionView
            title="社区动态"
            content={
              <>
                <Card>
                  <h3>高赞话题</h3>
                  {
                    community.topTopics && community.topTopics.length == 2 &&
                    <ContentRelatedView
                      content={
                        <TopicDisplayer topic={community.topTopics[0]} />
                      }
                      relatedContent={
                        <TopicDisplayer topic={community.topTopics[1]} />
                      }
                    />
                  }
                  <h3>交流热点</h3>
                  {
                    community.focus.map((value, index) => (
                      <ContentRelatedView
                        key={`${value.book.id}`}
                        content={
                          <BookView book={value.book} />
                        }
                        relatedContent={
                          <List
                            renderItem={(item: Topic) => <List.Item>{item.title}</List.Item>}
                            dataSource={value.topics}
                          />
                        }
                        swap={index % 2 == 0}
                        style={{ marginBottom: '8px' }}
                      />
                    ))
                  }
                </Card>
              </>
            }
            asideTitle="社区活跃榜"
            aside={
              <>
                <h3>刚刚活跃</h3>
                <div>
                  <ParticipantView recents={community.topParticipants} />
                </div>
                <h3>热气话题</h3>
                <div>
                  <List
                    renderItem={(item: Topic) => <List.Item>{item.title}</List.Item>}
                    dataSource={community.hotTopics}
                  />
                </div>
                <h3>热气书评</h3>
                <div>
                  <List
                    renderItem={(item: Review) => <List.Item>{item.title}</List.Item>}
                    dataSource={community.hotReviews}
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