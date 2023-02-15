import {Story} from '@storybook/react'
import {BrowserRouter} from 'react-router-dom'

// декоратор для использования на страницах, где необходимы роуты
export const RouterDecorator = (story: () => Story) => {
  return (
    <BrowserRouter>
      {story()}
    </BrowserRouter>
  )
}
