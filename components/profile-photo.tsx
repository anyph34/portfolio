import Image from "next/image";

export function ProfilePhoto() {
  const profileImage =
    process.env.GITHUB_PAGES === "true" ? "/portfolio/assets/profile.jpg" : "/assets/profile.jpg";

  return (
    <figure className="profile-photo">
      <Image
        alt="Portrait of Anyph Kipngetich"
        className="profile-photo-image"
        fill
        priority
        sizes="(max-width: 767px) 100vw, 320px"
        src={profileImage}
        unoptimized
      />
    </figure>
  );
}
