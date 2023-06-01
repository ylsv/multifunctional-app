import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {NotificationButton} from './NotificationButton'
import {StoreDecorator} from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

export default {
  title: 'features/NotificationButton',
  component: NotificationButton,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof NotificationButton>

const Template: ComponentStory<typeof NotificationButton> = (args) => <NotificationButton {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]


