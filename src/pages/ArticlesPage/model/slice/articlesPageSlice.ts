import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {StateSchema} from '@/app/providers/StoreProvider'
import {Article, ArticleSortField, ArticleType, ArticleView} from '@/entities/Article'
import {ArticlesPageSchema} from '../types/articlesPageSchema'
import {fetchArticlesList} from '../services/fetchArticlesList/fetchArticlesList'
import {ARTICLES_VIEW_LOCALSTORAGE_KEY} from '@/shared/const/localStorage'
import {SortOrder} from '@/shared/types'

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  state => state.articlesPage || articlesAdapter.getInitialState()
)

const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
    page: 1,
    hasMore: true,
    _inited: false,
    limit: 9,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    type: ArticleType.ALL
  }),
  reducers: {
    setView: (state: ArticlesPageSchema, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setPage: (state: ArticlesPageSchema, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setOrder: (state: ArticlesPageSchema, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSort: (state: ArticlesPageSchema, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setType: (state: ArticlesPageSchema, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    setSearch: (state: ArticlesPageSchema, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    initState: (state: ArticlesPageSchema) => {
      const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView
      state.view = view
      state.limit = view === ArticleView.BIG ? 4 : 9
      state._inited = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true
        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state)
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasMore = action.payload.length >= state.limit

        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload)
        } else {
          articlesAdapter.addMany(state, action.payload)
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const {reducer: articlesPageReducer, actions: articlesPageActions} = articlesPageSlice
