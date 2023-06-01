import {screen} from '@testing-library/react'
import {EditableProfileCard} from './EditableProfileCard'
import {componentRender} from '@/shared/lib/tests/componentRender/componentRender'
import {Profile} from '@/entities/Profile'
import {Currency} from '@/entities/Currency'
import {Country} from '@/entities/Country'
import {profileReducer} from '../../model/slice/profileSlice'
import userEvent from '@testing-library/user-event'
import {$api} from '@/shared/api/api'

const profile: Profile = {
  id: '1',
  firstname: 'admin',
  lastname: 'admin',
  age: '20',
  currency: Currency.RUB,
  country: Country.Russia,
  city: 'Moscow',
  username: 'admin123',
}

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: '1',
        username: 'admin123'
      }
    }
  },
  asyncReducers: {
    profile: profileReducer,
  }
}

describe('features/EditableProfileCard', () => {
  test('Readonly mode should be switched', async () => {
    componentRender(<EditableProfileCard id="1"/>, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
  })

  test('On cancel button click values should restore', async () => {
    componentRender(<EditableProfileCard id="1"/>, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    // clear inputs
    await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'))
    await userEvent.clear(screen.getByTestId('ProfileCard.LastName'))
    // type random staff to inputs
    await userEvent.type(screen.getByTestId('ProfileCard.FirstName'), 'random staff 1')
    await userEvent.type(screen.getByTestId('ProfileCard.LastName'), 'random staff 2')
    // check if the value entered appeared inside of inputs
    expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue('random staff 1')
    expect(screen.getByTestId('ProfileCard.LastName')).toHaveValue('random staff 2')
    // click cancel button
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'))
    // check that after cancel values in inputs restored to initial
    expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue('admin')
    expect(screen.getByTestId('ProfileCard.LastName')).toHaveValue('admin')
  })

  test('Error should appear if value is incorrect', async () => {
    componentRender(<EditableProfileCard id="1"/>, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'))
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))
    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
  })

  test('Send PUT request on save if no errors', async () => {
    const mockPutRequest = jest.spyOn($api, 'put')
    componentRender(<EditableProfileCard id="1"/>, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'))
    await userEvent.type(screen.getByTestId('ProfileCard.FirstName'), 'new user')
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(mockPutRequest).toHaveBeenCalled()
  })
})
