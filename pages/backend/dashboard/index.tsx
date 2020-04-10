import { Col, List, Row, Card, Statistic } from 'antd';
import Link from 'next/link';
import { Router, withRouter } from 'next/router';
import React from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ReferenceLine, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis } from 'recharts';
import AvatarView from '../../../components/avatar-view';
import HeaderBar from '../../../components/backend/header-bar';
import UserList from '../../../components/backend/user/user-list-view';
import ChartView from '../../../components/charts/chart-view';
import { API } from '../../../configs/api-config';
import moment from 'moment';
import { BOOK_TYPE_TEXTS } from '../../../types/book';
import DatetimeUtil from '../../../util/datetime-util';
import MoneyUtil from '../../../util/money-util';


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{BOOK_TYPE_TEXTS[payload.type] || '未知'}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`数量: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(占比 ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export interface BackendDashboardProps {
  router: Router;
};
export interface BackendDashboardState {
  activeIndex: number;
  time: string;
};
export class BackendDashboard extends React.Component<BackendDashboardProps, BackendDashboardState> {
  private timerId: NodeJS.Timeout;
  constructor(props: BackendDashboardProps) {
    super(props);
    this.state = {
      activeIndex: 0,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
  }
  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  }
  timeUpdate = () => {
    this.setState({ time: moment().format('YYYY-MM-DD HH:mm:ss') });
    this.timerId = setTimeout(this.timeUpdate, 1000);
  }
  componentDidMount() {
    this.timerId = setTimeout(this.timeUpdate, 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.timerId);
  }
  render() {
    return (
      <div>
        <HeaderBar
          title="后台面板"
          hint="查看荟读平台整体状况"
        />
        <Row gutter={[16, 24]}>
          <Col span={8}>
            <Row gutter={[16, 26]}>
              <Col span={24}>
                <Card title="时间" size="small">
                  <Statistic value={this.state.time} />
                </Card>
              </Col>
              <Col span={24}>
                <Card title="统计" size="small">
                  <Row>
                    <Col span={12}>
                      <Statistic title="用户数" />
                    </Col>
                    <Col span={12}>
                      <Statistic title="图书数" />
                    </Col>
                    <Col span={12}>
                      <Statistic title="订单数" />
                    </Col>
                    <Col span={12}>
                      <Statistic title="交易额（￥）" />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={16}>
            <ChartView
              title="订单成交量"
              api={API.BackendDashboardPaperBookSales}
              renderChart={(data) => (
                <ResponsiveContainer
                  width="100%"
                  height={320}
                >
                  <LineChart
                    data={data}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" name="日期" tickFormatter={(value) => DatetimeUtil.formatTinyDate(value)} />
                    <YAxis dataKey="amount" name="金额" tickFormatter={(value) => MoneyUtil.formatNumber(value)} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="quantity" name="销量" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            />
          </Col>
          <Col span={24}>
            <ChartView
              title="用户图书偏好"
              api={API.BackendDashboardUserBookPreference}
              renderChart={(data) => (<ResponsiveContainer
                width="100%"
                minHeight={320}
              >
                <BarChart
                  data={data}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tagName" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                  <ReferenceLine y={0} stroke="#000" />
                  <Brush dataKey="tagName" height={30} stroke="#8884d8" />
                  <Bar name="平均兴趣度" dataKey="score" fill="#8884d8" />
                  <Bar name="用户数量" dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>)}
            />
          </Col>
          <Col span={12}>
            <ChartView
              title="图书类型统计"
              api={API.BackendDashboardBookCategoryCount}
              renderChart={(data) => (
                <ResponsiveContainer
                  width="100%"
                  minHeight={260}
                >
                  <PieChart>
                    <Pie
                      activeIndex={this.state.activeIndex}
                      activeShape={renderActiveShape}
                      data={data}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      onMouseEnter={this.onPieEnter}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            />
          </Col>
          <Col span={12}>
            <ChartView
              title="图书类别分布"
              api={API.BackendDashboardBookCategoryDistribution}
              renderChart={(data) => (
                <ResponsiveContainer
                  width="100%"
                  minHeight={260}
                >
                  <RadarChart outerRadius={150} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            />
          </Col>
        </Row>
        <Col span={18}>
          <h3>在线用户</h3>
          <UserList
            api={API.BackendDashboardOnlineUsers}
            renderItem={(user) =>
              <List.Item style={{ textAlign: 'center' }}>
                <Link href={`${this.props.router.pathname}/[user_id]`} as={`${this.props.router.asPath}/${user.id}`}><a><AvatarView size={64} user={user} /></a></Link>
                <div>{user.nickname}</div>
              </List.Item>
            }
          />
        </Col>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </div>
    )
  }
}

const WithRouterDashboard = withRouter(BackendDashboard);

export default WithRouterDashboard;