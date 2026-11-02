import React from 'react';

/**
 * Reusable Bitnox Table Component
 * Designed for incident logs, camera listings, and metric telemetry.
 */
export default function Table({ children, className = '', ...props }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-bitnox-border bg-bitnox-surface/70 backdrop-blur-sm">
      <table className={`w-full text-left text-sm text-slate-300 ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
}

Table.Header = function TableHeader({ children, className = '', ...props }) {
  return (
    <thead
      className={`bg-bitnox-surface-elevated/80 border-b border-bitnox-border text-xs uppercase font-mono tracking-wider text-slate-400 ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
};

Table.Head = function TableHead({ children, className = '', ...props }) {
  return (
    <th scope="col" className={`px-4 sm:px-6 py-3.5 font-semibold text-slate-300 ${className}`} {...props}>
      {children}
    </th>
  );
};

Table.Body = function TableBody({ children, className = '', ...props }) {
  return <tbody className={`divide-y divide-bitnox-border/50 ${className}`} {...props}>{children}</tbody>;
};

Table.Row = function TableRow({ children, className = '', interactive = true, ...props }) {
  return (
    <tr
      className={`transition-colors duration-150 ${
        interactive ? 'hover:bg-bitnox-accent/40' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

Table.Cell = function TableCell({ children, className = '', ...props }) {
  return (
    <td className={`px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-300 font-normal ${className}`} {...props}>
      {children}
    </td>
  );
};

Table.Empty = function TableEmpty({ message = 'No data available', colSpan = 4 }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-8 text-center text-sm text-slate-500 font-mono">
        {message}
      </td>
    </tr>
  );
};
