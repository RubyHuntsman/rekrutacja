import { INPUT } from './data/input';

export interface Category {
  id: number;
  name: string;
  hasChildren: boolean;
  url: string;
  Title: string;
  MetaTagDescription: string;
  children: Category[];
}

// TODO: consider refactoring api to return camelCase names for `Title` and `Meta Tag Description`

export const getCategories = async (): Promise<{ data: Category[] }> => ({
  data: INPUT,
});
