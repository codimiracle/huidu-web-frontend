import React from 'react';
import HeaderBar from '../../../../components/backend/header-bar';
import EntityManager from '../../../../components/backend/entity-manager';
import { API } from '../../../../configs/api-config';
import { fetchDataByGet } from '../../../../util/network-util';
import { ListJSON } from '../../../../types/api';
import { ColumnProps, SorterResult } from 'antd/lib/table';
import { ElectronicBook, ELECTRONIC_BOOK_STATUS_TEXTS, ElectronicBookStatus, ELECTRONIC_BOOK_STATUS_COLORS } from '../../../../types/electronic-book';
import { Tag } from 'antd';
import ElectronicBookFrom from '../../../../components/form/electronic-book-form';
import Link from 'next/link';

export interface ElectronicBookManagerProps {
  list: Array<ElectronicBook>;
  total: number;
};
export interface ElectronicBookManagerState { };

export default class ElectronicBookManager extends React.Component<ElectronicBookManagerProps, ElectronicBookManagerState> {
  static async getInitialProps() {
    let electronicBooksData = await fetchDataByGet<ListJSON<ElectronicBook>>(API.BackendElectronicBookCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10,
    })
    return {
      list: electronicBooksData.list,
      total: electronicBooksData.total
    }
  }
  constructor(props: ElectronicBookManagerProps) {
    super(props);
    this.state = {

    }
    this.getColumns = this.getColumns.bind(this);
  }
  getColumns(filter: Partial<Record<keyof ElectronicBook, string[]>>, sorter: SorterResult<ElectronicBook>): Array<ColumnProps<ElectronicBook>> {
    return [
      {
        title: '电子书名称',
        key: 'name',
        dataIndex: 'metadata',
        render: (metadata) => metadata.name
      }, {
        title: '电子书作者',
        key: 'author',
        dataIndex: 'metadata',
        render: (metadata) => metadata.author
      }, {
        title: '电子书状态',
        key: 'status',
        dataIndex: 'status',
        filters: Object.values(ElectronicBookStatus).map((status) => ({ text: ELECTRONIC_BOOK_STATUS_TEXTS[status], value: status })),
        filteredValue: filter.status,
        render: (status) => <Tag color={ELECTRONIC_BOOK_STATUS_COLORS[status]}>{ELECTRONIC_BOOK_STATUS_TEXTS[status]}</Tag>
      }, {
        title: '发布年份',
        key: 'publishYear',
        dataIndex: 'publishYear'
      }, {
        title: '章节数',
        key: 'episodes',
        dataIndex: 'episodes',
        sorter: (a, b) => a.episodes - b.episodes,
        sortOrder: sorter.columnKey == "episodes" ? sorter.order : false
      }
    ];
  }
  render() {
    return (
      <>
        <HeaderBar
          title="电子书管理"
          hint="管理创作的电子书"
        />
        <EntityManager
          config={{
            list: API.BackendElectronicBookCollection,
            searchableColumns: [{ name: '电子书名称', field: 'metadata.name' }, { name: '作者', field: 'metadata.author' }, { name: '发布年份', field: 'publishYear' }],
            create: API.BackendElectronicBookCreate,
            renderCreateForm: (form) => <ElectronicBookFrom form={form} />,
            update: API.BackendElectronicBookUpdate,
            renderUpdateForm: (form, entity) => <ElectronicBookFrom form={form} book={entity} />,
            delete: API.BackendElectronicBookDelete,
          }}
          actionOptionsExtra={(entity, index) => <Link href="/backend/contents/electronic-books/[book_id]" as={`/backend/contents/electronic-books/${entity.id}`}><a>章节管理</a></Link>}
          rowKey={(electronicBook) => electronicBook.id}
          columns={this.getColumns}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}