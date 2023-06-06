import {rtkApi} from '@/shared/api/rtkApi'
import {Rating} from '@/entities/Rating'

interface GetArticleRatingArg {
  userId: string
  articleId: string
}

interface RateArticleArg extends GetArticleRatingArg {
  rate: number
  feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      query: ({userId, articleId}) => ({
        url: '/article-ratings',
        params: {
          userId,
          articleId,
        }
      }),
    }),
    rateArticle: build.mutation<void, RateArticleArg>({
      query: (args) => ({
        url: '/article-ratings',
        method: 'POST',
        body: args
      }),
    }),
  }),
})

export const {useGetArticleRatingQuery, useRateArticleMutation} = articleRatingApi
