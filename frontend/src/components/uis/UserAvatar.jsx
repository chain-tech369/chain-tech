export default function UserAvatar({
  currentUser,
  size = "h-10 w-10",
}) {
  const firstName = currentUser?.first_name || "";
  const lastName = currentUser?.last_name || "";

  const fullName =
    `${firstName} ${lastName}`.trim() || "User";

  const firstInitial = firstName
    .charAt(0)
    .toUpperCase();

  const lastInitial = lastName
    .charAt(0)
    .toUpperCase();

  const initials = `${firstInitial}${lastInitial}` || "U";

  return (
    <div
      className={`${size} overflow-hidden rounded-full bg-yellow-400`}
      title={fullName}
    >
      {currentUser?.profile_image ? (
        <img
          src={currentUser.profile_image}
          alt={`${fullName} profile`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-semibold text-slate-950">
          {initials}
        </div>
      )}
    </div>
  );
}