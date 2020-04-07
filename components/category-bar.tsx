import { Card, List, Icon, Button, Row, Col } from 'antd';
import Link from 'next/link';
import React from 'react';
import { Category, Tag } from '../types/category';

export interface CategoryBarProps {
  categories: Array<Category>
}
export interface CategoryBarState { }

export default class CategoryBar extends React.Component<CategoryBarProps, CategoryBarState> {
  render() {
    const { categories } = this.props;
    let renderringCategories = categories || [];
    return (
      <>
        <Card>
          <div className="category-bar">
            <Row type="flex" gutter={4}>
              <Col span={3}>
                <Link href="/categories">
                  <a>
                    <Button style={{ height: '100%', display: 'block' }}>
                      <Icon type="appstore" /><br />
                      所有类别
                    </Button>
                  </a>
                </Link>
              </Col>
              {
                renderringCategories.filter((e) => e).map((category: Category) => (
                  <Col span={7} key={category.id}>
                    <Row type="flex" gutter={4}>
                      <Col span={4}>{category.name}</Col>
                      <Col span={20}>
                        <List
                          grid={{ column: 4 }}
                          renderItem={(tag: Tag) => (<List.Item style={{ marginBottom: '0.5em' }}>
                            <Link href={`/categories/[category_id]?tag=${tag.name}`} as={`/categories/${category.id}?tag=${tag.name}`}><a>{tag.name}</a></Link>
                          </List.Item>
                          )}
                          dataSource={category.tags}
                        />
                      </Col>
                    </Row>
                  </Col>
                ))
              }
            </Row>
          </div>
        </Card>
        <style jsx>{`
        `}</style>
      </>
    )
  }
}