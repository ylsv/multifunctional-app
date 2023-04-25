import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Flex} from './Flex'

export default {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Flex>

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />

const children = <>
  <div>-=1=-</div>
  <div>-=2=-</div>
  <div>-=3=-</div>
  <div>-=4=-</div>
  <div>-=5=-</div>
</>

export const Row = Template.bind({})
Row.args = {
  children,
}

export const RowGap4 = Template.bind({})
RowGap4.args = {
  children,
  gap: '4',
}

export const RowGap8 = Template.bind({})
RowGap8.args = {
  children,
  gap: '8',
}

export const RowGap16 = Template.bind({})
RowGap16.args = {
  children,
  gap: '16',
}

export const RowGap32 = Template.bind({})
RowGap32.args = {
  children,
  gap: '32',
}

export const Column = Template.bind({})
Column.args = {
  children,
  direction: 'column',
}

export const ColumnGap4 = Template.bind({})
ColumnGap4.args = {
  children,
  gap: '4',
  direction: 'column',
}

export const ColumnGap8 = Template.bind({})
ColumnGap8.args = {
  children,
  gap: '8',
  direction: 'column',
}

export const ColumnGap16 = Template.bind({})
ColumnGap16.args = {
  children,
  gap: '16',
  direction: 'column',
}

export const ColumnGap32 = Template.bind({})
ColumnGap32.args = {
  children,
  gap: '32',
  direction: 'column',
}
