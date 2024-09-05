"use client";

import Button from "@src/components/Button";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <Button label="Click me" onClick={() => console.log("Button clicked!")} />
    </>
  );
}
