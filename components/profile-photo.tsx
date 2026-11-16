import Image from "next/image";

export function ProfilePhoto() {
  return (
    <figure className="profile-photo">
      <Image
        alt="Portrait of Anyph Kipngetich"
        className="profile-photo-image"
        fill
        priority
        sizes="(max-width: 767px) 100vw, 320px"
        src="/assets/profile.jpg"
        unoptimized
      />
    </figure>
  );
}
