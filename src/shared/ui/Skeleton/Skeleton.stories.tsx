import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Skeleton} from './Skeleton'
import {ThemeDecorator} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import {Theme} from '@/shared/const/theme'

export default {
  title: 'shared/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />

export const Normal = Template.bind({})
Normal.args = {
  height: '100px',
}

export const NormalDark = Template.bind({})
NormalDark.args = {
  height: '100px',
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

export const NormalOrange = Template.bind({})
NormalOrange.args = {
  height: '100px',
}
NormalOrange.decorators = [ThemeDecorator(Theme.ORANGE)]

export const Circle = Template.bind({})
Circle.args = {
  borderRadius: '50%',
  width: '100px',
  height: '100px',
}

