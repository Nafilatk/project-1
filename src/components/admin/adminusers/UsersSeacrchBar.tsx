import { Search } from 'lucide-react';

export default function UsersSearchBar(props: any) {
  const { searchTerm, setSearchTerm, total, filtered } = props;

  return (
    <div className="bg-white p-6 border rounded-xl mb-6 flex justify-between items-center">
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
        />
      </div>
      <div className="text-sm text-gray-500">
        Showing {filtered} of {total} users
      </div>
    </div>
  );
}
