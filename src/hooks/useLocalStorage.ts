import { useEffect, useState } from 'react';

function leer<T>(clave: string, valorInicial: T): T {
  try {
    const guardado = window.localStorage.getItem(clave);
    return guardado !== null ? (JSON.parse(guardado) as T) : valorInicial;
  } catch {
    return valorInicial;
  }
}

/**
 * Igual que useState, pero persiste el valor en localStorage bajo la clave dada.
 */
export function useLocalStorage<T>(clave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => leer(clave, valorInicial));

  useEffect(() => {
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // localStorage lleno o deshabilitado: la app sigue funcionando en memoria
    }
  }, [clave, valor]);

  return [valor, setValor] as const;
}
