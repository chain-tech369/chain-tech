export default function Table({
  columns,
  data,
  emptyMessage = "No data found.",
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full min-w-max text-left text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 font-semibold text-gray-700"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row.id ?? index}
                className="hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-gray-700"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}