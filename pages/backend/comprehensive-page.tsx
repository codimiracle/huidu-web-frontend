import { Button, Divider, Form, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import ActivityManager from '../../components/backend/managers/activity-manager';
import CategorySelect from '../../components/backend/util/category-select';
import CategoryBar from '../../components/category-bar';
import InitializerView from '../../components/ui/initializer-view';
import { API } from '../../configs/api-config';
import { ListJSON } from '../../types/api';
import { Category } from '../../types/category';
import { fetchDataByGet, fetchMessageByPost } from '../../util/network-util';

export interface ComprehensivePageDesignProps {
  form: WrappedFormUtils;
};
export interface ComprehensivePageDesignState {
  saving: boolean;
  initializing: boolean;
  initialized: boolean;
  collections: Array<Category>;
  categories: Array<Category>;
};

export class ComprehensivePageDesign extends React.Component<ComprehensivePageDesignProps, ComprehensivePageDesignState> {
  async getClientSideProps() {
    let categoriesData = await fetchDataByGet<ListJSON<Category>>(API.ComprehensivePageCategories);
    let collectionsData = await fetchDataByGet<ListJSON<Category>>(API.ComprehensivePageCollections);
    return {
      collections: collectionsData.list,
      categories: categoriesData.list
    }
  }
  constructor(props: ComprehensivePageDesignProps) {
    super(props);
    this.state = {
      saving: false,
      initializing: false,
      initialized: false,
      collections: [],
      categories: []
    }
  }
  onSave() {
    const { form } = this.props;
    form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        this.setState({ saving: true });
        fetchMessageByPost(API.BackendComprehensivePage, values).then((msg) => {
          if (msg.code == 200) {
            message.success("保存成功!");
          } else {
            message.error(`保存失败：${msg.message}`);
          }
        }).catch((err) => {
          message.error(`保存失败：${err}`)
        }).finally(() => {
          this.setState({ saving: false });
        })
      }
    })
  }
  render() {
    const { form } = this.props;
    const { categories, collections } = this.state;
    return (
      <>
        <h2>首页设计</h2>
        <p>设计首页展示的方式</p>
        <Divider type="horizontal" />
        <div>
          <h3>可预览式幻灯片</h3>
          <p>设定首页显示的幻灯片，您最多可以显示 <span style={{ color: 'red' }}>6</span> 个已激活幻灯片</p>
          <div>
            <ActivityManager />
          </div>
          <Divider type="horizontal" />
          <InitializerView
            initializer={() => this.getClientSideProps()}
            onInitialized={(data) => this.setState(data)}
          >
            <>
              <h3>类别展览条</h3>
              <p>设定展示的类别</p>
              <div>
                <FormItem label="展示类别">
                  {
                    form.getFieldDecorator('categoryIds', {
                      initialValue: this.state.categories.map((category) => category.id) || undefined,
                      rules: [
                        { required: true, message: '请选择 3 个展览类别' },
                        { validator: (rule, value, callback) => (value.length < 4 ? callback() : callback(new Error("超过 3 个类别"))), message: '最多 3 个展示类别' }
                      ]
                    })(
                      <CategorySelect
                        multiple
                        initialDataSource={this.state.categories}
                      />
                    )
                  }
                </FormItem>
                <CategoryBar categories={this.state.categories} />
              </div>
              <Divider type="horizontal" />

              <h3>内容展览（带右侧栏）：第一栏</h3>
              <div>
                <FormItem label="榜单">
                  {
                    form.getFieldDecorator('collectionIds[0]', {
                      initialValue: collections && collections[0] && collections[0].id || undefined,
                      rules: [{ required: true, message: '请选择第一个内容栏榜单' }]
                    })(
                      <CategorySelect
                        collection
                        initialDataSource={collections && collections[0] && [collections[0]] || undefined}
                      />
                    )
                  }
                </FormItem>
              </div>
              <Divider type="horizontal" />

              <h3>内容展览（带右侧栏）：第二栏</h3>
              <div>
                <FormItem label="榜单">
                  {
                    form.getFieldDecorator('collectionIds[1]', {
                      initialValue: collections && collections[1] && collections[1].id || undefined,
                      rules: [{ required: true, message: '请选择第一个内容栏榜单' }]
                    })(
                      <CategorySelect
                        collection
                        initialDataSource={collections && collections[1] && [collections[1]] || undefined}
                      />
                    )
                  }
                </FormItem>
              </div>
              <Divider type="horizontal" />
              <Button size="large" loading={this.state.saving} onClick={() => this.onSave()} type="primary">保存</Button>
            </>
          </InitializerView>
        </div>
      </>
    )
  }
}

const WrappedComprehensivePageDesign = Form.create<ComprehensivePageDesignProps>({ name: 'comprehensive-page-design-form' })(ComprehensivePageDesign);

export default WrappedComprehensivePageDesign;