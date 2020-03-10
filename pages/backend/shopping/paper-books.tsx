import React from 'react';
import HeaderBar from '../../../components/backend/header-bar';
import EntityManager from '../../../components/backend/entity-manager';
import { PaperBook } from '../../../types/paper-book';
import { fetchDataByGet } from '../../../util/network-util';
import { ListJSON } from '../../../types/api';
import { API } from '../../../configs/api-config';
import { SorterResult, ColumnProps } from 'antd/lib/table';
import { Tag } from 'antd';
import { COMMODITY_STATUS_COLORS, COMMODITY_STATUS_TEXTS, CommodityStatus, Commodity } from '../../../types/commodity';
import PaperBookForm from '../../../components/backend/form/paper-book-form';

export interface PaperBookManagerProps {
  list: Array<PaperBook>,
  total: number
};
export interface PaperBookManagerState { };

export default class PaperBookManager extends React.Component<PaperBookManagerProps, PaperBookManagerState> {
  static async getInitialProps() {
    let paperBooksData = await fetchDataByGet<ListJSON<PaperBook>>(API.BackendPaperBookCollection, {
      filter: null,
      sorter: null,
      page: 1,
      limit: 10,
    });
    return {
      list: paperBooksData.list,
      total: paperBooksData.total
    }
  }
  constructor(props: PaperBookManagerProps) {
    super(props);
    this.state = {

    }
    this.getColumns = this.getColumns.bind(this);
  }
  getColumns(filter: Partial<Record<keyof PaperBook, string[]>>, sorter: SorterResult<PaperBook>): ColumnProps<PaperBook>[] {
    return [
      {
        title: '图书封面',
        key: 'cover',
        dataIndex: 'commodity',
        render: (commodity) => <img src={commodity.picture} style={{ width: '7em', height: '9.4em' }} />
      },
      {
        title: '书名',
        key: 'title',
        dataIndex: 'commodity',
        render: (commodity) => commodity.name
      },
      {
        title: '作者',
        key: 'author',
        dataIndex: 'metadata',
        render: (metadata) => metadata.author
      },
      {
        title: '状态',
        key: 'commodityStatus',
        filters: Object.values(CommodityStatus).map((status) => ({ text: COMMODITY_STATUS_TEXTS[status], value: status })),
        onFilter: (value, record) => record.commodity.status == value,
        filteredValue: filter && (filter as any).commodityStatus || null,
        dataIndex: 'commodity',
        render: (commodity) => <Tag color={COMMODITY_STATUS_COLORS[commodity.status]}>{COMMODITY_STATUS_TEXTS[commodity.status]}</Tag>
      },
      {
        title: '发布年份',
        key: 'publishYear',
        width: '128px',
        sorter: (a, b) => parseInt(a.publishYear) - parseInt(b.publishYear),
        sortOrder: sorter && sorter.columnKey === 'publishYear' ? sorter.order : false,
        dataIndex: 'publishYear',
      },
      {
        title: '图书销量',
        key: 'commoditySales',
        sorter: (a, b) => a.commodity.sales - b.commodity.sales,
        sortOrder: sorter && sorter.columnKey === 'commoditySales' ? sorter.order : false,
        render: (commodity) => commodity.sales,
        dataIndex: 'commodity',
      },
      {
        title: '图书价格',
        key: 'commodityPrices',
        dataIndex: 'commodity',
        sorter: (a, b) => a.commodity.prices - b.commodity.prices,
        sortOrder: sorter && sorter.columnKey === 'commodityPrices' ? sorter.order : false,
        render: (commodity) => <span style={{ color: 'red' }}>￥{commodity.prices}</span>
      }
    ];
  }
  render() {
    return (
      <>
        <HeaderBar
          title="管理纸质书"
          hint="管理纸质书的信息和关联相应的购买项"
        />
        <EntityManager
          config={{
            list: API.BackendPaperBookCollection,
            searchableColumns: [{ name: '书名', field: 'metadataName' }, { name: '作者', field: 'metadataAuthor' }, { name: '年份', field: 'publishYear' }],
            create: API.BackendPaperBookCreate,
            renderCreateForm: (form) => <PaperBookForm form={form} />,
            update: API.BackendPaperBookUpdate,
            getUpdateRequestData: (form, entity) => ({
              paper_book_id: entity.id,
              ...form.getFieldsValue()
            }),
            renderUpdateForm: (form, entity) => <PaperBookForm form={form} book={entity} />,
            delete: API.BackendPaperBookDelete,
            getDeleteRequestData: (entity) => ({ paper_book_id: entity.id })
          }}
          columns={this.getColumns}
          rowKey={(paperBook) => paperBook.id}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}