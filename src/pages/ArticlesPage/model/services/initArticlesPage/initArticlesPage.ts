import {createAsyncThunk} from '@reduxjs/toolkit'
import {ThunkConfig} from 'app/providers/StoreProvider'
import {articlesPageActions} from '../../slice/articlesPageSlice'
import {fetchArticlesList} from '../fetchArticlesList/fetchArticlesList'
import {getArticlesPageInited} from '../../selectors/articlesPageSelectors'


export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (_, thunkAPI) => {
    const {getState, dispatch} = thunkAPI
    const inited = getArticlesPageInited(getState())
    if (!inited) {
      dispatch(articlesPageActions.initState())
      dispatch(fetchArticlesList({page: 1}))
    }
  }
)
