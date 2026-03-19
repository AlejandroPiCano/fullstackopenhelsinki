export const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={{
        border: 'solid',
        borderColor: 'green',
        backgroundColor: 'lightgrey',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }}>
      {message}
    </div>
  )
}