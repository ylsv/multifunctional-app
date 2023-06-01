import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import AboutPage from './AboutPage'
import {ThemeDecorator} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import {Theme} from '@/app/providers/ThemeProvider'
import {StoreDecorator} from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

export default {
  title: 'pages/AboutPage',
  component: AboutPage,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AboutPage>

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [StoreDecorator({})]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})]
