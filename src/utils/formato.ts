const formateadorPesos = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formatea un monto como pesos argentinos: $ 1.234,56 */
export function formatearPesos(monto: number): string {
  const signo = monto < 0 ? '-' : '';
  return `${signo}$ ${formateadorPesos.format(Math.abs(monto))}`;
}

/** Devuelve la fecha de hoy (hora local) en formato YYYY-MM-DD */
export function hoyISO(): string {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

/** Convierte YYYY-MM-DD a DD/MM/YYYY */
export function formatearFecha(fechaISO: string): string {
  const [anio, mes, dia] = fechaISO.split('-');
  return `${dia}/${mes}/${anio}`;
}

/** Convierte YYYY-MM a "octubre de 2026" */
export function nombreMes(mesISO: string): string {
  const [anio, mes] = mesISO.split('-').map(Number);
  const texto = new Date(anio, mes - 1, 1).toLocaleDateString('es-AR', {
    month: 'long',
    year: 'numeric',
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/**
 * Interpreta un monto escrito por el usuario. Acepta "1234.56", "1234,56"
 * y "1.234,56". Devuelve NaN si no es un número válido.
 */
export function parsearMonto(texto: string): number {
  let limpio = texto.trim().replace(/\s|\$/g, '');
  if (limpio.includes(',')) {
    // Formato argentino: el punto es separador de miles y la coma, decimal
    limpio = limpio.replace(/\./g, '').replace(',', '.');
  }
  if (!/^\d+(\.\d+)?$/.test(limpio)) return NaN;
  return Number(limpio);
}
