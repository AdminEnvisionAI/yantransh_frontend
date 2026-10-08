"use client";

export default function Error({ reset }) {
  return (
    <section className="status-page" role="alert">
      <h1>We couldn’t load this page.</h1>
      <p>Please try again. If the problem continues, contact Info@yantranshVT.com.</p>
      <button type="button" onClick={() => reset()}>Try again</button>
    </section>
  );
}
