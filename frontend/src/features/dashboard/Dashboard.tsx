import BoardList from "../boards/BoardList";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header
      <div>
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="text-gray-600 mt-1">
          Here’s a quick overview of your board activity.
        </p>
      </div> */}

      <BoardList />
    </div>
  );
};
