export const Filter = ({ newFilter, setNewFilter }) => (
    <p>filter show with: <input value={newFilter} onChange={(event) => setNewFilter(event.target.value)} /></p>
)