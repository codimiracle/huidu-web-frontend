import { Book, BookPreview } from "../../types/book";

export interface DescriptionProps {
  description: string;
  size?: 'large' | 'medium' | 'small' | 'default';
  style?: React.CSSProperties;
}
export default function Description(props: DescriptionProps) {
  let size = props.size;
  let description = props.description || ''
  let className = '';
  description = props.description.substr(0, 72);
  if (size === 'small') {
    description = props.description.substr(0, 48);
    className = '-small';
  }
  if (size === 'medium') {
    description = props.description.substr(0, 96);
    className = '-medium';
  }
  if (size === 'large') {
    description = props.description;
    className = '-large';
  }
  if (description !== props.description) {
    description = description + '...';
  }
  return (
    <p className={`huidu${className}-description huidu${className}-ellipsis`} title={props.description} style={props.style}>{description}</p>
  );
} 