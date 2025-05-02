
import { useEffect, useState } from 'react';

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
  highlightedLines?: number[];
};

export function CodeBlock({ 
  code, 
  language = 'typescript', 
  filename, 
  highlightedLines = [] 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <div className="rounded-lg overflow-hidden bg-gray-900 text-white my-4">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm text-gray-400">{filename}</span>
          <button 
            onClick={copyToClipboard}
            className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            {copied ? (
              <>
                <span>Copied!</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </>
            ) : (
              <>
                <span>Copy</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
              </>
            )}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto font-mono text-sm">
        {code.split('\n').map((line, i) => (
          <div 
            key={i} 
            className={`${highlightedLines.includes(i + 1) ? 'highlight-line' : ''}`}
          >
            {line || '\n'}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CodeBlock;
