import React from "react";

export default function Home() {
  return (
    <main>
      <h2>Welcome</h2>
      <p>This is a minimal JWT auth demo with access + refresh tokens.</p>
      <ul>
        <li>Register → Login → visit Dashboard (protected)</li>
        <li>Access token auto-refresh via httpOnly cookie</li>
      </ul>
    </main>
  );
}
