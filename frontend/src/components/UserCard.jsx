/**
 * UserCard Component
 * Demonstrates: Props, Component reusability
 * 
 * @param {object} user - User object with id, name, and email
 * @param {function} onEdit - Callback function when edit button is clicked
 * @param {function} onDelete - Callback function when delete button is clicked
 */
function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <div className="user-info">
        <div className="user-id">ID: {user.id}</div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <div className="user-actions">
        <button onClick={() => onEdit(user)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(user.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserCard;

