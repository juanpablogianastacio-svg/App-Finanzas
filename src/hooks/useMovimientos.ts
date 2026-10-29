import { useCallback } from 'react';
import type { Movimiento, NuevoMovimiento } from '../types';
import { useLocalStorage } from './useLocalStorage';

const CLAVE_STORAGE = 'finanzas-personales:movimientos';

function generarId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Maneja la lista de movimientos (alta, edición y baja) persistida en localStorage. */
export function useMovimientos() {
  const [movimientos, setMovimientos] = useLocalStorage<Movimiento[]>(CLAVE_STORAGE, []);

  const agregar = useCallback(
    (datos: NuevoMovimiento) => {
      setMovimientos((prev) => [...prev, { ...datos, id: generarId(), creadoEn: Date.now() }]);
    },
    [setMovimientos],
  );

  const editar = useCallback(
    (id: string, datos: NuevoMovimiento) => {
      setMovimientos((prev) => prev.map((m) => (m.id === id ? { ...m, ...datos } : m)));
    },
    [setMovimientos],
  );

  const eliminar = useCallback(
    (id: string) => {
      setMovimientos((prev) => prev.filter((m) => m.id !== id));
    },
    [setMovimientos],
  );

  return { movimientos, agregar, editar, eliminar };
}
