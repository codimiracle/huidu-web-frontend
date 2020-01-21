import fetch, { placeholderReplacer, retriveApiDefinition } from '../../libs/fetch';
import { API, APIDefinitionData } from '../../configs/api-config';
import { fetchData } from '../../util/network-util';
import { BookCommodity } from '../../types/book';

test('should API BookEntity retrive should be a url', () => {
  expect(API.BookEntity).toBe('book.entity');
});

test('api definition retrive should be success', () => {
  expect(retriveApiDefinition(APIDefinitionData, API.BookEntity)).toBe(APIDefinitionData.book.entity);
})

test('placeholder replace should be success', () => {
  let apiDefinition = retriveApiDefinition(APIDefinitionData, API.BookEntity);
  expect(placeholderReplacer(apiDefinition, { 'book-id': '2432' })).not.toBe(apiDefinition);
})

test('fetch API should return but error', () => {
  fetchData<BookCommodity>(API.BookEntity).then((data: BookCommodity) => {
    console.log(data);
    expect(data).not.toBeNull();
  });
})


