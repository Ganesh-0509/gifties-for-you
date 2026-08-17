export function formatPrice(amountInRupees: number): string {
  return `₹${amountInRupees.toLocaleString("en-IN")}`;
}
