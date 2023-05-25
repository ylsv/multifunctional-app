import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Popover} from './Popover'
import {Button} from '../../../Button/Button'

export default {
  title: 'shared/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Popover>

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />

export const Normal = Template.bind({})
Normal.args = {
  trigger: <Button>Open!</Button>,
  children: 'Content text'
}
Normal.decorators = []


