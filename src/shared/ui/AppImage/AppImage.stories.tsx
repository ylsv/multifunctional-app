import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {AppImage} from './AppImage'
import {Skeleton} from '../Skeleton'

export default {
  title: 'shared/AppImage',
  component: AppImage,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AppImage>

const Template: ComponentStory<typeof AppImage> = (args) => <AppImage {...args} />

export const Normal = Template.bind({})
Normal.args = {
  fallBack: <Skeleton width="100%" height={250} />,
  errorFallBack: <div>изображение не загрузилось</div>,
}
Normal.decorators = []


