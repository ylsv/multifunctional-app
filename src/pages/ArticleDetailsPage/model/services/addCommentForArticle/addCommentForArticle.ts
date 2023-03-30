import {createAsyncThunk} from '@reduxjs/toolkit'
import {getUserAuthData} from 'entities/User'
import {ThunkConfig} from 'app/providers/StoreProvider'
import {Comment} from 'entities/Comment'
import {getArticleDetailsData} from 'entities/Article'
import {
  fetchCommentsByArticleId
} from '../fetchCommentsByArticleId/fetchCommentsByArticleId'

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
  'articleDetails/addCommentForArticle',
  async (text, thunkAPI) => {
    const {dispatch, extra, rejectWithValue, getState} = thunkAPI
    const state = getState()
    const userData = getUserAuthData(state)
    const {id: articleId} = getArticleDetailsData(state) || {}

    if (!userData || !text || !articleId) {
      return rejectWithValue('no data')
    }

    try {
      const response = await extra.api.post<Comment>('/comments', {
        articleId,
        userId: userData.id,
        text,
      })
      if (!response.data) throw new Error()

      dispatch(fetchCommentsByArticleId(articleId))

      return response.data
    } catch (e) {
      return rejectWithValue('error')
    }
  }
)
