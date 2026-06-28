import { Badge } from './Badge';
import { FieldTable } from './FieldTable';
import { CodeBlock } from './CodeBlock';

export const EndpointSection = ({ 
  id, 
  title, 
  method, 
  endpoint, 
  description, 
  auth, 
  rateLimit, 
  requestFields, 
  responseFields, 
  requestExample, 
  responseExample 
}) => {
  return (
    <section id={id} className="scroll-mt-24 pt-12 mt-12 border-t border-slate-800/50 first:border-0 first:pt-0 first:mt-0">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {method && <Badge method={method} />}
      </div>
      
      {endpoint && (
        <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-800/60 font-mono text-sm flex items-center mb-6">
          <span className="text-slate-500 font-semibold mr-3">{method}</span>
          <span className="text-blue-400">{endpoint}</span>
        </div>
      )}

      {description && (
        <p className="text-sm text-slate-400 leading-7 mb-6 max-w-2xl">
          {description}
        </p>
      )}

      {(auth || rateLimit) && (
        <div className="flex flex-wrap gap-4 mb-8">
          {auth && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/30 px-3 py-1.5 rounded-full border border-slate-800/50">
              <span className="font-semibold text-slate-300">Auth:</span> {auth}
            </div>
          )}
          {rateLimit && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/30 px-3 py-1.5 rounded-full border border-slate-800/50">
              <span className="font-semibold text-slate-300">Rate limit:</span> {rateLimit}
            </div>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          {requestFields && (
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 border-b border-slate-800 pb-2">Request payload</h4>
              <FieldTable fields={requestFields} />
            </div>
          )}
          {responseFields && (
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 border-b border-slate-800 pb-2">Response fields</h4>
              <FieldTable fields={responseFields} />
            </div>
          )}
        </div>

        <div className="space-y-4 lg:sticky lg:top-24">
          {requestExample && (
            <CodeBlock title="Request example" badge="JSON">
              {requestExample}
            </CodeBlock>
          )}
          {responseExample && (
            <CodeBlock title="Response (200 OK)" badge="JSON">
              {responseExample}
            </CodeBlock>
          )}
        </div>
      </div>
    </section>
  );
};
