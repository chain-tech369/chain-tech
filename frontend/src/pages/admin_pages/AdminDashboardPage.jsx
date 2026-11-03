export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to the Chain-Tech administration panel.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Users</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Service Requests</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Services</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Applications</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>
      </div>
    </div>
  );
}