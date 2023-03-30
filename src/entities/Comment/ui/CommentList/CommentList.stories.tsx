import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {CommentList} from './CommentList'

export default {
  title: 'entities/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof CommentList>

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />

export const Normal = Template.bind({})
Normal.args = {
  comments: [
    {
      id: '1',
      text: 'test text',
      user: {id: '1', username: 'Petya1'}
    },
    {
      id: '2',
      text: 'test text1',
      user: {id: '2', username: 'Petya2'}
    },
  ]
}

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true,
}

