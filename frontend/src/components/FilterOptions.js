import React from 'react';

function FilterOptions({ logLevel, setLogLevel, startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
      {/* Log Level Filter */}
      <select
        value={logLevel}
        onChange={(e) => setLogLevel(e.target.value)}
        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
      >
        <option value="">All Levels</option>
        <option value="INFO">INFO</option>
        <option value="DEBUG">DEBUG</option>
        <option value="ERROR">ERROR</option>
      </select>

      {/* Start Date Filter */}
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
      />

      {/* End Date Filter */}
      <input
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
    </div>
  );
}

export default FilterOptions;
