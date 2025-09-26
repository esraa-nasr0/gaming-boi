import React from 'react';

function GridContainer({ cols , children ,className }: { cols?: number; children: React.ReactNode ; className?: string}) {
  const gridClass = `grid grid-cols-${cols}`;
  return <div className={`grid ${className|| ""} ${gridClass}`}>{children}</div>;
}

export default GridContainer;
