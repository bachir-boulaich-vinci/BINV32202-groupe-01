import { PERIOD_CODES, type PeriodCode } from "../models/offer.ts";
import { PERIOD_LABELS } from "../utils/labels.ts";

interface PeriodFilterProps {
  value: PeriodCode | "";
  onChange: (period: PeriodCode | "") => void;
}

const PeriodFilter = ({ value, onChange }: PeriodFilterProps) => (
  <label className="search-field">
    <span>Période</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as PeriodCode | "")}
    >
      <option value="">Toutes les périodes</option>
      {PERIOD_CODES.map((code) => (
        <option key={code} value={code}>
          {PERIOD_LABELS[code]}
        </option>
      ))}
    </select>
  </label>
);

export default PeriodFilter;
