export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="text-gray-600 mt-1">
          Here’s a quick overview of your board activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Boards</p>
          <p className="text-xl font-semibold">3</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Tasks</p>
          <p className="text-xl font-semibold">42</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-xl font-semibold">28</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Team Members</p>
          <p className="text-xl font-semibold">5</p>
        </div>
      </div>

      {/* Placeholder for widgets or charts */}
      <div className="bg-white shadow rounded p-6 text-center text-gray-400">
        Add analytics widgets, recent activity, or charts here.
      </div>
    </div>
  );
};
