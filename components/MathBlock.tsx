import React, { useMemo } from 'react';
import katex from 'katex';

interface MathBlockProps {
  latex: string;
  block?: boolean;
  className?: string;
}

const MathBlock: React.FC<MathBlockProps> = ({ latex, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      // renderToString does not enforce strict mode check for quirks mode like render() does
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: block,
      });
    } catch (e) {
      console.error("KaTeX rendering error:", e);
      return latex; // Fallback to raw latex on error
    }
  }, [latex, block]);

  return (
    <span 
      className={`${block ? 'my-2 block' : 'mx-1'} ${className}`} 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};

export default MathBlock;