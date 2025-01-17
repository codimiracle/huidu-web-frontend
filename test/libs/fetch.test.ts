import fetch, { queryPlaceholderReplacer, bodyPlaceholderReplacer } from '../../libs/fetch';
import { API, APIDefinitionData } from '../../configs/api-config';
import { fetchData } from '../../util/network-util';
import { BookBase } from '../../types/book';
import ApiUtil from '../../util/api-util';

test('should API ElectronicBookEntity retrive should be a url', () => {
  expect(API.ElectronicBookEntity).toBe('book.entity');
});

test('api definition retrive should be success', () => {
  expect(ApiUtil.findApiDefinition(API.ElectronicBookEntity)).toBe(APIDefinitionData.book.entity);
})

test('placeholder replace should be success', () => {
  let apiDefinition = ApiUtil.findApiDefinition(API.ElectronicBookEntity);
  expect(queryPlaceholderReplacer(apiDefinition, { 'book_id': '2432' })).not.toBe(apiDefinition);
})
test('api definition body parser should be success', () => {
  let apiDefinition = ApiUtil.findApiDefinition(API.BookJoinCart);
  expect(bodyPlaceholderReplacer(apiDefinition, {
    
  }))
})


test('fetch API should return but error', () => {
  fetchData<BookBase>(API.ElectronicBookEntity).then((data: BookBase) => {
    console.log(data);
    expect(data).not.toBeNull();
  }).catch((err) => {
    fail(err);
  });
})


