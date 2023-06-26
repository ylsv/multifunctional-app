import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ArticleViewSelector} from './ArticleViewSelector'
import {ArticleView} from '@/entities/Article'

export default {
  title: 'features/ArticleViewSelector',
  component: ArticleViewSelector,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ArticleViewSelector>

const Template: ComponentStory<typeof ArticleViewSelector> = (args) => <ArticleViewSelector {...args} />

export const Normal = Template.bind({})
Normal.args = {
  view: ArticleView.BIG
}
