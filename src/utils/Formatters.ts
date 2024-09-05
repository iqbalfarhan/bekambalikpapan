export function rupiah(nominal: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(nominal);
}

export function hariTanggal(tanggal: string) {
  const date = new Date(tanggal);

  const formatter = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return formatter.format(date);
}

export function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();

  return initials.slice(0, 2);
}
