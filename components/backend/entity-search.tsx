import React from 'react';
import { Input, Select, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

export interface SearchableColumn<T> {
  field: keyof T;
  name: string;
}

export interface EntitySearchProps<T> {
  columns: Array<SearchableColumn<T>>;
  loading: boolean;
  onSearch: (keyword: string, field: keyof T) => void;
};
export interface EntitySearchState<T> {
  field: keyof T
};

export default class EntitySearch<T> extends React.Component<EntitySearchProps<T>, EntitySearchState<T>> {
  constructor(props: EntitySearchProps<T>) {
    super(props);
    this.state = {
      field: props.columns.length > 0 ? props.columns[0].field : null
    }
  }
  render() {
    const { columns } = this.props;
    return (
      <Form layout="inline" className="search-bar" >
        <FormItem>
          <Input.Search
            loading={this.props.loading}
            onSearch={(keyword) => { this.props.onSearch(keyword, this.state.field) }}
            addonBefore={
              <Select
                defaultValue={columns.length > 0 ? columns[0].field.toString() : null}
                onSelect={(value: any) => this.setState({ field: value })}
              >
                {
                  columns.map((column) => <Select.Option key={column.field.toString()} value={column.field.toString()}>{column.name}</Select.Option>)
                }
              </Select>
            }
          />
        </FormItem>
      </Form>
    )
  }
}