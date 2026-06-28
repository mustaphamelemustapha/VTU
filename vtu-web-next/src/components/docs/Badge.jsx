export const Badge = ({ method }) => {
  const colors = {
    GET: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    POST: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    NEW: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    PATCH: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    DELETE: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors[method] || colors.GET}`}>
      {method}
    </span>
  );
};
