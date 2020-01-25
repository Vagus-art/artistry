import React from "react";

export default function Profile(props) {
  return (
    <div>
      <h1>{props.user.nickname}</h1>
      <h2>{props.user.email}</h2>
      <h2>{props.user.id}</h2>
    </div>
  );
}
