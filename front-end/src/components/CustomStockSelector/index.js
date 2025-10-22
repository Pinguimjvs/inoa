import React, { useState, useEffect, useRef } from 'react';
import './styles.css'; 

export const CustomStockSelector = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const wrapperRef = useRef(null); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (optionValue) => {
    let newValue;
    if (value.includes(optionValue)) {
      newValue = value.filter(v => v !== optionValue);
    } else {
      newValue = [...value, optionValue];
    }
    onChange(newValue);
  };

  const getDisplayText = () => {
    if (value.length === 0) {
      return 'Selecione os ativos...';
    }
    return value.join(', ');
  };

  return (
    <div className="custom-select-wrapper" ref={wrapperRef}>
      <div className="custom-select-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{getDisplayText()}</span>
        <span className="custom-select-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="custom-select-dropdown">
          <input
            type="text"
            className="custom-select-search"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <ul className="custom-select-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <li key={option.value} className="custom-select-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={value.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                    />
                    {option.label}
                  </label>
                </li>
              ))
            ) : (
              <li className="custom-select-no-options">Nenhum ativo encontrado.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomStockSelector;