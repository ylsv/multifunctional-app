import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Modal} from './Modal'
import {ThemeDecorator} from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import {Theme} from 'app/providers/ThemeProvider'

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Primary = Template.bind({})
Primary.args = {
  isOpen: true,
  children: 'Lorem ipsum pot sit amet, owned adipiscing elit. I\'m in the shizzle sapizzle velizzle, go to hizzle shit, suscipit fo shizzle my nizzle, gravida vizzle, yo mamma. Pellentesque mammasay mammasa mamma oo sa yo mamma. Sizzle erizzle. Sure izzle dolizzle dapibus ass tempizzle . Maurizzle pellentesque nibh bling bling pizzle. Stuff pimpin\' tortor. Pellentesque rizzle rhoncizzle gizzle. In own yo\' habitasse platea dictumst. Mammasay mammasa mamma oo sa fo shizzle. Shiz tellizzle urna, pretium eu, mattizzle ac, eleifend vitae, nunc. Shiz suscipizzle. Integer semper ghetto pot sure.',
}

export const Dark = Template.bind({})
Dark.args = {
  isOpen: true,
  children: 'Lorem ipsum pot sit amet, owned adipiscing elit. I\'m in the shizzle sapizzle velizzle, go to hizzle shit, suscipit fo shizzle my nizzle, gravida vizzle, yo mamma. Pellentesque mammasay mammasa mamma oo sa yo mamma. Sizzle erizzle. Sure izzle dolizzle dapibus ass tempizzle . Maurizzle pellentesque nibh bling bling pizzle. Stuff pimpin\' tortor. Pellentesque rizzle rhoncizzle gizzle. In own yo\' habitasse platea dictumst. Mammasay mammasa mamma oo sa fo shizzle. Shiz tellizzle urna, pretium eu, mattizzle ac, eleifend vitae, nunc. Shiz suscipizzle. Integer semper ghetto pot sure.',
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
