import React from 'react';
import { Card } from 'antd';
import { Category, Tag } from '../types/category';
import CheckableTag from 'antd/lib/tag/CheckableTag';

export interface Filter {
  year: string,
  fare: "all" | "free" | "pay",
  category: null | Category,
  tag: null | Tag
}

export interface FilterCardProps {
  categories: Array<Category>,
  years: Array<string>,
  onFilterChange: (filter: Filter) => void
};
export interface FilterCardState {
  selectedYear: string | "all",
  selectedFare: "all" | "free" | "pay",
  selectedCategory: Category,
  selectedTag: Tag
};

export default class FilterCard extends React.Component<FilterCardProps, FilterCardState> {
  constructor(props: FilterCardProps) {
    super(props);
    this.state = {
      selectedYear: null,
      selectedFare: null,
      selectedCategory: null,
      selectedTag: null
    }
  }
  private fireFilterChange(filter: any) {
    const { onFilterChange } = this.props;
    const { selectedYear, selectedFare, selectedCategory, selectedTag } = this.state;
    let mergedFilter: Filter = {
      year: selectedYear,
      fare: selectedFare,
      category: selectedCategory,
      tag: selectedTag,
    };
    mergedFilter = { ...mergedFilter, ...filter };

    onFilterChange && onFilterChange(mergedFilter);
  }
  private onYearChange(year: string) {
    this.setState({ selectedYear: year });
    this.fireFilterChange({ year: year });
  }
  private onCategoryChange(category: Category) {
    this.setState({ selectedCategory: category, selectedTag: null });
    this.fireFilterChange({ category: category, tag: null });
  }
  private onFareChange(fare: any) {
    this.setState({ selectedFare: fare });
    this.fireFilterChange({ fare: fare });
  }
  private onTagChange(tag: Tag) {
    this.setState({ selectedTag: tag });
    this.fireFilterChange({ tag: tag });
  }
  render() {
    const { categories, years } = this.props;
    const { selectedYear, selectedCategory, selectedTag, selectedFare } = this.state;
    return (
      <div className="filter-card">
        <h3>年份</h3>
        <CheckableTag checked={selectedYear == null} onChange={() => this.onYearChange(null)}>全部</CheckableTag>
        {
          years.map((year: string) => (
            <CheckableTag key={year} checked={selectedYear == year} onChange={() => this.onYearChange(year)}>{year}</CheckableTag>
          ))
        }
        <h3>费用</h3>
        <CheckableTag checked={selectedFare == null} onChange={() => this.onFareChange(null)}>全部</CheckableTag>
        <CheckableTag checked={selectedFare == 'free'} onChange={() => this.onFareChange('free')}>免费</CheckableTag>
        <CheckableTag checked={selectedFare == 'pay'} onChange={() => this.onFareChange('pay')}>付费</CheckableTag>
        <h3>类别</h3>
        <CheckableTag checked={selectedCategory === null} onChange={() => this.onCategoryChange(null)}>全部</CheckableTag>
        {categories.map((category: Category) => (
          <CheckableTag key={category.id} checked={selectedCategory && selectedCategory.id === category.id} onChange={() => this.onCategoryChange(category)}>{category.name}</CheckableTag>
        ))}
        {
          selectedCategory && <div>
            <h3>标签</h3>
            <CheckableTag checked={selectedTag == null} onChange={() => this.onTagChange(null)}>全部</CheckableTag>
            {selectedCategory.tags.map((tag: Tag) => <CheckableTag key={tag.id} checked={selectedTag && selectedTag.id === tag.id} onChange={() => this.onTagChange(tag)}>{tag.name}</CheckableTag>)}
          </div>
        }

        <style jsx>{`
          .filter-card {
            padding-left: 4px;
            font-size: 0.9em;
          }
          h3 {
            margin 0.5em 0;
          }
        `}</style>
      </div>
    )
  }
}