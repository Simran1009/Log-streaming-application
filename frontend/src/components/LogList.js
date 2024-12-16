import React from 'react';

function LogList({ logs }) {
  return (
    <div className="log-list">
      {logs.length === 0 ? (
        <p className="no-logs">No logs to display</p>
      ) : (
        logs.map((log, index) => (
          <div key={index} className={`log-entry log-${log.level.toLowerCase()}`}>
            <span className="log-timestamp">[{log.timestamp}]</span>
            <strong className="log-level">{log.level}</strong>: {log.message}
          </div>
        ))
      )}
    </div>
  );
}

export default LogList;
