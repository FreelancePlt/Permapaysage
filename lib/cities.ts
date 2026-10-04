export function cityLocation(city: string): string {
  const name = city.trim();

  if (/^Le\s/i.test(name)) {
    return `au ${name.slice(3)}`;
  }

  if (/^Les\s/i.test(name)) {
    return `aux ${name.slice(4)}`;
  }

  return `à ${name}`;
}
