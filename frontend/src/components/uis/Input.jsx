export default function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full rounded-lg border px-4 py-2.5
          text-gray-900
          outline-none
          transition
          placeholder:text-gray-400
          focus:ring-2
          disabled:cursor-not-allowed
          disabled:bg-gray-100
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
          }
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}