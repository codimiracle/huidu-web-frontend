import { Book, BookPreview } from "../../types/book";

export interface BookDescriptionProps {
  book: Book;
  size?: 'large' | 'medium' | 'small' | 'default';
  style?: React.CSSProperties;
}
export default function BookDescription(props: BookDescriptionProps) {
  let size = props.size === undefined ? 'default' : props.size;
  let bookPreview = BookPreview.valueOf(props.book);
  let description = bookPreview.description;
  let className = '';
  description = bookPreview.description.substr(0, 72) + '...';
  if (size === 'small') {
    description = bookPreview.description.substr(0, 48) + '...';
    className = '-small';
  }
  if (size === 'medium') {
    description = bookPreview.description.substr(0, 96) + '...';
    className = '-medium';
  }
  return (
    <p className={`huidu${className}-description huidu${className}-ellipsis`} title={bookPreview.description} style={props.style}>{description}</p>
  );
} 