export function money(amount) {
  return "$" + Number(amount).toLocaleString("es-MX", { maximumFractionDigits: 2 });
}

export function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}
