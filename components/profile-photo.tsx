export function ProfilePhoto() {
  return (
    <figure aria-label="Anyph Kipngetich profile avatar" className="profile-photo" role="img">
      <svg aria-hidden="true" className="profile-avatar-art" viewBox="0 0 400 500">
        <path
          className="profile-avatar-bust"
          d="M200 84c-38 0-66 29-66 68v24c-9 10-14 24-14 39v27c0 36 23 66 55 76l-5 43-69 27c-25 10-42 32-47 60h292c-5-28-22-50-47-60l-69-27-5-43c32-10 55-40 55-76v-27c0-15-5-29-14-39v-24c0-39-28-68-66-68Z"
        />
        <path
          className="profile-avatar-detail"
          d="M160 180c12 7 25 10 40 10m-40 116c11 9 25 14 40 14s29-5 40-14"
        />
        <text className="profile-avatar-letter" x="276" y="445">A</text>
      </svg>
    </figure>
  );
}
