import {
  Mail,
  Shield,
  Ban,
  CheckCircle,
  Trash2,
  Calendar,
} from 'lucide-react';

export default function UserRow(props: any) {
  const { user, onToggleBlock, onDelete, formatDate } = props;

  

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full  bg-blue-900  text-white flex items-center justify-center ${roleColor.avatar} font-semibold">
         { (
            user.name[0].toUpperCase()
          )}
        </div>
        <div>
          <div className="font-semibold">{user.name}</div>
          {user.phone && <div className="text-xs text-gray-500">{user.phone}</div>}
        </div>
      </td>

      <td className="px-6 py-4">
        <Mail size={14} className="inline mr-2 text-gray-400" />
        {user.email}
      </td>

      <td className="px-6 py-4">
        <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
          <Shield size={12} className="inline mr-1" />
          {user.role}
        </span>
      </td>

      <td className="px-6 py-4">
        {user.isBlock ? (
          <span className="text-red-600 flex items-center gap-1">
            <Ban size={12} /> Blocked
          </span>
        ) : (
          <span className="text-green-600 flex items-center gap-1">
            <CheckCircle size={12} /> Active
          </span>
        )}
      </td>

      <td className="px-6 py-4">
        <Calendar size={14} className="inline mr-2 text-gray-400" />
        {formatDate(user.created_at)}
      </td>

      <td className="px-6 py-4 text-right space-x-2">
        {user.role !== 'admin' ? (
          <>
            <button
              onClick={() => onToggleBlock(user.id, user.isBlock, user.role)}
              className="px-3 py-1.5 text-sm rounded bg-gray-50"
            >
              {user.isBlock ? 'Unblock' : 'Block'}
            </button>
            <button
              onClick={() => onDelete(user.id, user.role)}
              className="px-3 py-1.5 text-sm rounded bg-gray-50"
            >
              <Trash2 size={14} />
            </button>
          </>
        ) : (
          <span className="text-purple-700 bg-purple-50 px-3 py-1.5 rounded text-sm">
            Protected
          </span>
        )}
      </td>
    </tr>
  );
}
