export interface Category {
  id: string,
  name: string,
  description: string,
  tags: Array<Tag>,
  extra?: null | any
}

export interface Tag {
  id: string,
  name: string
}