import UserCard from './UserCard';

/**
 * UserList Component
 * Demonstrates: Props, Component composition, Conditional rendering
 * 
 * @param {array} users - Array of user objects
 * @param {boolean} loading - Loading state
 * @param {function} onEdit - Callback function for editing a user
 * @param {function} onDelete - Callback function for deleting a user
 */
function UserList({ users, loading, onEdit, onDelete }) {
  // Conditional rendering based on props
  if (loading) {
    return <p className="loading">Loading users...</p>;
  }

  if (users.length === 0) {
    return <p className="empty">No users found. Add one above!</p>;
  }

  return (
    <div className="users-grid">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default UserList;

