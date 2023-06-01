import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Drawer} from './Drawer'
import {ThemeDecorator} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import {Theme} from '@/app/providers/ThemeProvider'

export default {
  title: 'shared/Drawer',
  component: Drawer,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Drawer>

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />

export const Normal = Template.bind({})
Normal.args = {
  children: 'content',
  isOpen: true,
}
Normal.decorators = []

export const Dark = Template.bind({})
Dark.args = {
  children: 'content',
  isOpen: true,
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]


