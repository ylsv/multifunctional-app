import {Story} from '@storybook/react'
import {Theme} from '@/shared/const/theme'
// eslint-disable-next-line ylsv-plugin/layer-imports
import {ThemeProvider} from '@/app/providers/ThemeProvider'

/* eslint-disable react/display-name */
export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <ThemeProvider initialTheme={theme}>
    <div className="app">
      <StoryComponent/>
    </div>
  </ThemeProvider>
)
