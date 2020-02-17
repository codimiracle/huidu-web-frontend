export interface Category {
  id: string,
  name: string,
  description: string,
  tags: Array<Tag>,
  extra?: {
    url: string,
    asideTitle: string
  }
}

export interface Tag {
  id: string,
  name: string
}