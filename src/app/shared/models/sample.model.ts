export interface RandomItem {
  id: number;
  name: string;
  desc?: string;
  text?: string;
  price?: number;
  imageUrl?: string;
  quantity?: number;
  customKey?: string;
}

export interface RsSearchResult<T> {
  resultList: T[];
}
