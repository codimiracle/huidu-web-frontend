import Link from "next/link";
import { Episode } from "../../../../types/episode";

export interface LastUpdateEpsidoeViewProps {
  episode: Episode
}

export default function LastUpdateEpsidoeView(props: LastUpdateEpsidoeViewProps) {
  const { episode } = props;
  return (
    <>
      <h3>{episode.title}</h3>
      <p className="huidu-last-update-ellipsis" dangerouslySetInnerHTML={{ __html: episode.content.source }}></p>
      <div className="episode-actions">
        <Link href={`/reader/[book_id]?episode_id=${episode.id}`} as={`/reader/${episode.book.id}?episode_id=${episode.id}`}><a>阅读该章节</a></Link>
      </div>
      <style jsx>{`
        .episode-actions {
          text-align: right;
        }
      `}</style>
    </>
  );
}
