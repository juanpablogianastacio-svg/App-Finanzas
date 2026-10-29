import type { Movimiento } from '../types';
import { formatearFecha, formatearPesos } from '../utils/formato';

interface Props {
  movimientos: Movimiento[];
  idEnEdicion?: string;
  onEditar: (m: Movimiento) => void;
  onEliminar: (m: Movimiento) => void;
}

export function ListaMovimientos({ movimientos, idEnEdicion, onEditar, onEliminar }: Props) {
  return (
    <section className="panel lista">
      <h2>Movimientos</h2>
      {movimientos.length === 0 ? (
        <p className="vacio">No hay movimientos para mostrar.</p>
      ) : (
        <ul>
          {movimientos.map((m) => (
            <li
              key={m.id}
              className={`movimiento movimiento--${m.tipo} ${m.id === idEnEdicion ? 'movimiento--editando' : ''}`}
            >
              <div className="movimiento__info">
                <span className="movimiento__descripcion">{m.descripcion}</span>
                <span className="movimiento__meta">
                  <span className="etiqueta">{m.categoria}</span>
                  {formatearFecha(m.fecha)}
                </span>
              </div>
              <span className="movimiento__monto">
                {m.tipo === 'gasto' ? '− ' : '+ '}
                {formatearPesos(m.monto)}
              </span>
              <div className="movimiento__acciones">
                <button type="button" className="boton-icono" onClick={() => onEditar(m)} aria-label={`Editar ${m.descripcion}`}>
                  Editar
                </button>
                <button type="button" className="boton-icono boton-icono--peligro" onClick={() => onEliminar(m)} aria-label={`Eliminar ${m.descripcion}`}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
