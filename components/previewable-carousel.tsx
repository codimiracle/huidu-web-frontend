import React from 'react';
import { Row, Col, Carousel, List } from 'antd';
import { Activity } from '../types/activity';

interface PreviewImageViewProps {
  selectedIndex: number,
  index: number,
  activity: Activity,
}
function PreviewImageView(props: PreviewImageViewProps) {
  const { selectedIndex, index, activity } = props;
  return (
    <>
      <img className={index === selectedIndex ? 'selected' : ''} width="96px" height="129px" src={activity.book.cover || activity.book.metadata.cover || '/assets/empty.png'} />
      <style jsx>{`
        img.selected {
          outline: 0.1em solid grey;
        }
        `}</style>
    </>
  );
}

const NO_SELECTED_ACTIVITY = { book: { metadata: { name: '', description: '' } } };

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
    let selectedActivity = (selectedIndex < activities.length && activities[selectedIndex]) || NO_SELECTED_ACTIVITY;
    return (
      <>
        <Row gutter={8}>
          <Col span={17}>
            <Carousel ref={this.carousel} dots={false} afterChange={(current) => this.setState({ selectedIndex: current })} autoplay style={{ width: '100%', height: '396px' }}>
              {
                activities.map((activity: Activity) => (
                  <div className="activity-content" key={activity.id}>
                    <img src={activity.banner} width="100%" height="396px" />
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
            <Row>
              <h2>{selectedActivity && selectedActivity.book.metadata.name}</h2>
              <p>{selectedActivity && selectedActivity.book.metadata.description}</p>
            </Row>
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

