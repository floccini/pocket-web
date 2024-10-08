import type { Summary } from '../models/summary';

export async function getSummary(): Promise<Summary> {
  const response = await fetch('http://localhost:3333/summary');
  const data = await response.json();

  return data.summary;
}
