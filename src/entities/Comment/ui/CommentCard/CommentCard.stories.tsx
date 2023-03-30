import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {CommentCard} from './CommentCard'

export default {
  title: 'entities/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof CommentCard>

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />

export const Normal = Template.bind({})
Normal.args = {
  comment:  {
    id: '1',
    text: 'test text',
    user: {id: '1', username: 'Petya1'}
  },
}

export const Loading = Template.bind({})
Loading.args = {
  comment: undefined,
  isLoading: true,
}

