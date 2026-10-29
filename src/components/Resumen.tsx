import type { Movimiento } from '../types';
import { formatearPesos } from '../utils/formato';

interface Props {
  movimientos: Movimiento[];
}

export function Resumen({ movimientos }: Props) {
  let ingresos = 0;
  let gastos = 0;
  for (const m of movimientos) {
    if (m.tipo === 'ingreso') ingresos += m.monto;
    else gastos += m.monto;
  }
  const saldo = ingresos - gastos;

  return (
    <section className="resumen" aria-label="Resumen">
      <div className="tarjeta tarjeta--ingreso">
        <span className="tarjeta__titulo">Ingresos</span>
        <strong className="tarjeta__monto">{formatearPesos(ingresos)}</strong>
      </div>
      <div className="tarjeta tarjeta--gasto">
        <span className="tarjeta__titulo">Gastos</span>
        <strong className="tarjeta__monto">{formatearPesos(gastos)}</strong>
      </div>
      <div className={`tarjeta ${saldo < 0 ? 'tarjeta--negativo' : 'tarjeta--saldo'}`}>
        <span className="tarjeta__titulo">Saldo</span>
        <strong className="tarjeta__monto">{formatearPesos(saldo)}</strong>
      </div>
    </section>
  );
}
