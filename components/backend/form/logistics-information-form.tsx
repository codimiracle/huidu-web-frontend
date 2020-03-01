import React from 'react';
import { LogisticsInformation, PassingPoint, PassingPointStatus } from '../../../types/logistics-information';
import { Row, Col, Input, Select, AutoComplete, Icon, Button, Divider } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

export interface LogisticsInformationFormProps {
  form: WrappedFormUtils,
  logisticsInformation?: LogisticsInformation;
};
export interface LogisticsInformationFormState {
  passingPoints: Array<PassingPoint>;
};

export default class LogisticsInformationForm extends React.Component<LogisticsInformationFormProps, LogisticsInformationFormState> {
  constructor(props: LogisticsInformationFormProps) {
    super(props);
    this.state = {
      passingPoints: [],
    };
  }
  private onPassingPointDelete(index: number) {
    this.setState({ passingPoints: this.state.passingPoints.filter((e, i) => i != index) })
  }
  private onPassingPointAdd() {
    this.setState({ passingPoints: this.state.passingPoints.concat({ name: undefined, status: 'doing' }) });
  }
  render() {
    const { form, logisticsInformation } = this.props;
    const { passingPoints } = this.state;
    let renderringPassingPoints = (logisticsInformation.passingPoints || []).concat(passingPoints)
    return (
      <>
        <Row type="flex" gutter={16}>
          <Col>
            <FormItem label="快递单号">
              {
                form.getFieldDecorator('expressNumber', {
                  initialValue: logisticsInformation && logisticsInformation.expressNumber || undefined,
                  rules: [{ required: true, message: '请输入快递单号' }]
                })(<Input placeholder="快递单号" disabled={!!logisticsInformation} />)
              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label="快递公司">
              {
                form.getFieldDecorator('expressCompany', {
                  initialValue: logisticsInformation && logisticsInformation.expressCompany || undefined,
                  rules: [{ required: true, message: '请选择相应的快递公司' }]
                })(
                  <AutoComplete
                    placeholder="快递公司"
                    disabled={!!logisticsInformation}
                  >
                    {["中通", "圆通", "顺丰", "天天"].map((value) => <AutoComplete.Option key={value} value={value}>{value}</AutoComplete.Option>)}
                  </AutoComplete>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Divider type="horizontal" />
        {
          renderringPassingPoints.map((passingPoint, index) =>
            <Row type="flex" gutter={16} key={index}>
              {form.getFieldDecorator(`passingPoints[${index}].id`, { initialValue: passingPoint.id })(<span></span>)}
              <Col>
                <FormItem label="途经点描述">
                  {
                    form.getFieldDecorator(`passingPoints[${index}].name`, {
                      initialValue: passingPoint.name || undefined,
                      rules: [{ required: true, message: '请描述这个途经' }]
                    })(
                      <TextArea placeholder="途经描述" disabled={!!passingPoint.id} />
                    )
                  }
                </FormItem>
              </Col>
              <Col>
                <FormItem label="途经状态">
                  {
                    form.getFieldDecorator(`passingPoints[${index}].status`, {
                      initialValue: passingPoint.status || undefined,
                      rules: [{ required: true, message: '请选择途经状态，或删除这个途经' }]
                    })(
                      <Select
                        disabled={!!passingPoint.id && passingPoint.status == PassingPointStatus.Done}
                      >
                        <Select.Option value="doing">处理中</Select.Option>
                        <Select.Option value="done">已出发</Select.Option>
                      </Select>
                    )
                  }
                  {
                    index > 0 && !passingPoint.id &&
                    <Button
                      size="small"
                      shape="circle"
                      type="dashed"
                      icon="minus"
                      onClick={() => this.onPassingPointDelete(index - logisticsInformation.passingPoints.length)}
                      style={{ marginLeft: '8px' }}
                    />
                  }
                </FormItem>
              </Col>
            </Row>
          )
        }
        <FormItem>
          <Button type="dashed" onClick={() => this.onPassingPointAdd()}>添加途经</Button>
        </FormItem>
      </>
    )
  }
}