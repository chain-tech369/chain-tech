export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    success:
      "bg-green-600 text-white hover:bg-green-700",

    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",

    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center
        rounded-lg font-medium
        transition
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}