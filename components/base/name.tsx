import { Book, BookPreview } from "../../types/book";

export interface NameProps {
  name: string;
  size?: 'large' | 'medium' | 'small' | 'default';
  style?: React.CSSProperties;
}
export default function Name(props: NameProps) {
  let size = props.size;
  let name = props.name || ''
  let className = '';
  name = props.name.substr(0, 10);
  if (size === 'small') {
    name = props.name.substr(0, 8);
    className = '-small';
  }
  if (size === 'medium') {
    name = props.name.substr(0, 24);
    className = '-medium';
  }
  if (size === 'large') {
    name = props.name;
    className = '-large';
  }
  if (name !== props.name) {
    name = name + '...';
  }
  return (
    <span className={`huidu${className}-name`} title={props.name} style={props.style}>{name}</span>
  );
} 