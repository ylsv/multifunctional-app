import {getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading} from './getArticleDetails'
import {StateSchema} from '@/app/providers/StoreProvider'

describe('getArticleDetails', () => {
  test('should return article data object', () => {
    const data = {
      id: '1',
      title: 'title',
    }

    const state: DeepPartial<StateSchema> = {
      articleDetails: {data}
    }

    expect(getArticleDetailsData(state as StateSchema)).toEqual(data)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined)
  })
  test('should return isLoading', () => {
    const data = {
      articleDetails: {
        isLoading: true,
      },
    }

    const state: DeepPartial<StateSchema> = data

    expect(getArticleDetailsIsLoading(state as StateSchema)).toBe(true)
  })
  test('should return error', () => {
    const data = {
      articleDetails: {
        error: 'error text',
      },
    }

    const state: DeepPartial<StateSchema> = data

    expect(getArticleDetailsError(state as StateSchema)).toBe('error text')
  })
})

