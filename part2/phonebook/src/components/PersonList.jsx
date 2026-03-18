import { PersonDetails } from "./personDetails"

export const PersonList = ({ personsToShow }) => (
     personsToShow.map(person => <PersonDetails key={person.id} person={person} />)
)