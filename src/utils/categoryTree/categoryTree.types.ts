export type FetchDataFn<T> = () => Promise<{ data: T }>;

export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: this[];
  showOnHome: boolean;
}
