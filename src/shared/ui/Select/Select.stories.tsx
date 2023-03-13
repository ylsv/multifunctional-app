import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Select} from './Select'

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Укажите значение',
  options: [
    {value: '1', content: 'Пункт 1'},
    {value: '2', content: 'Пункт 2'},
    {value: '3', content: 'Пункт 3'},
  ]
}
