import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Text, TextSize, TextTheme} from './Text'
import {ThemeDecorator} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import {Theme} from 'app/providers/ThemeProvider'

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const TitleOnly = Template.bind({})
TitleOnly.args = {
  title: 'This is title',
}

export const TextOnly = Template.bind({})
TextOnly.args = {
  text: 'This is text',
}

export const TitleAndText = Template.bind({})
TitleAndText.args = {
  title: 'This is title',
  text: 'This is text',
}

export const TitleAndTextError = Template.bind({})
TitleAndTextError.args = {
  title: 'This is title',
  text: 'This is text',
  theme: TextTheme.ERROR,
}

export const TitleOnlyDark = Template.bind({})
TitleOnlyDark.args = {
  title: 'This is title',
}
TitleOnlyDark.decorators = [ThemeDecorator(Theme.DARK)]

export const TextOnlyDark = Template.bind({})
TextOnlyDark.args = {
  text: 'This is text',
}
TextOnlyDark.decorators = [ThemeDecorator(Theme.DARK)]

export const TitleAndTextDark = Template.bind({})
TitleAndTextDark.args = {
  title: 'This is title',
  text: 'This is text',
}
TitleAndTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SizeL = Template.bind({})
SizeL.args = {
  title: 'This is title',
  text: 'This is text',
  size: TextSize.L,
}
