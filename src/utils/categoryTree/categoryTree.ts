import { Category } from '../../mockedApi';

import { CategoryListElement, FetchDataFn } from './categoryTree.types';

export const categoryTree = async (
  fetchDataFn: FetchDataFn<Category[]>
): Promise<CategoryListElement[]> => {
  const { data } = await fetchDataFn();

  if (!data.length) {
    return [];
  }

  return buildCategoryTree(data, true);
};

export const buildCategoryTree = (
  categories: Category[],
  isRootCategory = false
): CategoryListElement[] => {
  const mappedCategories = categories
    .map((category) => {
      const { id, MetaTagDescription: image, name, Title, children } = category;

      return {
        id,
        image,
        name,
        order: extractOrderFromCategory(category),
        children: buildCategoryTree(children),
        showOnHome:
          isRootCategory && shouldShowOnHome(Title, categories.length),
      };
    })
    .sort((a, b) => a.order - b.order);

  if (
    isRootCategory &&
    !mappedCategories.some((category) => category.showOnHome)
  ) {
    return markTopThreeElements(mappedCategories);
  }

  return mappedCategories;
};

const extractOrderFromCategory = (category: Category): number => {
  const order = parseInt(category.Title);
  return isNaN(order) ? category.id : order;
};

const shouldShowOnHome = (title: string, categoriesLength: number): boolean => {
  return categoriesLength <= 5 || title.includes('#');
};

const markTopThreeElements = (
  categoryElements: CategoryListElement[]
): CategoryListElement[] =>
  categoryElements.map((element, index) => ({
    ...element,
    showOnHome: index < 3,
  }));
