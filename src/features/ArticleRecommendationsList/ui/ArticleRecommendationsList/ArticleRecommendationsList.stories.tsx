import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {ArticleRecommendationsList} from './ArticleRecommendationsList'
import {StoreDecorator} from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import {Article} from '@/entities/Article'

export default {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
  parameters: {
    loki: {skip: true}
  }
} as ComponentMeta<typeof ArticleRecommendationsList>

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]

const article: Article = {
  id: '1',
  img: 'https://discordgid.ru/wp-content/uploads/2022/02/e_e9nc8wqaqrhxb.jpg',
  createdAt: '',
  views: 111,
  user: {id: '1', username: 'dick'},
  blocks: [],
  type: [],
  title: 'Super Article',
  subtitle: 'Test here',
}

Normal.parameters = {
  mockData: [{
    url: `${__API__}/articles?_limit=3`,
    method: 'GET',
    status: 200,
    response: [
      {...article, id: '1'},
      {...article, id: '2'},
      {...article, id: '3'},
    ]
  }]
}
