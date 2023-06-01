import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkConfig} from '@/app/providers/StoreProvider'
import {Article, ArticleType} from '@/entities/Article'
import {
  getArticlesPageLimit,
  getArticlesPageNumber,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType
} from '../../selectors/articlesPageSelectors'
import {addQueryParams} from '@/shared/lib/url/addQueryParams/addQueryParams'

interface FetchArticlesListProps {
  replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
  'articlesPage/fetchArticlesList',
  async (_, thunkAPI) => {
    const {extra, rejectWithValue, getState} = thunkAPI
    const state = getState()
    const limit = getArticlesPageLimit(state)
    const sort = getArticlesPageSort(state)
    const order = getArticlesPageOrder(state)
    const search = getArticlesPageSearch(state)
    const page = getArticlesPageNumber(state)
    const type = getArticlesPageType(state)

    try {
      addQueryParams({sort, order, search, type})
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleType.ALL ? undefined : type
        }
      })

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
