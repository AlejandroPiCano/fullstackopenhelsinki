import { PersonDetails } from "./personDetails"

export const PersonList = ({ personsToShow, deletePerson }) => (
     personsToShow.map(person => <PersonDetails key={person.id} person={person} deletePerson={deletePerson} />)
)