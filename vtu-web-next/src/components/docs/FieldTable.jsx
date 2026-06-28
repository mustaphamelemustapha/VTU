export const FieldTable = ({ fields }) => (
  <div className="mt-4 overflow-x-auto border border-slate-800 rounded-xl">
    <table className="min-w-full divide-y divide-slate-800 text-sm text-left">
      <thead className="bg-slate-900/60">
        <tr>
          <th className="px-4 py-2.5 font-semibold text-slate-300 font-mono text-xs">Field</th>
          <th className="px-4 py-2.5 font-semibold text-slate-300 text-xs">Type</th>
          <th className="px-4 py-2.5 font-semibold text-slate-300 text-xs">Notes</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800 text-slate-400 text-xs">
        {fields.map((f, i) => (
          <tr key={i}>
            <td className="px-4 py-2.5 font-mono text-blue-400 whitespace-nowrap">{f.field}</td>
            <td className="px-4 py-2.5 text-slate-300 whitespace-nowrap">{f.type}</td>
            <td className="px-4 py-2.5">{f.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
