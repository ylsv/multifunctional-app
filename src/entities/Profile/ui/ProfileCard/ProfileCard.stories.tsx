import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {ProfileCard} from './ProfileCard'
import {Country} from '@/entities/Country'
import {Currency} from '@/entities/Currency'

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  data: {
    username: 'admin',
    age: '22',
    country: Country.Armenia,
    lastname: 'Tankian',
    firstname: 'Serge',
    city: 'Yerevan',
    currency: Currency.RUB,
    avatar: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4',
  }
}

export const WithError = Template.bind({})
WithError.args = {
  error: 'error',
}

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true,
}
