"use client";

import { useState } from "react";

export function ProfilePhoto() {
  const [imageUnavailable, setImageUnavailable] = useState(false);

  return (
    <figure className="profile-photo">
      {imageUnavailable ? (
        <div aria-label="Anyph Kipngetich initials" className="profile-photo-fallback">
          AK
        </div>
      ) : (
        <img
          alt="Portrait of Anyph Kipngetich"
          decoding="async"
          loading="lazy"
          onError={() => setImageUnavailable(true)}
          src="../assets/profile.jpg"
        />
      )}
    </figure>
  );
}
