import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {StateSchema} from 'app/providers/StoreProvider'
import {ArticleDetailsRecommendationsSchema} from '../types/ArticleDetailsRecommendationsSchema'
import {Article} from 'entities/Article'
import {
  fetchArticlesRecommendations
} from '../services/fetchArticlesRecommendations/fetchArticlesRecommendations'

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
})

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  state => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState()
)

const articleDetailsRecommendationsSlice = createSlice({
  name: 'articleDetailsRecommendationsSlice',
  initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesRecommendations.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchArticlesRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false
        recommendationsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchArticlesRecommendations.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const {reducer: articleDetailsRecommendationsReducer} = articleDetailsRecommendationsSlice
