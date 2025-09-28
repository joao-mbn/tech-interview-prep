export interface Item {
  id: number;
  name: string;
  code: string;
}

export async function fetchItems(): Promise<Item[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return Array(100)
    .fill('.')
    .map((_, i) => ({ id: i, name: 'Name ' + i, code: Math.random().toString() }));
}
