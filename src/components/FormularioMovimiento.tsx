import { useState, type FormEvent } from 'react';
import { CATEGORIAS, type Categoria, type Movimiento, type NuevoMovimiento, type TipoMovimiento } from '../types';
import { hoyISO, parsearMonto } from '../utils/formato';

interface Props {
  /** Si se pasa un movimiento, el formulario funciona en modo edición */
  movimiento: Movimiento | null;
  onGuardar: (datos: NuevoMovimiento) => void;
  onCancelar: () => void;
}

type Errores = Partial<Record<'monto' | 'descripcion' | 'categoria' | 'fecha', string>>;

export function FormularioMovimiento({ movimiento, onGuardar, onCancelar }: Props) {
  const [tipo, setTipo] = useState<TipoMovimiento>(movimiento?.tipo ?? 'gasto');
  const [monto, setMonto] = useState(movimiento ? String(movimiento.monto).replace('.', ',') : '');
  const [descripcion, setDescripcion] = useState(movimiento?.descripcion ?? '');
  const [categoria, setCategoria] = useState<Categoria | ''>(movimiento?.categoria ?? '');
  const [fecha, setFecha] = useState(movimiento?.fecha ?? hoyISO());
  const [errores, setErrores] = useState<Errores>({});

  const validar = (): Errores => {
    const e: Errores = {};
    const valor = parsearMonto(monto);
    if (!monto.trim()) e.monto = 'Ingresá un monto.';
    else if (Number.isNaN(valor)) e.monto = 'El monto no es un número válido.';
    else if (valor <= 0) e.monto = 'El monto debe ser mayor a 0.';
    if (!descripcion.trim()) e.descripcion = 'Ingresá una descripción.';
    if (!categoria) e.categoria = 'Elegí una categoría.';
    if (!fecha) e.fecha = 'Elegí una fecha.';
    return e;
  };

  const enviar = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) return;

    onGuardar({
      tipo,
      monto: Math.round(parsearMonto(monto) * 100) / 100,
      descripcion: descripcion.trim(),
      categoria: categoria as Categoria,
      fecha,
    });

    if (!movimiento) {
      // Después de agregar, limpiamos los campos pero mantenemos tipo y fecha
      setMonto('');
      setDescripcion('');
      setCategoria('');
    }
  };

  return (
    <form className="panel formulario" onSubmit={enviar} noValidate>
      <h2>{movimiento ? 'Editar movimiento' : 'Nuevo movimiento'}</h2>

      <div className="selector-tipo" role="radiogroup" aria-label="Tipo de movimiento">
        {(['gasto', 'ingreso'] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={tipo === t}
            className={`selector-tipo__opcion selector-tipo__opcion--${t} ${tipo === t ? 'activo' : ''}`}
            onClick={() => setTipo(t)}
          >
            {t === 'gasto' ? 'Gasto' : 'Ingreso'}
          </button>
        ))}
      </div>

      <Campo etiqueta="Monto" error={errores.monto} id="monto">
        <input
          id="monto"
          inputMode="decimal"
          placeholder="0,00"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
      </Campo>

      <Campo etiqueta="Descripción" error={errores.descripcion} id="descripcion">
        <input
          id="descripcion"
          maxLength={80}
          placeholder="Ej.: Supermercado"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </Campo>

      <div className="fila">
        <Campo etiqueta="Categoría" error={errores.categoria} id="categoria">
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as Categoria | '')}
          >
            <option value="">Elegí…</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Campo>

        <Campo etiqueta="Fecha" error={errores.fecha} id="fecha">
          <input id="fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </Campo>
      </div>

      <div className="acciones">
        {movimiento && (
          <button type="button" className="boton boton--secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
        <button type="submit" className="boton boton--primario">
          {movimiento ? 'Guardar cambios' : 'Agregar'}
        </button>
      </div>
    </form>
  );
}

interface CampoProps {
  id: string;
  etiqueta: string;
  error?: string;
  children: React.ReactNode;
}

function Campo({ id, etiqueta, error, children }: CampoProps) {
  return (
    <div className={`campo ${error ? 'campo--error' : ''}`}>
      <label htmlFor={id}>
        {etiqueta} <span aria-hidden="true">*</span>
      </label>
      {children}
      {error && (
        <span className="campo__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
