import React from 'react';
import { Row, Col, Carousel, List } from 'antd';
import { Activity } from '../types/activity';
import Link from 'next/link';

interface PreviewImageViewProps {
  selectedIndex: number,
  index: number,
  activity: Activity,
}
function PreviewImageView(props: PreviewImageViewProps) {
  const { selectedIndex, index, activity } = props;
  return (
    <>
      <img className={index === selectedIndex ? 'selected' : ''} width="100%" src={activity.book.cover || activity.book.metadata.cover || '/assets/empty.png'} />
      <style jsx>{`
        img.selected {
          outline: 0.1em solid grey;
        }
        `}</style>
    </>
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

    return (
      <>
        <Row gutter={8}>
          <Col span={17}>
            <Carousel ref={this.carousel} dots={false} afterChange={(current) => this.setState({ selectedIndex: current })} autoplay style={{ width: '100%', height: '396px' }}>
              {
                activities.map((activity: Activity) => (
                  <div className="activity-content" key={activity.id}>
                    <img src={activity.banner} width="100%" />
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
                <h2><Link href={`/bookshop/${referBook.type}s/[book_id]`} as={`/bookshop/${referBook.type}s/${referBook.id}`}><a>{selectedActivity && selectedActivity.book.metadata.name}</a></Link></h2>
                <p>{selectedActivity && selectedActivity.book.metadata.description}</p>
              </Row>
            }
          </Col>
        </Row>
        <style jsx>{`
          .activity-content {
            overflow: hidden;
            border-radius: 8px;
          }
        `}</style>
      </>
    )
  }
}

