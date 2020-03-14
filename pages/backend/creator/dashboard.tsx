import { Col, Divider, Icon, Row, Statistic } from 'antd';
import React from 'react';
import HeaderBar from '../../../components/backend/header-bar';
import useSWR from 'swr';
import { API } from '../../../configs/api-config';
import { fetchDataByGet } from '../../../util/network-util';
import { StatisticsJSON } from '../../api/author/statistics';

export default function CreatorDashboard(props) {
  const { data, error } = useSWR<StatisticsJSON>(API.AuthorStatistics, fetchDataByGet);
  if (error) {
    return <div>加载作者数据页失败！</div>
  }
  if (!data) {
    return <>
      <h2>创作面板</h2>
      <div>加载中...</div>
    </>
  }
  if (data) {
    let statistics = data;
    return (
      <div>
        <HeaderBar
          title="创作中心"
          hint="作者创作的中心，这里展示了作者的创作数据"
        />
        <div>
          <h3>作品统计</h3>
          <Row gutter={16}>
            <Col span={12}><Statistic title="作品数" value={statistics.books} /></Col>
            <Col span={12}><Statistic title="总章节数" value={statistics.episodes} /></Col>
          </Row>
          <h3>关联内容统计</h3>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="点赞总数" value={statistics.likes} prefix={<Icon type="like" />} />
            </Col>
            <Col span={12}><Statistic title="作品评论数" value={statistics.comments} prefix={<Icon type="message" />} /></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Statistic title="作品点评数" value={statistics.reviews} /></Col>
            <Col span={12}><Statistic title="作品话题数" value={statistics.topics} /></Col>
          </Row>
        </div>
        <Divider type="horizontal" />
        <div>
          <p>撸起袖子加油干！！！</p>
        </div>
      </div>
    )
  }
}