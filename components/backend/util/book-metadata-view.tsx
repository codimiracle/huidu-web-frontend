import { BookMetadata } from "../../../types/book";
import { API } from "../../../configs/api-config";
import UploadUtil from "../../../util/upload-util";
import Cover from "../../base/cover";
import Description from "../../base/description";

const EMPTY_IMAGE = '/assets/empty.png';

export interface BookMetadataProps {
  metadata: BookMetadata
}

export function BookMetadataView(props: BookMetadataProps) {
  const { metadata } = props;
  return (
    <div className="book-metadata-view">
      <Cover src={UploadUtil.absoluteUrl(API.UploadSource, metadata.cover)} />
      <div className="body">
        <div><strong>{metadata.name}</strong> <span>{metadata.author}</span></div>
        <Description description={metadata.description} />
      </div>
      <style jsx>{`
        .book-metadata-view {
          display: flex;
        }
        .body {
          display: flex;
          padding-left: 0.5em;
          flex-direction: column;
        }
        p {
          flex: 1;
          
          max-height: 3em;
          word-break: break-all;
          overflow: hidden;
        }
        img {
          width: 3.5em;
          height: 4.7em;
        }
      `}</style>
    </div>
  );
}
