import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {ListBox} from './ListBox'

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof ListBox>

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />

export const Normal = Template.bind({})
Normal.args = {
  label: 'Label',
  value: 'Test value',
  items: [
    {value: '1', content: 'Test value 1'},
    {value: '2', content: 'Test value 2'},
    {value: '3', content: 'Test value 3'},
  ],
}


