import { useEffect, useState } from 'react';
import './App.css';
import { fetchItems, type Item } from './api';

function VirtualDropdown({
  items,
  selectedItem,
  onSelect,
  isOpen,
  onToggle,
}: {
  items: Item[];
  selectedItem: Item | null;
  onSelect: (item: Item) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="dropdown-container">
      <button className="dropdown-trigger" onClick={onToggle}>
        <span className="selected-text">
          {selectedItem ? selectedItem.name : 'Select an item...'}
        </span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="listbox">
          <div className="dropdown-list" style={{ height: 400 }}>
            {items.map(item => (
              <div
                key={item.id}
                className={`item-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
                onClick={() => onSelect(item)}
                role="option"
              >
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-code">{item.code}</span>
                </div>
                <div className="item-details">
                  <span className="continent">{item.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
    setIsDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Item Selector</h1>
        <p className="subtitle">Select an item from {items.length} available options</p>

        <VirtualDropdown
          items={items}
          selectedItem={selectedItem}
          onSelect={handleItemSelect}
          isOpen={isDropdownOpen}
          onToggle={handleDropdownToggle}
        />

        {selectedItem && (
          <div className="selected-display">
            <h2>Selected Item</h2>
            <div className="item-card">
              <div className="item-header">
                <h3>{selectedItem.name}</h3>
                <span className="item-code-badge">{selectedItem.code}</span>
              </div>
              <div className="item-details-grid">
                <div className="detail-item">
                  <span className="label">Code:</span>
                  <span className="value">{selectedItem.code}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
