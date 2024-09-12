import type { PendingGoals } from '../models/pending-goals';

export async function getPendingGoals(): Promise<PendingGoals> {
  const response = await fetch('http://localhost:3333/pending-goals');
  const data = await response.json();

  return data;
}
