import { Carousel, Col, Empty, List, Row } from 'antd';
import React from 'react';
import { Activity } from '../types/activity';
import { BookPreview } from '../types/book';
import BookDescription from './book/book-description';
import BookHeader from './book/book-header';
import BookCover from './book/book-cover';
import { API } from '../configs/api-config';
import UploadUtil from '../util/upload-util';

interface PreviewImageViewProps {
  selectedIndex: number,
  index: number,
  activity: Activity,
}
function PreviewImageView(props: PreviewImageViewProps) {
  const { selectedIndex, index, activity } = props;
  return (
    <div className={index === selectedIndex ? 'selected' : ''}>
      <BookCover book={activity.book} style={{width: '100%'}}/>
      <style jsx>{`
        div.selected {
          outline: 0.1em solid grey;
        }
      `}</style>
    </div>
  );
}

export interface PreviewableCarouselProps {
  activities: Array<Activity>
}
export interface PreviewableCarouselState {
  selectedIndex: number
}

export class PreviewableCarousel extends React.Component<PreviewableCarouselProps, PreviewableCarouselState> {
  private carousel: React.RefObject<Carousel>;
  constructor(props: PreviewableCarouselProps) {
    super(props);
    this.state = {
      selectedIndex: 0
    }
    this.carousel = React.createRef<Carousel>();
  }
  render() {
    const { activities } = this.props;
    const { selectedIndex } = this.state;
    let selectedActivity = (selectedIndex < activities.length && activities[selectedIndex]);
    let referBook = selectedActivity.book;
    if (!referBook) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
    return (
      <>
        <Row gutter={8}>
          <Col span={17}>
            <Carousel ref={this.carousel} dots={false} afterChange={(current) => this.setState({ selectedIndex: current })} autoplay style={{ width: '100%' }}>
              {
                activities.map((activity: Activity) => (
                  <div className="activity-content" key={activity.id}>
                    <img src={UploadUtil.absoluteUrl(API.UploadSource, activity.banner)} width="100%" height="52.7%" />
                  </div>)
                )
              }
            </Carousel>
          </Col>
          <Col span={7}>
            <Row>
              <List
                grid={{ gutter: 8, column: 3 }}
                renderItem={(activity, index: number) => (
                  <>
                    <List.Item onClick={() => {
                      this.setState({ selectedIndex: index })
                      this.carousel.current.goTo(index);
                    }}>
                      <PreviewImageView selectedIndex={selectedIndex} index={index} activity={activity} />
                    </List.Item>
                  </>
                )}
                dataSource={activities}
              />
            </Row>
            {referBook &&
              <Row>
                <BookHeader book={referBook} style={{ fontSize: '1.5em' }} />
                <BookDescription book={referBook} size="medium" />
              </Row>
            }
          </Col>
        </Row>
        <style jsx>{`
          .activity-content {
            overflow: hidden;
            border-radius: 8px;
          }
          p {
            max-height: 3em;
            word-break: break-all;
            overflow: hidden;
          }
        `}</style>
      </>
    )
  }
}

