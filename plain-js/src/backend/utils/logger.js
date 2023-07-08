export function logger(...args) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  console.log(...args);
}
