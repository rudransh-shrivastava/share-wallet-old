import React from 'react';
import getProfilePicColor from '../getProfilePicColor';

function ProfilePic({ name }) {
  return (
    <div
      className="size-12 flex items-center justify-center rounded-full shrink-0 text-white uppercase text-xl"
      style={{ backgroundColor: getProfilePicColor(name) }}
    >
      {name[0]}
    </div>
  );
}

export default ProfilePic;
