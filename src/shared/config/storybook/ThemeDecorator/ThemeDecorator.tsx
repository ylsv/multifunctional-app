import {Story} from '@storybook/react'
import {Theme, ThemeProvider} from 'app/providers/ThemeProvider'

/* eslint-disable react/display-name */
export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <ThemeProvider initialTheme={theme}>
    <div className="app">
      <StoryComponent/>
    </div>
  </ThemeProvider>
)
