import React from 'react';
import { Commodity, COMMODITY_STATUS_TEXTS, COMMODITY_STATUS_COLORS, COMMODITY_TYPE_TEXTS, CommodityType, CommodityStatus } from '../../../types/commodity';
import { API } from '../../../configs/api-config';
import EntityManager from '../../../components/backend/entity-manager';
import { SorterResult, ColumnProps } from 'antd/lib/table';
import { Tag, Rate } from 'antd';
import { ListJSON } from '../../../types/api';
import { fetchDataByGet } from '../../../util/network-util';
import CommodityForm from '../../../components/backend/form/commodity-form';
import HeaderBar from '../../../components/backend/header-bar';
import { SearchableColumn } from '../../../components/backend/entity-search';
import { WrappedFormUtils } from 'antd/lib/form/Form';

export interface CommodityManagerProps {
  list: Array<Commodity<any>>,
  total: number
};
export interface CommodityManagerState { };

export default class CommodityManager extends React.Component<CommodityManagerProps, CommodityManagerState> {
  constructor(props: CommodityManagerProps) {
    super(props);
    this.state = {

    }
    this.getColumns = this.getColumns.bind(this);
  }
  getColumns(filter: Partial<Record<keyof Commodity<any>, string[]>>, sorter: SorterResult<Commodity<any>>): Array<ColumnProps<Commodity<any>>> {
    return [
      {
        title: '商品图片',
        key: 'picture',
        fixed: 'left',
        width: 130,
        dataIndex: 'picture',
        render: (picture: string) => <img src={picture} style={{ width: '7em', height: '9.4em' }} />
      },
      {
        title: '商品名称',
        key: 'name',
        fixed: 'left',
        width: 128,
        dataIndex: 'name'
      },
      {
        title: '商品简介',
        key: 'introduction',
        dataIndex: 'introduction',
      },
      {
        title: '商品类型',
        key: 'type',
        dataIndex: 'type',
        filters: Object.values(CommodityType).map((type) => ({ text: COMMODITY_TYPE_TEXTS[type], value: type })),
        filteredValue: filter && filter.type || null,
        render: (type: CommodityType) => COMMODITY_TYPE_TEXTS[type]
      }, {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        filters: Object.values(CommodityStatus).map((status) => ({ text: COMMODITY_STATUS_TEXTS[status], value: status })),
        filteredValue: filter && filter.status || null,
        render: (status) => <Tag color={COMMODITY_STATUS_COLORS[status]}>{COMMODITY_STATUS_TEXTS[status]}</Tag>
      },
      {
        title: '商品库存',
        key: 'availableStock',
        dataIndex: 'availableStock',
        sorter: (a, b) => a.availableStock - b.availableStock,
        sortOrder: sorter && sorter.columnKey === 'availableStock' ? sorter.order : false,
      },
      {
        title: '已销售',
        key: 'sales',
        dataIndex: 'sales',
        sorter: (a, b) => a.sales - b.sales,
        sortOrder: sorter && sorter.columnKey === 'sales' ? sorter.order : false,
      },
      {
        title: '商品评价',
        key: 'rate',
        fixed: 'right',
        dataIndex: 'rate',
        sorter: (a, b) => a.rate - b.rate,
        sortOrder: sorter && sorter.columnKey === 'rate' ? sorter.order : false,
        render: (rate) => <Rate defaultValue={rate} disabled allowHalf style={{ fontSize: '1em' }} />
      },
      {
        title: '商品价格',
        key: 'prices',
        dataIndex: 'prices',
        fixed: 'right',
        sorter: (a, b) => a.prices - b.prices,
        sortOrder: sorter && sorter.columnKey === 'prices' ? sorter.order : false,
        render: (prices: number) => <span style={{ color: 'red' }}>￥{prices}</span>
      },
    ]
  }
  getSearchableColumns(): Array<SearchableColumn<Commodity<any>>> {
    return [
      {
        name: '商品名称',
        field: 'name'
      }
    ];
  }
  render() {
    let extractData = (form: WrappedFormUtils) => ({
      name: form.getFieldValue('commodity.name') || undefined,
      type: form.getFieldValue('commodity.type') || undefined,
      picture: form.getFieldValue('commodity.picture') || undefined,
      introduction: form.getFieldValue('commodity.introduction') || undefined,
      weight: form.getFieldValue('commodity.weight') || undefined,
      stock: form.getFieldValue('commodity.stock') || undefined,
      shipment: form.getFieldValue('commodity.shipment') || undefined,
      extra: form.getFieldValue('commodity.specification') || undefined,
      prices: form.getFieldValue('commodity.prices') || undefined,
      status: form.getFieldValue('commodity.status') || undefined,
    });
    return (
      <>
        <HeaderBar
          title="购买项管理"
          hint="管理系统中用于金额交易的商品，可以是虚拟物品或实物"
        />
        <EntityManager
          config={{
            list: API.BackendCommodityCollection,
            searchableColumns: this.getSearchableColumns(),
            create: API.BackendCommodityCreate,
            renderCreateForm: (form) => <CommodityForm form={form} />,
            getCreateRequestData: extractData,
            update: API.BackendCommodityUpdate,
            renderUpdateForm: (form, entity) => <CommodityForm form={form} commodity={entity} />,
            getUpdateRequestData: (form, entity) => {
              return {
                commodity_id: entity.id,
                ...extractData(form)
              }
            },
            delete: API.BackendCommodityDelete,
            getDeleteRequestData: (entity) => ({commodity_id: entity.id})
          }}
          scroll={{ x: 1200 }}
          columns={this.getColumns}
          rowKey={(commodity) => commodity.id}
          initialDataSource={this.props.list}
          initialTotal={this.props.total}
        />
      </>
    )
  }
}