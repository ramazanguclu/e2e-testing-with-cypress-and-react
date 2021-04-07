import React, { FC, useState } from 'react';

export type Option = {
  id: string;
  label: string;
};

interface Props {
  list?: Option[];
  name: string;
  error?: string;
  value: Option | null;
  onChange: (item: Option) => void;
}

const Dropdown: FC<Props> = ({ name, list, value, onChange, error }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (): void => {
    setOpen((prev) => !prev);
  };

  const handleSelect = (item: Option) => (): void => {
    setOpen(false);
    onChange(item);
  };

  return (
    <div id={name} className="dropdown">
      <button
        onClick={handleClick}
        className={`btn btn-secondary btn-lg dropdown-toggle${error ? ' btn-danger' : ''}`}
        type="button"
      >
        {value?.label || 'Select'}
      </button>
      {open && list && list.length > 0 && (
        <div className="dropdown-menu">
          {list.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={handleSelect(item)}
              className="dropdown-item"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
