import DishManager from '../managers/DishManager.ts';

// Use for populate. Uncomment function call and restart app. Then comment.
export async function populate(): Promise<void> {
  const manager = DishManager;
  await manager.create({
    name: 'lunch',
    price: 95,
  });
  await manager.create({
    name: 'breakfast',
    price: 75,
  });
}

// populate().then();
