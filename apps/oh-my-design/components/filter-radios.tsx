"use client";

type Option<T extends string> = T;

export function FilterRadios<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: readonly Option<T>[];
  onChange: (next: T) => void;
}) {
  return (
    <fieldset className="bare-set">
      <legend className="kicker">{legend}</legend>
      <div className="chip-row" role="presentation">
        {options.map((option) => {
          const id = `${name}-${option}`;
          return (
            <label className="chip" key={option} htmlFor={id}>
              <input
                id={id}
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
