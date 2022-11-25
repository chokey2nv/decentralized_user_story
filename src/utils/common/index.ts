export function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
export function address64Bit(address: string) {
  return `0x${String(address).substring(2).padStart(64, "0")}`;
}
