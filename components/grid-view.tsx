import React, { ReactNode } from 'react';
import { Row, Col } from 'antd';

interface GridViewProps {
  rows: number,
  cols: number,
  gutter: any,
  dataSource: Array<any>,
  itemRender: (data: any) => ReactNode
}
interface GridViewState { }

export default class GridView extends React.Component<GridViewProps, GridViewState> {
  render() {
    const { rows, cols, gutter, dataSource, itemRender } = this.props;
    let index = 0;
    let grid = [];
    for (let row = 0; row < rows; row++) {
      let r = [];
      for (let col = 0; col < cols; col++) {
        r.push(
          <Col key={`${row}-${col}`} span={24 / cols}>
            {itemRender(dataSource[index])}
          </Col>
        )
        index++;
      }
      grid.push(<Row key={`${row}`} gutter={gutter}>{r}</ Row>);
    }
    return <>{grid}</>;
  }
}