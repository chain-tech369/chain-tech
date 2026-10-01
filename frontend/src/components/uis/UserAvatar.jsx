export default function UserAvatar({
  currentUser,
  size = "h-10 w-10",
}) {
  const firstName = currentUser?.first_name || "";
  const lastName = currentUser?.last_name || "";

  const fullName =
    `${firstName} ${lastName}`.trim() || "User";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase() || "U";

  return (
    <div
      className={`${size} flex items-center justify-center rounded-full bg-yellow-400 font-semibold text-slate-950`}
      title={fullName}
    >
      {initials}
    </div>
  );
}