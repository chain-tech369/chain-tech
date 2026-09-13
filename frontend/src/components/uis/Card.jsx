export default function Card({
  children,
  title,
  description,
  className = "",
}) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      {title && (
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}