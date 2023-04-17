import {combineReducers} from '@reduxjs/toolkit'
import {ArticleDetailsPageSchema} from '../types'
import {
  articleDetailsRecommendationsReducer
} from './ArticleDetailsRecommendationsSlice'
import {articleDetailsCommentsReducer} from './ArticleDetailsCommentsSlice'

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  recommendations: articleDetailsRecommendationsReducer,
  comments: articleDetailsCommentsReducer,
})
