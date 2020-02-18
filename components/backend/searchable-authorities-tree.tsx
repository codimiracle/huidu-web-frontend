import { Tree } from "antd";
import Search from "antd/lib/input/Search";
import React, { ReactNode } from "react";
import { ALL_AUTHORITIES, getNavigationMenus } from "../../configs/backend-config";

const { TreeNode } = Tree;

const AUTHORITES_ENTRIES = getNavigationMenus(ALL_AUTHORITIES);

interface SearchAuthoriesTreeProps {
  value?: string[],
  onChange?: (checkedKeys: string[]) => void
}

interface SearchAuthoriesTreeState {
  expandedKeys: Array<string>,
  searchValue: string,
  autoExpandParent: boolean,
}

export class SearchAuthoriesTree extends React.Component<SearchAuthoriesTreeProps, SearchAuthoriesTreeState> {
  constructor(props: SearchAuthoriesTreeProps) {
    super(props);
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
    };
    this.onExpand = this.onExpand.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChecked = this.onChecked.bind(this);
  }
  onExpand(expandedKeys: Array<string>) {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onChecked(checkedKeys: string[]) {
    const { onChange } = this.props;
    onChange && onChange(checkedKeys);
  }
  onSearch(keyword: string) {
    const expandedKeys = [];
    function getParentKey(menus, keyword) {
      menus.forEach((item) => {
        if (keyword && item.title.indexOf(keyword) > -1) {
          expandedKeys.push(item.group || item.key)
        }
        if (item.menus){
          getParentKey(item.menus, keyword);
        }
      })
    }
    getParentKey(AUTHORITES_ENTRIES, keyword);
    this.setState({
      expandedKeys,
      searchValue: keyword,
      autoExpandParent: true,
    });
  };
  renderTreeNode(menus: Array<any>, keyword: string): ReactNode[] {
    return menus.map(item => {
      const index = item.title.indexOf(keyword);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + keyword.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{keyword}</span>
            {afterStr}
          </span>
        ) : (
            <span>{item.title}</span>
          );
      if (item.menus) {
        return (
          <TreeNode key={item.key} title={title}>
            {this.renderTreeNode(item.menus, keyword)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });
  }
  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="搜索权限" onChange={(event) => this.onSearch(event.target.value)} />
        <Tree
          defaultCheckedKeys={this.props.value}
          checkable
          onCheck={this.onChecked}
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        >
          {this.renderTreeNode(AUTHORITES_ENTRIES, searchValue)}
        </Tree>
      </div>
    );
  }
}