import React from "react";
import useSWR from "swr";
import { EntityJSON } from "../../types/api";
import { BookNotes } from "../../types/notes";
import { API } from "../../configs/api-config-development";
import { fetchDataByGet } from "../../util/network-util";

export const BookNotesContext = React.createContext(null);
export interface BookNotesProviderViewProps {
  bookId: string;
  children: JSX.Element;
}
export default function BookNotesProviderView(props: BookNotesProviderViewProps) {
  const { data, error } = useSWR<EntityJSON<BookNotes>>(API.UserBookNotesEntity, (api) => {
    return fetchDataByGet<EntityJSON<BookNotes>>(api, { book_id: props.bookId });
  });
  if (error) {
    console.log(error);
  }
  return <BookNotesContext.Provider value={data && data.entity}>{props.children}</BookNotesContext.Provider>
}