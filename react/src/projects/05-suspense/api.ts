import dinosaursData from './dinosaurs.json';

export interface Dinosaur {
  id: number;
  name: string;
  period: string;
  diet: string;
  description: string;
}

const cache = new Map<string, Promise<Dinosaur[]>>();

export function getData() {
  if (!cache.has('/dinosaur')) {
    cache.set('/dinosaur', api());
  }
  return cache.get('/dinosaur')!;
}

async function api() {
  // Simulate API errors
  if (Math.random() < 0.5) {
    throw new Error('Error while fetching dinosaurs');
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return dinosaursData as Dinosaur[];
}
