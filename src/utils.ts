import { METACRITIC_HOST_URL } from './constant';

export function buildMetacriticURL(path: string) {
  return new URL(path, METACRITIC_HOST_URL).href;
}
