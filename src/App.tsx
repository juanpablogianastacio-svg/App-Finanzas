import { useMemo, useState } from 'react';
import { Resumen } from './components/Resumen';
import { FormularioMovimiento } from './components/FormularioMovimiento';
import { FiltroMes } from './components/FiltroMes';
import { ListaMovimientos } from './components/ListaMovimientos';
import { useMovimientos } from './hooks/useMovimientos';
import type { Movimiento, NuevoMovimiento } from './types';
import { hoyISO } from './utils/formato';

export default function App() {
  const { movimientos, agregar, editar, eliminar } = useMovimientos();
  const [mes, setMes] = useState<string>(hoyISO().slice(0, 7)); // '' = todos
  const [enEdicion, setEnEdicion] = useState<Movimiento | null>(null);

  const mesesDisponibles = useMemo(() => {
    const meses = new Set(movimientos.map((m) => m.fecha.slice(0, 7)));
    meses.add(hoyISO().slice(0, 7));
    return [...meses].sort().reverse();
  }, [movimientos]);

  const visibles = useMemo(
    () =>
      movimientos
        .filter((m) => !mes || m.fecha.startsWith(mes))
        .sort((a, b) => b.fecha.localeCompare(a.fecha) || b.creadoEn - a.creadoEn),
    [movimientos, mes],
  );

  const guardar = (datos: NuevoMovimiento) => {
    if (enEdicion) {
      editar(enEdicion.id, datos);
      setEnEdicion(null);
    } else {
      agregar(datos);
    }
  };

  const borrar = (m: Movimiento) => {
    if (window.confirm(`¿Eliminar "${m.descripcion}"?`)) {
      eliminar(m.id);
      if (enEdicion?.id === m.id) setEnEdicion(null);
    }
  };

  return (
    <div className="app">
      <header className="encabezado">
        <h1>Finanzas personales</h1>
        <FiltroMes valor={mes} meses={mesesDisponibles} onCambio={setMes} />
      </header>

      <Resumen movimientos={visibles} />

      <main className="contenido">
        <FormularioMovimiento
          key={enEdicion?.id ?? 'nuevo'}
          movimiento={enEdicion}
          onGuardar={guardar}
          onCancelar={() => setEnEdicion(null)}
        />
        <ListaMovimientos
          movimientos={visibles}
          idEnEdicion={enEdicion?.id}
          onEditar={(m) => {
            setEnEdicion(m);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onEliminar={borrar}
        />
      </main>
    </div>
  );
}
