import { Divider, message, Tag } from 'antd';
import { ColumnProps, SorterResult } from 'antd/lib/table';
import React from 'react';
import EntityAction from '../../../components/backend/entity-action';
import EntityManager from '../../../components/backend/entity-manager';
import { SearchableColumn } from '../../../components/backend/entity-search';
import HeaderBar from '../../../components/backend/header-bar';
import WrappedLogisticsInfomationDialog from '../../../components/dialogs/logistics-infomation-dialog';
import OrderDetailsDialog from '../../../components/dialogs/order-details-dialog';
import { API } from '../../../configs/api-config';
import { Order, OrderStatus, OrderType, ORDER_STATUS_COLORS, ORDER_STATUS_TEXTS, ORDER_TYPE_TEXTS, PAY_TYPE_TEXTS } from '../../../types/order';
import { User } from '../../../types/user';
import DatetimeUtil from '../../../util/datetime-util';
import { fetchMessageByDelete } from '../../../util/network-util';

function moneyFormat(m: number): string {
  let s = m + "";
  let minorPart = s.substring(s.length - 2);
  let marjor = s.substring(0, s.length - 2);
  if (s.length < 3) {
    marjor = "0";
  }
  if (minorPart.length < 2) {
    minorPart = "0" + minorPart;
  }
  return `￥${marjor}.${minorPart}`;
}

const getColumns = (filter: Partial<Record<keyof Order, string[]>>, sorter: SorterResult<Order>): Array<ColumnProps<Order>> => {
  return [
    {
      title: '订单编号',
      key: 'orderNumber',
      dataIndex: 'orderNumber',
      width: '213px',
      fixed: 'left'
    },
    {
      title: '订单类型',
      key: 'type',
      dataIndex: 'type',
      filters: Object.values(OrderType).map((orderType) => ({ text: ORDER_TYPE_TEXTS[orderType], value: orderType })),
      onFilter: (value, record) => record.status == value,
      filteredValue: filter && filter.type || null,
      render: (text) => (ORDER_TYPE_TEXTS[text] || '未知')
    },
    {
      title: '支付类型',
      key: 'payType',
      dataIndex: 'payType',
      render: (text) => (PAY_TYPE_TEXTS[text] || '未知')
    },
    {
      title: '所属用户(用户名)',
      key: 'owner',
      dataIndex: 'owner',
      render: (owner: User, order) => (<span>{owner.nickname}({owner.username})</span>)
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      render: (value) => DatetimeUtil.format(value)
    },
    {
      title: '订单状态',
      key: 'status',
      width: '108px',
      dataIndex: 'status',
      fixed: 'right',
      filters: Object.values(OrderStatus).map((status) => ({ text: ORDER_STATUS_TEXTS[status], value: status })),
      onFilter: (value, record) => record.status == value,
      filteredValue: filter && filter.status || null,
      render: (value) => <Tag color={ORDER_STATUS_COLORS[value]}>{ORDER_STATUS_TEXTS[value]}</Tag>
    },
    {
      title: '订单金额',
      key: 'totalMoney',
      width: '108px',
      dataIndex: 'totalMoney',
      fixed: 'right',
      sorter: (a, b) => a.totalMoney.amount - b.totalMoney.amount,
      sortOrder: sorter && sorter.columnKey === 'totalMoney' && sorter.order || false,
      render: (value) => (<span style={{ color: 'red' }}>{value.currencyUnit.symbol}{value.amountMajor}.{value.minorPart}</span>)
    }
  ];
}


export interface ShoppingOrdersProps {
  list: Array<Order>,
  total: number
};
export interface ShoppingOrdersState {
};

export default class ShoppingOrders extends React.Component<ShoppingOrdersProps, ShoppingOrdersState> {
  constructor(props: ShoppingOrdersProps) {
    super(props);
    this.state = {
    };
  }
  getSearchableColumns(): Array<SearchableColumn<Order>> {
    return [
      {
        name: '订单编号',
        field: 'orderNumber'
      },
      {
        name: '所属用户',
        field: 'owner'
      }
    ];
  }
  render() {
    return (
      <>
        <HeaderBar
          title="订单管理"
          hint="这里列出了系统中存在的订单，您可以对订单进行操作，这将反馈给用户。"
        />
        <Divider type="horizontal" />
        <EntityManager
          bulkBarExtra={
            (selectedRowKeys, selectedRows) => {
              return <>
                无，总金额：<span className="huidu-money">{moneyFormat(selectedRows.map((o) => o.totalMoney.amountMinorLong).reduce((a, b) => a + b, 0))}</span> 元
              </>
            }
          }
          actionOptionsExtra={(entity, index, updater) =>
            <>
              <EntityAction
                entity={entity}
                name="查看"
                renderDialog={(entity: Order, visible: boolean, cancelor) =>
                  <OrderDetailsDialog order={entity} visible={visible} onCancel={cancelor} />
                }
              />
              {
                [OrderStatus.AwaitingShipment, OrderStatus.AwaitingDelivery].includes(entity.status) &&
                <>
                  <Divider type="vertical" />
                  <EntityAction
                    entity={entity}
                    name="更新物流"
                    renderDialog={(entity: Order, visible, cancelor) =>
                      <WrappedLogisticsInfomationDialog
                        orderNumber={entity.orderNumber}
                        logisticsInformation={entity.logisticsInformation}
                        onUpdated={(updatedLogisticsInformation) => {
                          entity.logisticsInformation = updatedLogisticsInformation;
                          entity.status = OrderStatus.AwaitingDelivery;
                          updater(entity);
                        }}
                        visible={visible}
                        onCancel={cancelor}
                      />
                    }
                  />
                </>
              }
              {
                [OrderStatus.AwaitingShipment].includes(entity.status) &&
                <>
                  <Divider type="vertical" />
                  <EntityAction
                    entity={entity}
                    name="退单"
                    onClick={(entity, setLoading) => {
                      setLoading(true);
                      fetchMessageByDelete(API.BackendOrderChargeback, {
                        order_number: entity.orderNumber
                      }).then((data) => {
                        message.success('退单成功！');
                        updater(entity);
                      }).catch((err) => {
                        message.error(`退单失败：${err.message}`)
                      }).finally(() => {
                        setLoading(false);
                      })
                    }}
                  />
                </>
              }
            </>
          }
          rowKey={(entity) => entity.orderNumber}
          config={{
            list: API.BackendOrderCollection,
            searchableColumns: this.getSearchableColumns()
          }}
          scroll={{ x: 1500 }}
          columns={getColumns}
          initialTotal={this.props.total}
          initialDataSource={this.props.list}
        />
        <style jsx>{`
          .tools-bar {
            padding: 0.5em 0;
          }
        `}</style>
      </>
    )
  }
}