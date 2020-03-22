import { Icon, List } from 'antd';
import React from 'react';
import { OrderDetails } from '../types/order';
import MoneyUtil from '../util/money-util';
import CommodityMiniView from './commodity/commodity-mini-view';

interface DetailsItemViewProps {
  details: OrderDetails
}

function DetailsItemView(props: DetailsItemViewProps) {
  const { details } = props;
  return (
    <>
      <CommodityMiniView commodity={details.commodity} />
      <div>数量：{details.quantity}</div>
      <div className="huidu-money">{MoneyUtil.format(details.prices)}</div>
    </>
  );
}


export interface OrderDetailsListProps {
  dataSource: Array<OrderDetails>,
  collapse?: boolean
};
export interface OrderDetailsListState {
  fold: boolean
};

export default class OrderDetailsList extends React.Component<OrderDetailsListProps, OrderDetailsListState> {
  constructor(props) {
    super(props);
    this.state = {
      fold: false
    }
  }
  onFoldToggle() {
    this.setState((state, props) => {
      return { fold: !state.fold }
    })
  }
  render() {
    const { collapse, dataSource } = this.props;
    const { fold } = this.state;
    const firstDetails = dataSource[0];
    return (
      <div className="order-details-list">
        {
        firstDetails ?
          (<>
            {
              collapse &&
              <a className="fold-toggle-button" onClick={() => this.onFoldToggle()}>{fold ? '收缩' : '展开'} <Icon type={fold ? 'up' : 'down'} /></a>
            }
            {
              collapse && !fold &&
              <div className="ant-list-item" style={{ justifyContent: 'space-between' }}>
                <DetailsItemView details={firstDetails} />
              </div>
            }
            {
              ((collapse && fold) || !collapse) &&
              < List
                renderItem={(item) => (
                  <List.Item key={item.commodity.id} style={{ justifyContent: 'space-between' }}>
                    <DetailsItemView details={item} />
                  </List.Item>
                )}
                dataSource={dataSource}
              />
            }
          </>) :
          <span>无订单详情</span>
        }
        <style jsx>{`
          .order-details-list {
            position: relative;
          }
          .fold-toggle-button {
            position: absolute;
            right: 0;
            top: 140px;
            z-index: 1;
          }
        `}</style>
      </div>
    )
  }
}