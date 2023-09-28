import Image from "next/image";

export function UserImage({
  image,
  className = "",
}: {
  image: string;
  className?: string;
}) {
  return (
    <div className={`relative h-9 w-9 ${className}`}>
      <Image
        src={image || "/profile.jpg"}
        alt="profile image"
        className="absolute rounded-full"
        width={128}
        height={128}
      />
    </div>
  );
}
