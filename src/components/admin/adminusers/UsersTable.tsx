import UserRow from './UsersRow';

export default function UsersTable(props: any) {
  const { users, onToggleBlock, onDelete, formatDate } = props;

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {['User', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
              <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-600">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center text-gray-400">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user: any) => (
              <UserRow
                key={user.id}
                user={user}
                onToggleBlock={onToggleBlock}
                onDelete={onDelete}
                formatDate={formatDate}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
