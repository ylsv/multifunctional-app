import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkConfig} from '@/app/providers/StoreProvider'
import {articlesPageActions} from '../../slice/articlesPageSlice'
import {fetchArticlesList} from '../fetchArticlesList/fetchArticlesList'
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading, getArticlesPageNumber
} from '../../selectors/articlesPageSelectors'

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchNextArticlesPage',
  async (_, thunkAPI) => {
    const {getState, dispatch} = thunkAPI
    const isLoading = getArticlesPageIsLoading(getState())
    const hasMore = getArticlesPageHasMore(getState())
    const page = getArticlesPageNumber(getState())

    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(page + 1))
      dispatch(fetchArticlesList({}))
    }
  }
)
