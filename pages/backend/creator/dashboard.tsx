import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import Link from 'next/link';
import ChartView from '../../../components/charts/chart-view';
import { API } from '../../../configs/api-config';
import { ResponsiveContainer, Sector, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, ReferenceLine, Brush, Bar, PieChart, Pie } from 'recharts';

function format(n: number) {
  n = Math.trunc(n);
  if (isNaN(n)) {
    return '00';
  }
  if (n > 9) {
    return `${n}`;
  }
  return `0${n}`;
}


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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.categoryName}</text>
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`图书数: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(占 ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export interface DashboardProps { };
export interface DashboardState {
  activeIndex: number;
};

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }
  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  }
  render() {
    return (
      <div>
        <h2>作者面板</h2>
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Card size="small" title="快捷入口">
                  <Link href="./electronic-books"><a>我的电子书</a></Link><br />
                  <Link href="./audio-books"><a>我的音频书</a></Link>
                </Card>
              </Col>
              <Col span={24}>
                <ChartView
                  api={API.CreatorDashboardCreativeStatistics}
                  title="创作统计"
                  renderChart={(data) => <Row gutter={[16, 24]}>
                    <Col span={8}>
                      <Statistic title="电子书数量" value={data && data.electronicBookCount || 0} />
                    </Col>
                    <Col span={8}>
                      <Statistic title="有声书数量" value={data && data.audioBookCount || 0} />
                    </Col>
                    <Col span={8}>
                      <Statistic title="章节数量" value={data && data.audioBookCount || 0} />
                    </Col>
                    <Col span={12}>
                      <Statistic title="章节总时长" value={data && data.episodeTotalTimes || 0} formatter={(value: number) => `${format(value / 1000 / 60)}:${format(value / 1000 % 60)}.${format(value % 1000)}`} />
                    </Col>
                    <Col span={12}>
                      <Statistic title="章节总字数" value={data && data.episodeTotalWords || 0} formatter={(value: number) => value / 10000 > 0 ? `${value / 1000.0} 万字` : `${value} 字`} />
                    </Col>
                  </Row>
                  }
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <ChartView
              api={API.CreatorDashboardCreativeCategoryStatistics}
              title="创作图书类别情况"
              renderChart={(data) => (
                <ResponsiveContainer
                  width="100%"
                  height={260}
                >
                <PieChart>
                    <Pie
                      activeIndex={this.state.activeIndex}
                      activeShape={renderActiveShape}
                      data={data}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8224d8"
                      dataKey="bookCount"
                      onMouseEnter={this.onPieEnter}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            />
          </Col>
          <Col span={24}>
            <ChartView
              title="创作图书阅读情况"
              api={API.CreatorDashboardBookCreativeStatistics}
              renderChart={(data) => (<ResponsiveContainer
                width="100%"
                minHeight={320}
              >
                <BarChart
                  data={data}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bookName" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                  <ReferenceLine y={0} stroke="#000" />
                  <Brush dataKey="bookName" height={30} stroke="#8884d8" />
                  <Bar name="阅读数" dataKey="bookReads" stroke="#8884d8" />
                  <Bar name="章节数" dataKey="bookEpisodes" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>)}
            />
          </Col>
        </Row>
      </div>
    )
  }
}