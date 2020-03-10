import { Button, Calendar, Card, Col, Divider, List, message, Row } from 'antd';
import moment from 'moment';
import React, { CSSProperties } from 'react';
import AvatarView from '../../components/avatar-view';
import { API } from '../../configs/api-config';
import { EntityJSON } from '../../types/api';
import { ArrivedData } from '../../types/arriveddata';
import { Book, BookPreview } from '../../types/book';
import { User } from '../../types/user';
import DatetimeUtil from '../../util/datetime-util';
import { fetchDataByGet, fetchMessageByPost } from '../../util/network-util';
import { UserContext } from '../../components/hooks/with-user';

const EMPTY_IMAGE = "/assets/empty.png";

interface BookViewProps {
  book: Book
}

function BookView(props: BookViewProps) {
  const { book } = props;
  const bookPreview = BookPreview.valueOf(book);
  return (
    <div className="book-view">
      <img src={bookPreview.cover || EMPTY_IMAGE} />
      <div className="body">
        <strong>{bookPreview.name}</strong>
        <p>{bookPreview.description}</p>
      </div>
      <style jsx>{`
        .book-view {
          display: flex;
          align-items: center;
        }
        img {
          width: 64px;
          height: 86px;
        }
        .body {
          padding-left: 0.5em;
        }
        p {
          max-height: 48px;
          word-break: break-all;
        }
      `}</style>
    </div>
  );
}

export interface ArrivedProps {
  arriveddata: ArrivedData
};
export interface ArrivedState {
  signing: boolean
  arriveddata: ArrivedData
};

export default class Arrived extends React.Component<ArrivedProps, ArrivedState> {
  static async getInitialProps() {
    let arrived = await fetchDataByGet<EntityJSON<ArrivedData>>(API.UserArriveToday);
    return {
      arriveddata: arrived.entity
    }
  }
  constructor(props: ArrivedProps) {
    super(props);
    this.state = {
      signing: false,
      arriveddata: props.arriveddata
    }
  }
  onArrived() {
    this.setState({ signing: true });
    fetchMessageByPost(API.UserArrived, {
      date: DatetimeUtil.now()
    }).then((msg) => {
      if (msg.code == 200) {
        message.success('打卡成功！');
        this.setState((state) => {
          let arriveddata = state.arriveddata;
          arriveddata.signed = true;
          return ({
            arriveddata: arriveddata
          });
        })
      } else {
        message.error(`打卡失败：${msg.message}`);
      }
    }).catch((err) => {
      message.error(`打卡失败：${err}`);
    }).finally(() => {
      this.setState({ signing: false });
    });
  }
  render() {
    const { signing, arriveddata } = this.state;
    let dateCellRender = (date) => (
      <>
        <div></div>
        <style jsx>{`
          div {
            width: 0.5em;
            height: 0.5em;
            margin: 0 auto;
            margin-bottom: 0.5em;
            border-radius: 0.25em;
            background-color: ${arriveddata.history[DatetimeUtil.formatDate(date)] ? '#8bc34a' : '#b2abab'};
          }
        `}</style>
      </>
    );
    let buttonTopStyle: CSSProperties = {
      display: 'block',
      width: '100%',
      borderBottom: '0',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0'
    }
    let buttonBottomStyle: CSSProperties = {
      display: 'block',
      width: '100%',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0'
    }
    return (
      <div>
        <div className="summary-info">
          <UserContext.Consumer>
            {
              (user) =>
                <AvatarView size={128} user={user} />
            }
          </UserContext.Consumer>
          <div className="motto-view">{arriveddata.motto}</div>
        </div>
        <Row type="flex" gutter={32} style={{ marginLeft: '128px' }}>
          <Col>
            <Row type="flex" gutter={32}>
              <Col style={{ fontSize: '1.5em', textAlign: 'center' }}>
                <div>已连续打卡</div>
                <div><strong className="arrived-days">{arriveddata.days}</strong> 天</div>
              </Col>
              <Col>
                <div>
                  <Button type="primary" size="large" style={buttonTopStyle}>{moment(arriveddata.today).format('D')}日</Button>
                  <Button onClick={() => this.onArrived()} loading={signing} disabled={arriveddata.signed} size="large" style={buttonBottomStyle}>{arriveddata.signed ? '已打卡' : '打卡'}</Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>
          <Col>
            <div>今天我读了</div>
            <List
              renderItem={(item) => (
                <List.Item>
                  <BookView book={item} />
                </List.Item>
              )}
              dataSource={arriveddata.reads}
            />
          </Col>
        </Row>
        <div className="calendar-view">
          <h3>打卡记录</h3>
          <Card>
            <Calendar
              fullscreen={false}
              dateCellRender={dateCellRender}
            />
          </Card>
        </div>
        <style jsx>{`
          .calendar-view {
            width: 512px;
            margin-left: 128px;
          }
          .arrived-info {
            display: flex;
          }
          .summary-info {
            display: flex;
            align-items: center;
            padding-bottom: 16px;
          }
          .motto-view {
            font-size: 3em;
          }
          .motto-view::before {
            font-family: '黑体';
            content: '：“'
          }
          .motto-view::after {
            font-family: '黑体';
            content: '”'
          }
          .arrived-days {
            font-size: 1.5em;
            color: #1890ff;
          }
        `}</style>
      </div >
    )
  }
}