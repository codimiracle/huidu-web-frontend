import React from 'react';
import { Row, Col, Form, Tabs, List, Select, DatePicker, Button, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Order, Money } from '../../types/order';
import { fetchDataByGet } from '../../util/network-util';
import { API } from '../../configs/api-config';
import { OrderListJSON } from '../api/user/orders';
import EntityManager from '../../components/backend/entity-manager';
import useSWR from 'swr';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;


const RECHARGE_QUOTA = [
  { rmb: '1', hb: '100' },
  { rmb: '3', hb: '300' },
  { rmb: '5', hb: '500' },

  { rmb: '10', hb: '1000' },
  { rmb: '30', hb: '3000' },
  { rmb: '50', hb: '5000' },

  { rmb: '100', hb: '10000' },
  { rmb: '300', hb: '30000' },
  { rmb: '500', hb: '50000' },
]

export interface OrderRecordFilterProps {
  form: WrappedFormUtils
}

function OrderRecordFilter(props: OrderRecordFilterProps) {
  return (
    <>
    </>
  );
}

const WrappedOrderRecordFilter = Form.create<OrderRecordFilterProps>({ name: 'order-record-filter-form' })(OrderRecordFilter);

export interface UserCentralWalletProps {
};
export interface UserCentralWalletState {
  list: Array<Order>,
  page: number,
  limit: number,
  total: number,
  loading: boolean,
};

interface UserAccount {
  userId: string;
  balance: Money;
}

function UserAccountBalance() {
  const { data } = useSWR<UserAccount>(API.UserAccountBalance, fetchDataByGet);
  return <span>HC {data.balance.amountMinorLong}</span>
}

export default class UserCentralWallet extends React.Component<UserCentralWalletProps, UserCentralWalletState> {
  constructor(props: UserCentralWalletProps) {
    super(props);
    this.state = {
      list: [],
      page: 1,
      limit: 10,
      total: 0,
      loading: false
    }
  }
  
  render() {
    const { list } = this.state;
    return (
      <>
        <div>
          <h2>钱包</h2>
          <Row type="flex">
            <Col span={6}>
              <h3>余额</h3>
              <FormItem label="绘币">
                <strong><UserAccountBalance /></strong>
              </FormItem>
            </Col>
            <Col span={10}>
              <h3>充值<span className="hint-text">1元 = 100绘币</span></h3>
              <List
                grid={{ gutter: 8, column: 3 }}
                renderItem={(data: { rmb: string, hb: string }) =>
                  <>
                    <List.Item>
                      <Button size="large" style={{ width: '110px', height: 'inherit', padding: '8px' }}>
                        <div className="recharge">{data.hb} 绘币</div>
                        <div className="recharge-assist" style={{ float: 'right', color: 'rgba(0,0,0,0.45)', textAlign: 'right' }}>￥{data.rmb}</div>
                      </Button>
                    </List.Item>
                  </>
                }
                dataSource={RECHARGE_QUOTA}
              />
            </Col>
          </Row>
          <h3>交易记录</h3>
          <div className="hightline">统计：{}绘币（约合 {} 元）</div>
        </div>
        <style jsx>{`
          .hightline {
            color: #ff2f00; 
          }
          .hint-text {
            padding-left: 4px;
            font-size: 0.6em;
            color: rgba(0,0,0,0.45);
          }
        `}</style>
      </>
    )
  }
}