export const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null
  }

  return (
    <div style={{
        border: 'solid',
        borderColor: error ? 'red' : 'green',
        backgroundColor: 'lightgrey',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
        color: error ? 'red' : 'green',
        fontStyle: 'italic',
        fontSize: 16
    }}>
      {message ? message : error}
    </div>
  )
}