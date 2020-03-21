import React from 'react';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { Row, Col, Input, Radio, InputNumber } from 'antd';
import { ImageUpload } from '../../image-upload';
import TextArea from 'antd/lib/input/TextArea';
import FormItem from 'antd/lib/form/FormItem';
import { CommodityType, COMMODITY_TYPE_TEXTS, CommodityStatus, COMMODITY_STATUS_TEXTS, Commodity } from '../../../types/commodity';

export interface CommodityFormProps {
  form: WrappedFormUtils,
  commodity?: Commodity<any>,
  linked?: boolean,
};
export interface CommodityFormState { };

export default class CommodityForm extends React.Component<CommodityFormProps, CommodityFormState> {
  render() {
    const { form, commodity, linked } = this.props;
    if (commodity) {
      form.getFieldDecorator('commodityId', {initialValue: commodity.id});
    }
    if (linked) {
      form.getFieldDecorator('commodity.picture', { initialValue: form.getFieldValue('metadata.cover') });
      form.getFieldDecorator('commodity.name', { initialValue: form.getFieldValue('metadata.name') });
      form.getFieldDecorator('commodity.introduction', { initialValue: form.getFieldValue('metadata.description') });
    }
    return (
      <>
        {
          !linked &&
          <Row>
            <Col span={8}>
              <FormItem label="商品封面">
                {
                  form.getFieldDecorator('commodity.picture', {
                    initialValue: commodity && commodity.picture || undefined,
                    rules: [{ required: true, message: '请上传商品封面' }]
                  })(<ImageUpload />)
                }
              </FormItem>
            </Col>
            <Col span={16}>
              <FormItem label="商品名称">
                {
                  form.getFieldDecorator('commodity.name', {
                    initialValue: commodity && commodity.name || undefined,
                    rules: [{ required: true, message: '请输入商品名称' }]
                  })(<Input placeholder="商品名称" />)
                }
              </FormItem>
              <FormItem label="商品介绍">
                {
                  form.getFieldDecorator('commodity.introduction', {
                    initialValue: commodity && commodity.introduction || undefined,
                    rules: [{ required: true, message: '请输入商品介绍' }]
                  })(<TextArea placeholder="商品介绍" />)
                }
              </FormItem>
            </Col>
          </Row>
        }
        <Row>
          <Col span={8}>
            <FormItem label="商品类型">
              {
                form.getFieldDecorator('commodity.type', {
                  initialValue: commodity && commodity.type || CommodityType.MaterialObject,
                  rules: [{ required: true, message: '请选择商品类型' }]
                })(<Radio.Group disabled={linked}>
                  {Object.values(CommodityType).map((value) => <Radio key={value} value={value}>{COMMODITY_TYPE_TEXTS[value]}</Radio>)}
                </Radio.Group>)
              }
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem label="商品状态">
              {
                form.getFieldDecorator('commodity.status', {
                  initialValue: commodity && commodity.status || CommodityStatus.PutOnSale,
                  rules: [{ required: true, message: '请选择商品状态' }]
                })(
                  <Radio.Group>
                    {
                      Object.values(CommodityStatus).map((status) =>
                        (<Radio key={status} value={status}>{COMMODITY_STATUS_TEXTS[status]}</Radio>)
                      )
                    }
                  </Radio.Group>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="初始库存">
              {
                form.getFieldDecorator('commodity.stock', {
                  initialValue: commodity && commodity.stock || 100,
                  rules: [{ required: true, message: '请输入初始库存' }]
                })(
                  <InputNumber placeholder="初始库存" min={1} max={9999} />
                )
              }
            </FormItem>
          </Col>
          <Col span={16}>
            <Row>
              <Col span={12}>
                <FormItem label="单价">
                  {
                    form.getFieldDecorator('commodity.prices', {
                      initialValue: commodity && commodity.prices.amount || 0,
                      rules: [{ required: true, message: '请输入单价' }]
                    })(
                      <InputNumber
                        min={0}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      />
                    )
                  }
                  {form.getFieldValue('commodity.prices') == 0 && <span style={{ paddingLeft: '8px' }}>(免费)</span>}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="运费">
                  {
                    form.getFieldDecorator('commodity.shipment', {
                      initialValue: commodity && commodity.shipment.amount || 0,
                      rules: [{ required: true, message: '请设定运费' }]
                    })(
                      <InputNumber
                        min={0}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      />
                    )
                  }
                  {form.getFieldValue('commodity.shipment') == 0 && <span style={{ paddingLeft: '8px' }}>(包邮)</span>}
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="净重量(g)">
              {
                form.getFieldDecorator('commodity.weight', {
                  initialValue: commodity && commodity.weight || 500,
                  rules: [{ required: true, message: '请输入商品净重量' }]
                })(
                  <InputNumber
                    min={0}
                  />
                )
              }
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem label="商品规格">
              {
                form.getFieldDecorator('commodity.specification', {
                  initialValue: commodity && commodity.extra || '',
                })(
                  <TextArea rows={4} placeholder={`例如：\n开本：16k\n长：160mm\n宽：200mm`} />
                )
              }
            </FormItem>
          </Col>
        </Row>
      </>
    )
  }
}