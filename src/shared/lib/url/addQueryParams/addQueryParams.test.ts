import {getQueryParams} from './addQueryParams'

describe('shared/url/addQueryParams', function () {
  test('test with one param', () => {
    const params = {
      test: 'value',
    }
    expect(getQueryParams(params)).toBe('?test=value')
  })
  test('test with multiple params', () => {
    const params = {
      test: 'value',
      second: '2',
    }
    expect(getQueryParams(params)).toBe('?test=value&second=2')
  })
  test('test with undefined', () => {
    const params = {
      test: 'value',
      second: undefined
    }
    expect(getQueryParams(params)).toBe('?test=value')
  })
})
