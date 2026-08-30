import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="code-block-wrapper">
      <button onClick={handleCopy} aria-label="Copy code" className="code-copy-btn">
        {copied ? (
          <span className="flex items-center gap-1 text-emerald-400">
            <Check size={10} /> Copied
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Copy size={10} /> Copy
          </span>
        )}
      </button>
      <code className={className}>{children}</code>
    </div>
  );
}
