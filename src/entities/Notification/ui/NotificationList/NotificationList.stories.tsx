import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {NotificationList} from './NotificationList'
import {StoreDecorator} from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import {QueryStatus} from '@reduxjs/toolkit/query'

export default {
  title: 'entities/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof NotificationList>

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({
  api: {
    queries: {
      'getNotifications(null)': {
        data: [
          {
            href: '#',
            description: 'Текст уведомления 1',
            title: 'Заголовок уведомления 1',
            id: '1'
          },
          {
            href: '#',
            description: 'Текст уведомления 2',
            title: 'Заголовок уведомления 2',
            id: '2'
          }
        ]
      }
    }
  }
})]

export const IsLoading = Template.bind({})
IsLoading.args = {}
IsLoading.decorators = [StoreDecorator({
  api: {
    queries: {
      'getNotifications(null)': {
        status: QueryStatus.pending,
      }
    }
  }
})]


