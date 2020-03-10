import { Form, InputNumber } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { CSSProperties } from 'react';
import { Commodity, CommodityType } from '../types/commodity';
import CommodityView from './commodity-view';

export interface ShoppingCommodityViewProps {
  commodity: Commodity<any>,
  onChange: (commodity: Commodity<any>, quantity: number) => void,
  style?: CSSProperties
};
export interface ShoppingCommodityViewState {
  quantity: number,
};

export default class ShoppingCommodityView extends React.Component<ShoppingCommodityViewProps, ShoppingCommodityViewState> {
  public value: { commodity: Commodity<any>, quantity: number }
  constructor(props: ShoppingCommodityViewProps) {
    super(props);
    this.state = {
      quantity: 1,
    }
  }
  fireOnChange(commodity: Commodity<any>, quantity: number) {
    const { onChange } = this.props;
    onChange && onChange(commodity, quantity);
  }
  onChange(quantity: number) {
    const { commodity } = this.props;
    this.setState({ quantity: quantity });
    this.value = { commodity: commodity, quantity: quantity };
    this.fireOnChange(commodity, quantity);
  }
  componentDidMount() {
    const { commodity } = this.props;
    const { quantity } = this.state;
    this.fireOnChange(commodity, quantity);
  }
  render() {
    const { commodity, style } = this.props;
    const { quantity } = this.state;
    return (
      <div className="shopping-commodity-view" style={style}>
        <CommodityView commodity={commodity} />
        {
          commodity.type == CommodityType.MaterialObject &&
          <div>
            <Form layout="inline">
              <FormItem label="数量">
                <InputNumber min={1} max={commodity.stock} defaultValue={quantity} onChange={(value) => this.onChange(value)} />
              </FormItem>
            </Form>
          </div>
        }
        <div>
          <strong className="money">{commodity.prices * quantity}</strong>
        </div>
        <style jsx>{`
          .shopping-commodity-view {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .shopping-commodity-view > div {
            padding: 0 1.5em;
          }
          .money {
            font-size: 1em;
            color: #f30000;
          }
          .money::before {
            content: '￥';
          }
        `}</style>
      </div>
    )
  }
}