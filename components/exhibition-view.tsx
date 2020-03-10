import { Button, Col, List, message, Row } from 'antd';
import { ListGridType } from 'antd/lib/list';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import Link from 'next/link';
import React from 'react';
import { API } from '../configs/api-config';
import { ListJSON } from '../types/api';
import { Category, Tag } from '../types/category';
import { fetchDataByGet } from '../util/network-util';

export interface ExhibitionViewProps<T> {
  category: Category;
  count?: number;
  grid?: ListGridType;
  renderItem?: (item: T, index: number) => React.ReactNode;
  title?: string;
  asideTitle?: string;
  aside: React.ReactNode;
};
export interface ExhibitionViewState<T> {
  loading: boolean,
  page: number,
  limit: number,
  list: Array<T>,
  total: number,
  selectedTag: Tag,
};

export default class ExhibitionView<T> extends React.Component<ExhibitionViewProps<T>, ExhibitionViewState<T>> {
  constructor(props: ExhibitionViewProps<T>) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
      limit: this.props.count || 6,
      list: [],
      total: 0,
      selectedTag: props.category && props.category.tags[0]
    }
  }
  fetchList(page: number, limit: number) {
    const { category } = this.props;
    const { selectedTag } = this.state;
    this.setState({ loading: true });
    fetchDataByGet<ListJSON<T>>(API.CategoryItemsCollection, {
      category_id: category.id,
      filter: {
        tagId: selectedTag.id
      },
      page: page,
      limit: limit
    }).then((data) => {
      this.setState({ page: data.page, limit: data.limit, total: data.total, list: data.list });
    }).catch((err) => {
      message.error(`${err}`);
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  onNextList() {
    const { page, limit } = this.state;
    this.fetchList(page, limit);
  }
  onTagChange(tag: Tag) {
    this.setState({ selectedTag: tag });
  }
  componentDidMount() {
    const { page, limit } = this.state;
    this.fetchList(page, limit);
  }
  render() {
    const { title, asideTitle, category } = this.props;
    const { selectedTag, loading, list } = this.state;
    let renderringTitle = title || category.name;
    let renderringAsideTitle = asideTitle || category.extra && category.extra.asideTitle;
    return (
      <div className="exhibition-view">
        <Row gutter={16}>
          <Col
            span={17}
          >
            <div className="exhibition-header">
              <h2 className="exhibition-title">{renderringTitle}</h2>
              <div className="tags-list">
                {
                  category.tags.map((tag) => <CheckableTag checked={selectedTag && selectedTag.id == tag.id} key={tag.id} onChange={() => this.onTagChange(tag)}>{tag.name}</CheckableTag>)
                }
              </div>
              <div className="exhibition-tools">
                <Button size="small" type="link" loading={loading} icon="sync" onClick={() => this.onNextList()}>换一换</Button>
                <Link href="/categories/[category_id]" as={`/categories/${category.id}`}><a><Button size="small" type="link">更多...</Button></a></Link>
              </div>
            </div>
            <List
              grid={this.props.grid || { column: 2 }}
              loading={loading}
              renderItem={this.props.renderItem}
              dataSource={list}
            />
          </Col>
          <Col span={7}>
            {renderringAsideTitle && <h3>{renderringAsideTitle}</h3>}
            <div className="exhibition-aside">{this.props.aside}</div>
          </Col>
        </Row >
        <style jsx>{`
          .exhibition-header {
            display: flex;
            align-items: center;
          }
          .exhibition-title {
            margin-bottom: 0;
          }
          .tags-list {
            padding: 0 0.5em;
            flex: 1;
          }
        `}</style>
      </div >
    )
  }
}