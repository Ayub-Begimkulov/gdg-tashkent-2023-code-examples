import { b } from "../utils/b";

export const fetchGoogle = () => {
  return fetch("https://google.com").then(() => b());
};
