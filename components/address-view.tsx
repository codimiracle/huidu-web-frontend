import React from 'react';
import { Address } from '../types/address';
import { Row, Col, Tag } from 'antd';

export interface AddressViewProps {
  address: Address
};
export interface AddressViewState { };

export default class AddressView extends React.Component<AddressViewProps, AddressViewState> {
  render() {
    let address = this.props.address || null;
    return (
      <div className="address-view">
        {
          address &&
          <Row type="flex">
            <Col>
              {address.defaulted && <Tag color="cyan">默认</Tag>}
            </Col>
            <Col>
              <table>
                <tbody>
                  <tr>
                    <td>地址：</td>
                    <td>{address.address}</td>
                    <td>邮编：</td>
                    <td>{address.postcode}</td>
                  </tr>
                  <tr>
                    <td>收件人：</td>
                    <td>{address.receiver.name}</td>
                    <td>联系电话：</td>
                    <td>{address.receiver.phone}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        }
      </div>
    )
  }
}