import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {ArticleDetailsComments} from './ArticleDetailsComments'
import {StoreDecorator} from '../../../../shared/config/storybook/StoreDecorator/StoreDecorator'

export default {
  title: 'shared/ArticleDetailsComments',
  component: ArticleDetailsComments,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ArticleDetailsComments>

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => <ArticleDetailsComments {...args} />

export const Normal = Template.bind({})
Normal.args = {
  id: '1',
}
Normal.decorators = [StoreDecorator({})]


