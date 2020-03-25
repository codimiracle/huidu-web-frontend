import { Tag } from 'antd';
import { ColumnProps, SorterResult } from 'antd/lib/table';
import Link from 'next/link';
import React from 'react';
import EntityManager from '../../../../components/backend/entity-manager';
import ElectronicBookFrom from '../../../../components/backend/form/electronic-book-form';
import HeaderBar from '../../../../components/backend/header-bar';
import { API } from '../../../../configs/api-config';
import { ElectronicBook, ElectronicBookStatus, ELECTRONIC_BOOK_STATUS_COLORS, ELECTRONIC_BOOK_STATUS_TEXTS } from '../../../../types/electronic-book';
import Cover from '../../../../components/base/cover';

export interface ElectronicBookManagerProps {
  list: Array<ElectronicBook>;
  total: number;
};
export interface ElectronicBookManagerState { };

export default class ElectronicBookManager extends React.Component<ElectronicBookManagerProps, ElectronicBookManagerState> {
  constructor(props: ElectronicBookManagerProps) {
    super(props);
    this.state = {

    }
    this.getColumns = this.getColumns.bind(this);
  }
  getColumns(filter: Partial<Record<keyof ElectronicBook, string[]>>, sorter: SorterResult<ElectronicBook>): Array<ColumnProps<ElectronicBook>> {
    return [
      {
        title: '电子书封面',
        key: 'cover',
        dataIndex: 'metadata',
        render: (metadata) => <Cover src={metadata.cover} />
      },
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
        filteredValue: filter && filter.status || null,
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
        sortOrder: sorter && sorter.columnKey == "episodes" ? sorter.order : false
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
            searchableColumns: [{ name: '电子书名称', field: 'metadataName' }, { name: '作者', field: 'metadataAuthor' }, { name: '发布年份', field: 'publishYear' }],
            create: API.BackendElectronicBookCreate,
            renderCreateForm: (form) => <ElectronicBookFrom form={form} />,
            update: API.BackendElectronicBookUpdate,
            renderUpdateForm: (form, entity) => <ElectronicBookFrom form={form} book={entity} />,
            getUpdateRequestData: (form, entity) => ({
              electronic_book_id: entity.id,
              ...form.getFieldsValue()
            }),
            delete: API.BackendElectronicBookDelete,
            getDeleteRequestData: (entity) => ({electronic_book_id: entity.id})
          }}
          actionOptionsExtra={(entity, index) => <Link href="./electronic-books/[book_id]" as={`./electronic-books/${entity.id}`}><a>章节管理</a></Link>}
          rowKey={(electronicBook) => electronicBook.id}
          columns={this.getColumns}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}