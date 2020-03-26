import { Button, Checkbox, Divider, List, message, Popconfirm } from "antd";
import Link from "next/link";
import React from "react";
import { API } from "../../configs/api-config";
import { ListJSON } from "../../types/api";
import { CartItem } from "../../types/cart";
import { fetchDataByGet, fetchMessageByDelete } from "../../util/network-util";
import InitializerView from "../ui/initializer-view";
import CartItemView from "./cart-item-view";
import CollectionUtil from "../../util/collection-util";

export interface CartListProps {
  onSelected?: (selectedKeys: [], selectedCartItems: CartItem[]) => void;
};
export interface CartListState {
  list: Array<CartItem>;
  loading: boolean;
  deleting: boolean;
  page: number;
  limit: number;
  total: number;
  checkedMap: any;
};

export class CartList extends React.Component<CartListProps, CartListState> {
  constructor(props: CartListProps) {
    super(props);
    this.state = {
      loading: false,
      deleting: false,
      list: [],
      page: 1,
      limit: 10,
      total: 0,
      checkedMap: {}
    }
  }
  fetchList(page?: number, limit?: number) {
    fetchDataByGet<ListJSON<CartItem>>(API.UserCartItems, {
      filter: null,
      sorter: null,
      page: page || this.state.page,
      limit: limit || this.state.limit,
    }).then((data) => {
      this.setState((state) => ({ page: data.page, limit: data.limit, list: state.list.concat(data.list), total: data.total }))
    }).catch((err) => {
      message.error(`${err.message}`)
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  onSelectAll(checked: boolean) {
    let checkedMap = { ...this.state.checkedMap };
    this.state.list.forEach((item) => {
      checkedMap[item.id] = checked ? item : undefined;
    })
    this.setState({ checkedMap: checkedMap });
  }
  onDeleteCartItemsBulk(selectedCartItems: Array<CartItem>) {
    this.setState({ deleting: true });
    fetchMessageByDelete(API.UserCartItemBulkDelete, {
      ids: selectedCartItems.map((ci) => ci.id).join(',')
    }).then((msg) => {
      if (msg.code == 200) {
        message.success('删除成功！');
        this.fetchList(1, 10);
      } else {
        message.error(`删除失败：${msg.message}`);
      }
    }).catch((err) => {
      message.error(`删除失败：${err.message}`)
    }).finally(() => {
      this.setState({ deleting: false });
    });
  }
  render() {
    let selectedCartItems: Array<CartItem> = Object.values(this.state.checkedMap);
    return (
      <InitializerView
        initializer={async () => {
          return await fetchDataByGet<ListJSON<CartItem>>(API.UserCartItems, {
            filter: null,
            sorter: null,
            page: 1,
            limit: 10
          });
        }}
        onInitialized={(data) => {
          this.setState(data);
        }}
      >
        <Checkbox onChange={(e) => this.onSelectAll(e.target.checked)}>全选</Checkbox>
        <List
          loadMore={<div style={{ textAlign: 'center' }}>{this.state.list.length < this.state.total ? <a onClick={() => this.fetchList(this.state.page + 1)}>更多</a> : <span>已加载全部</span>}</div>}
          loading={this.state.loading}
          renderItem={(item, index) => <List.Item style={{ display: 'block' }}><CartItemView checked={this.state.checkedMap[item.id]} onCheckedChange={(item, checked) => this.setState((state) => {
            let checkedMap = { ...state.checkedMap };
            checkedMap[item.id] = checked ? item : undefined
            return {
              checkedMap: checkedMap
            }
          })} defaultValue={item} onDeleted={(item) => {
            this.setState((state) => {
              return { list: state.list.filter((e) => e.id != item.id) }
            })
          }} /></List.Item>}
          dataSource={this.state.list}
        />
        <div className="cart-appoxi">
          <div>
            选定：{selectedCartItems.length} 个项目
          </div>
          <div>
            总计：<span className="huidu-money">￥ {CollectionUtil.map(selectedCartItems, (item: CartItem) => item.commodity.prices.amount * item.quantity).reduce((a, b) => a + b, 0)}</span>
          </div>
        </div>
        <Divider type="horizontal" />
        <div className="cart-actions">
          <Link href={`/user/orderring?cart_items=${CollectionUtil.map(selectedCartItems, (i) => i.id).join(',')}`}><Button type="primary">结算</Button></Link> <Popconfirm title="你确定删除这些项目吗？" disabled={selectedCartItems.length == 0} onConfirm={() => this.onDeleteCartItemsBulk(selectedCartItems)}><Button type="danger" disabled={selectedCartItems.length == 0}>删除</Button></Popconfirm>
        </div>
        <style jsx>{`
          .cart-actions, .cart-appoxi {
            text-align: right;
          }
        `}</style>
      </InitializerView>
    )
  }
}