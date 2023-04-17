import {StateSchema} from 'app/providers/StoreProvider'

const getArticleCommentsIsLoading = (state: StateSchema) => state.articleDetailsPage?.comments?.isLoading
const getArticleCommentsError = (state: StateSchema) => state.articleDetailsPage?.comments?.error

export {
  getArticleCommentsIsLoading,
  getArticleCommentsError,
}
