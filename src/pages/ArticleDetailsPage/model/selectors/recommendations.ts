import {StateSchema} from '@/app/providers/StoreProvider'

const getArticleRecommendationsIsLoading = (state: StateSchema) => state.articleDetailsPage?.comments?.isLoading
const getArticleRecommendationsError = (state: StateSchema) => state.articleDetailsPage?.comments?.error

export {
  getArticleRecommendationsIsLoading,
  getArticleRecommendationsError,
}
