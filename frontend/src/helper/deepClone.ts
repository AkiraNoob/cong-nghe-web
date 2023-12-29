export default function deepClone(value: unknown) {
  return JSON.parse(JSON.stringify(value));
}
