import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const minPriceLimit = 0;
const maxPriceLimit = 1000;

const sortOptions = [
  { label: 'Price', value: 'price' },
  { label: 'Date', value: 'date' },
];

export type FilterValues = {
  minPrice: number;
  maxPrice: number;
  startDate: Date | null;
  endDate: Date | null;
  date: Date | null;
  sortBy: 'price' | 'date';
};

export const FilterSidebar: React.FC<{
  values: FilterValues;
  open: boolean;
  onApply: (values: FilterValues) => void;
  onReset: () => void;
  onClose: () => void;
}> = ({ values, open, onApply, onReset, onClose }) => {
  const [localFilters, setLocalFilters] = useState<FilterValues>(values);
  const [price, setPrice] = useState<[number, number]>([values.minPrice, values.maxPrice]);

  useEffect(() => {
    setLocalFilters(values);
    setPrice([values.minPrice, values.maxPrice]);
  }, [values]);

  if (!open) return null;

  const handlePriceChange = (val: number | number[]) => {
    const arr = Array.isArray(val) ? val : [minPriceLimit, Number(val)];
    setPrice([arr[0], arr[1]]);
    setLocalFilters((prev) => ({ ...prev, minPrice: arr[0], maxPrice: arr[1] }));
  };

  const handleChange = (key: keyof FilterValues, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({
      minPrice: minPriceLimit,
      maxPrice: maxPriceLimit,
      startDate: null,
      endDate: null,
      date: null,
      sortBy: 'date',
    });
    setPrice([minPriceLimit, maxPriceLimit]);
    onReset();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={onClose} aria-label="Close filter sidebar" />
      {/* Sidebar Drawer */}
      <aside
        className="fixed left-0 top-0 h-full bg-[#181c1f] rounded-r-2xl p-6 w-72 shadow-xl border-r border-[#23272b] flex flex-col gap-6 z-50 transition-transform duration-300"
        style={{ minWidth: 288, maxWidth: 320, transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="absolute top-4 right-4 text-[#B3B3B3] hover:text-[#1DB954] text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg font-bold text-[#b3b3b3] mb-2 tracking-wide">FILTERS</h2>
        {/* Price Range */}
        <div>
          <label className="block text-[#b3b3b3] font-medium mb-1 tracking-wide text-sm">PRICE RANGE</label>
          <Slider
            range
            min={minPriceLimit}
            max={maxPriceLimit}
            value={price}
            onChange={handlePriceChange}
            trackStyle={[{ backgroundColor: '#1DB954' }]}
            handleStyle={[
              { borderColor: '#1DB954', backgroundColor: '#181c1f' },
              { borderColor: '#1DB954', backgroundColor: '#181c1f' },
            ]}
            railStyle={{ backgroundColor: '#23272b' }}
          />
          <div className="mt-1 text-[#1DB954] text-base font-bold">
            ${price[0]} - ${price[1]}
          </div>
        </div>
        {/* Date Range */}
        <div>
          <label className="block text-[#b3b3b3] font-medium mb-1 tracking-wide text-sm">DATE RANGE</label>
          <div className="flex gap-2">
            <DatePicker
              selected={localFilters.startDate ?? undefined}
              onChange={(date) => handleChange('startDate', date ?? null)}
              selectsStart
              startDate={localFilters.startDate ?? undefined}
              endDate={localFilters.endDate ?? undefined}
              placeholderText="Start Date"
              className="w-full bg-transparent border border-[#23272b] text-white py-2 px-3 rounded-md text-base outline-none focus:border-[#1DB954]"
              calendarClassName="dark"
            />
            <DatePicker
              selected={localFilters.endDate ?? undefined}
              onChange={(date) => handleChange('endDate', date ?? null)}
              selectsEnd
              startDate={localFilters.startDate ?? undefined}
              endDate={localFilters.endDate ?? undefined}
              minDate={localFilters.startDate ?? undefined}
              placeholderText="End Date"
              className="w-full bg-transparent border border-[#23272b] text-white py-2 px-3 rounded-md text-base outline-none focus:border-[#1DB954]"
              calendarClassName="dark"
            />
          </div>
        </div>
        {/* Exact Date */}
        <div>
          <label className="block text-[#b3b3b3] font-medium mb-1 tracking-wide text-sm">EXACT DATE</label>
          <DatePicker
            selected={localFilters.date ?? undefined}
            onChange={(date) => handleChange('date', date ?? null)}
            placeholderText="Select Date"
            className="w-full bg-transparent border border-[#23272b] text-white py-2 px-3 rounded-md text-base outline-none focus:border-[#1DB954]"
            calendarClassName="dark"
          />
        </div>
        {/* Sort By */}
        <div>
          <label className="block text-[#b3b3b3] font-medium mb-1 tracking-wide text-sm">SORT BY</label>
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value as 'price' | 'date')}
            className="w-full bg-transparent border border-[#23272b] text-white py-2 px-3 rounded-md text-base outline-none focus:border-[#1DB954]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-[#1DB954] bg-[#181c1f]">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {/* Buttons */}
        <div className="mt-auto flex flex-col gap-2 pt-4">
          <button
            className="w-full py-2 rounded-md text-base font-bold bg-[#1DB954] text-[#121212] hover:bg-opacity-90 transition"
            onClick={handleApply}
            type="button"
          >
            Apply Filters
          </button>
          <button
            className="w-full py-2 rounded-md text-base font-bold border border-[#23272b] text-[#B3B3B3] hover:border-[#1DB954] hover:text-[#1DB954] transition"
            onClick={handleReset}
            type="button"
          >
            Reset Filters
          </button>
        </div>
      </aside>
    </>
  );
};
