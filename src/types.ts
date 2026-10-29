export type TipoMovimiento = 'ingreso' | 'gasto';

export const CATEGORIAS = [
  'Comida',
  'Transporte',
  'Servicios',
  'Ocio',
  'Salud',
  'Sueldo',
  'Otros',
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export interface Movimiento {
  id: string;
  tipo: TipoMovimiento;
  monto: number;
  descripcion: string;
  categoria: Categoria;
  /** Fecha en formato YYYY-MM-DD */
  fecha: string;
  /** Marca de tiempo de creación, para desempatar movimientos del mismo día */
  creadoEn: number;
}

export type NuevoMovimiento = Omit<Movimiento, 'id' | 'creadoEn'>;
