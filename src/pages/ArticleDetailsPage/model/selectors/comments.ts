import {StateSchema} from 'app/providers/StoreProvider'

const getArticleCommentsIsLoading = (state: StateSchema) => state.articleDetailsComments?.isLoading
const getArticleCommentsError = (state: StateSchema) => state.articleDetailsComments?.error

export {
  getArticleCommentsIsLoading,
  getArticleCommentsError,
}
