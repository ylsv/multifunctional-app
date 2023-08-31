export const updateProfile = (firstName: string, lastName: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click()
  cy.getByTestId('ProfileCard.FirstName').clear().type(firstName)
  cy.getByTestId('ProfileCard.LastName').clear().type(lastName)
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click()
}

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: 'http://localhost:4003/profiles/' + profileId,
    headers: {Authorization: 'testdata'},
    body: {
      "id": "4",
      "firstname": "test",
      "lastname": "user",
      "age": "22",
      "currency": "RUB",
      "country": "Russia",
      "city": "Moscow",
      "username": "test4",
      "avatar": "https://www.azernews.az/media/pictures/project-manager-multitasking.jpg",
    },
  })
}

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstName: string, lastName: string): Chainable<void>
      resetProfile(profileId: string): Chainable<void>
    }
  }
}
