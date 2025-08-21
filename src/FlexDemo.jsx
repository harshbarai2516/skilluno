import React from "react";

export default function FlexDemo() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          style={{
            flex: '1 1 80px',
            minWidth: 60,
            minHeight: 60,
            background: '#eee',
            border: '2px solid #333',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          Box {i + 1}
        </div>
      ))}
    </div>
  );
}
