import { Button, Form, message, Modal, Result, Tabs } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import Password from "antd/lib/input/Password";
import { Router, withRouter } from "next/router";
import React from "react";
import { API } from "../../configs/api-config";
import { Order, OrderStatus } from "../../types/order";
import MoneyUtil from "../../util/money-util";
import { fetchMessageByPost } from "../../util/network-util";
import Link from "next/link";

const { TabPane } = Tabs;

export interface PaymentDialogProps {
  nolink?: boolean;
  onPaied: (order: Order) => void;
  visible: boolean;
  onCancel?: () => void;
  form: WrappedFormUtils<any>;
  recharge?: boolean;
  order: Order;
  router: Router;
}

export interface PaymentDialogState {
  paying: boolean;
  canceling: boolean;
  triggered: boolean;
  recharging: boolean;
  result: number;
  paymentType: string;
}


export class PaymentDialog extends React.Component<PaymentDialogProps, PaymentDialogState> {
  constructor(props: PaymentDialogProps) {
    super(props);
    this.state = {
      paying: false,
      canceling: false,
      triggered: false,
      recharging: false,
      result: 0,
      paymentType: props.recharge ? 'wechat' : 'huidu',
    }
  }
  onPay() {
    const { order, form, router } = this.props;
    form.validateFields((errors) => {
      if (!errors) {
        this.setState({ paying: true });
        fetchMessageByPost(API.UserOrderPay, {
          orderNumber: order.orderNumber,
          type: this.state.paymentType,
          password: form.getFieldValue('password')
        }).then((msg) => {
          if (msg.code == 200) {
            this.setState({ triggered: true, result: 1 });
            if (!this.props.nolink) {
              router.replace('/user-central/order-details/[order_number]', `/user-central/order-details/${order.orderNumber}`);
            }
            let newOrder = {...order};
            newOrder.status = OrderStatus.AwaitingShipment;
            this.props.onPaied && this.props.onPaied(newOrder);
          } else {
            message.error(`错误代码：${msg.code}: ${msg.message}`);
          }
        }).catch((err) => {
          message.error(`网络连接失败：${err}`);
        }).finally(() => {
          this.setState({ paying: false });
          form.resetFields();
        });
      }
    })
  }
  onVirtualPay() {
    this.setState({ recharging: true });
    fetchMessageByPost(API.UserAccountRechargePay, {
      orderNumber: this.props.order.orderNumber,
      type: this.state.paymentType
    }).then((msg) => {
      if (msg.code == 200) {
        this.setState({
          triggered: true,
          result: 1,
        });
        let newOrder = {...this.props.order};
        newOrder.status = OrderStatus.AwaitingShipment;
        this.props.onPaied && this.props.onPaied(newOrder);
      } else {
        message.error(`虚拟支付失败：${msg.message}`);
      }
    }).catch((err) => {
      message.error(`支付失败：${err}`);
    }).finally(() => {
      this.setState({ recharging: false });
    })
  }
  onCancel() {
    const { router } = this.props;
    if (!this.props.nolink) {
      this.setState({ triggered: true, result: 2 });
      message.info('订单尚未支付，请前往我的订单处理！');
      router.back();
    } else {
      this.props.onCancel();
    }
  }
  render() {
    const { order, form } = this.props;
    const { paying, canceling, triggered, result } = this.state;
    return (
      <>{
        order &&
        <Modal
          title="付款"
          visible={this.props.visible}
          onCancel={() => {
            this.props.onCancel()
            setTimeout(() =>
              this.setState({
                paying: false,
                canceling: false,
                triggered: false,
                recharging: false,
                result: 0,
                paymentType: this.props.recharge ? 'wechat' : 'huidu'
              }), 1000);
          }}
          closable={this.props.recharge}
          footer={null}
          width="415px"
          centered
        >
          {result == 0 &&
            <div className="container">
              <div>订单编号：{order.orderNumber}</div>
              <div>支付金额：</div>
              <div className="power"><strong className="huidu-money">{MoneyUtil.formatHC(order.totalMoney)}</strong></div>
              <Tabs activeKey={this.state.paymentType} onChange={(key) => this.setState({ paymentType: key })}>
                {
                  !this.props.recharge &&
                  <TabPane key="huidu" tab="荟读支付">
                    <Form>
                      <FormItem label="账户密码">
                        {
                          form.getFieldDecorator('password', {
                            rules: [
                              { required: true, message: '请输入密码!' }
                            ]
                          })(
                            <Password placeholder="请输入账户密码" />
                          )
                        }
                      </FormItem>
                    </Form>
                    <Button type="primary" loading={paying} disabled={canceling || triggered} size="large" onClick={() => this.onPay()}>支付</Button> <Button size="large" loading={canceling} disabled={paying || triggered} onClick={() => this.onCancel()}>取消</Button>
                  </TabPane>
                }
                <TabPane key="wechat" tab="微信">
                  <Button onClick={() => this.onVirtualPay()}>点击这里虚拟支付</Button>
                </TabPane>
              </Tabs>
            </div>
          }
          {
            result == 1 &&
            <div className="container">
              <Result
                status="success"
                title="订单已成功支付"
                subTitle={<span>订单编号：<Link href={`/api/user/orders/${order.orderNumber}`}><a>{order.orderNumber}</a></Link></span>}
              />
            </div>
          }
          {
            result == 2 &&
            <div className="container">
              <Result
                status="info"
                title="您的订单尚未支付"
                subTitle={<span>订单编号：<Link href={`/api/user/orders/${order.orderNumber}`}><a>{order.orderNumber}</a></Link></span>}
              />
            </div>
          }
        </Modal>
      }
        <style jsx>{`
          .container {
            text-align: center;
          }
          .power {
            padding: 1em 0;
          }
          `}</style>
      </>
    )
  }
}

export const WrappedPaymentDialog = withRouter(Form.create<PaymentDialogProps>({ name: 'payment-dialog' })(PaymentDialog));

export default WrappedPaymentDialog;