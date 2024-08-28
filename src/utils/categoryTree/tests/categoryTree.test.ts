import test from 'ava';
import * as sinon from 'sinon';

import { CORRECT } from '../../../data/correctResult';
import { INPUT } from '../../../data/input';
import { getCategories } from '../../../mockedApi';
import { buildCategoryTree, categoryTree } from '../categoryTree';

// proof of work
test('transforms INPUT to CORRECT format', async (t) => {
  const result = await categoryTree(getCategories);
  t.deepEqual(result, CORRECT);
});

// categoryTree
test('categoryTree returns empty array when data is empty', async (t) => {
  const fetchDataFn = sinon.stub().resolves({ data: [] });
  const result = await categoryTree(fetchDataFn);
  t.deepEqual(result, []);
});

// buildCategoryTree
test('buildCategoryTree properly builds the tree with root categories', (t) => {
  const result = buildCategoryTree(INPUT, true);
  t.is(result.length, 1);
  t.is(result[0].name, 'Porządki');
  t.true(result[0].showOnHome);
});

test('buildCategoryTree properly handles nested categories', (t) => {
  const result = buildCategoryTree(INPUT[0].children, false);
  t.is(result.length, 4);
  t.is(result[0].name, 'Pranie i prasowanie');
  t.false(result[0].showOnHome);
});

test('buildCategoryTree sets showOnHome to true for top 3 elements when none are marked', (t) => {
  const categories = INPUT[0].children;
  const result = buildCategoryTree(categories, true);
  t.true(result.some((category) => category.showOnHome));
});

// TODO: add more tests
