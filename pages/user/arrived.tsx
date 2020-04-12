import { Button, Calendar, Card, Col, Divider, List, message, Row, Spin } from 'antd';
import moment from 'moment';
import React, { CSSProperties } from 'react';
import AvatarView from '../../components/avatar-view';
import BookPreviewView from '../../components/book-preview-view';
import { UserContext } from '../../components/hooks/with-user';
import { API } from '../../configs/api-config';
import { EntityJSON } from '../../types/api';
import { ArrivedData } from '../../types/arriveddata';
import DatetimeUtil from '../../util/datetime-util';
import { fetchDataByGet, fetchDataByPost } from '../../util/network-util';


export interface ArrivedProps {
  arriveddata: ArrivedData;
};
export interface ArrivedState {
  signing: boolean;
  loadingToday: boolean;
  arriveddata: ArrivedData;
};

export default class Arrived extends React.Component<ArrivedProps, ArrivedState> {
  constructor(props: ArrivedProps) {
    super(props);
    this.state = {
      signing: false,
      loadingToday: false,
      arriveddata: props.arriveddata || null
    }
  }
  fetchTodayArrivingData() {
    this.setState({ loadingToday: true });
    fetchDataByGet<EntityJSON<ArrivedData>>(API.UserArriveToday).then((data) => {
      this.setState({ arriveddata: data.entity });
    }).catch((err) => {
      message.error(`获取今天签到情况失败：${err}`);
    }).finally(() => {
      this.setState({ loadingToday: false });
    });
  }
  onArrived() {
    this.setState({ signing: true });
    fetchDataByPost<EntityJSON<ArrivedData>>(API.UserArrived, {
      date: DatetimeUtil.now(),
      motto: '每天读书，每天快乐！'
    }).then((data) => {
      message.success('打卡成功！');
      this.setState({
        arriveddata: data.entity
      });
    }).catch((err) => {
      message.error(`打卡失败：${err}`);
    }).finally(() => {
      this.setState({ signing: false });
    });
  }
  componentDidMount() {
    this.fetchTodayArrivingData();
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
        <Spin spinning={this.state.loadingToday}>
          {
            arriveddata && <>
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
                <Col style={{ flex: 1 }}>
                  <div>今天我读了</div>
                  <List
                    renderItem={(item) => (
                      <List.Item>
                        <BookPreviewView book={item.book} />
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
            </>
          }
        </Spin>
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