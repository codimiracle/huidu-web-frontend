import React from 'react';
import { Drawer, Popover, Slider } from 'antd';
import { SketchPicker } from 'react-color';
import { Theme } from '../../../types/theme';

declare type hexcolor = string;

export interface ThemingSettingsViewProps {
  visible: boolean,
  theme: Theme,
  onClose: () => void,
  onFontColorChange: (color: hexcolor) => void,
  onBackgroundColorChange: (color: hexcolor) => void,
  onFontSizeChange: (size: number) => void,
};
export interface ThemingSettingsViewState { };

export default class ThemingSettingsView extends React.Component<ThemingSettingsViewProps, ThemingSettingsViewState> {
  render() {
    const { visible, onClose, theme, onFontColorChange, onFontSizeChange, onBackgroundColorChange } = this.props;
    return (
      <>
        <Drawer
          title="颜色与字体"
          visible={visible}
          onClose={onClose}
          placement="left"
          width="312px"
          mask={false}
          maskClosable={false}
        >
          <div>背景色：
            <Popover
              trigger="click"
              placement="bottom"
              content={<SketchPicker color={theme.color.background} onChange={(color) => onBackgroundColorChange(color.hex)} />}>
              <div className="color-preview"><span style={{ backgroundColor: theme.color.background }}>hello</span></div>
            </Popover>
          </div>
          <div>字体色：
            <Popover
              trigger="click"
              placement="bottom"
              content={<SketchPicker color={theme.color.font} onChange={(color) => onFontColorChange(color.hex)} />}
              style={{ backgroundColor: 'none' }}>
              <div className="color-preview"><span style={{ backgroundColor: theme.color.background, color: theme.color.font }}>Abc 文字</span></div>
            </Popover>
          </div>
          <div>字体大小：<Slider value={theme.font.size} min={10} step={1} max={30} onChange={(value) => onFontSizeChange(parseInt(value.toString()))} /> <span style={{ fontSize: `${theme.font.size / 10.0}em` }}>Aa文字</span></div>
        </Drawer>
        <style jsx>{`
          .color-preview {
            display: inline-block;
            border-bottom: 1px solid gray;
            margin: 4px 0;
          }
          .color-preview > span {
            padding: 0 4px;
          }
        `}</style>
        <style jsx global>{`
          .ant-popover .ant-popover-inner-content .sketch-picker {
            padding: 0!important;
            box-shadow: none!important;
          }
        `}</style>
      </>
    )
  }
}