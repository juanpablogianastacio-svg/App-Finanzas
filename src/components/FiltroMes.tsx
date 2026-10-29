import { nombreMes } from '../utils/formato';

interface Props {
  valor: string;
  meses: string[];
  onCambio: (mes: string) => void;
}

export function FiltroMes({ valor, meses, onCambio }: Props) {
  return (
    <label className="filtro">
      <span>Mes</span>
      <select value={valor} onChange={(e) => onCambio(e.target.value)}>
        <option value="">Todos los meses</option>
        {meses.map((m) => (
          <option key={m} value={m}>
            {nombreMes(m)}
          </option>
        ))}
      </select>
    </label>
  );
}
