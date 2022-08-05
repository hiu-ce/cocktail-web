export function sleep(ms = 100): Promise<void> {
  console.log('Kindly remember to remove `sleep`');
  return new Promise((resolve) => setTimeout(resolve, ms));
}
