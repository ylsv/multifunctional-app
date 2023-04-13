import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {ArticleTypeTabs} from './ArticleTypeTabs'

export default {
  title: 'entities/ArticleTypeTabs',
  component: ArticleTypeTabs,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ArticleTypeTabs>

const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => <ArticleTypeTabs {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = []


