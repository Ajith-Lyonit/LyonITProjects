import React, { useState, useRef, useEffect } from "react";

const ReadMoreWrapper = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);
  const [needsReadMore, setNeedsReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHeight = () => {
      const el = contentRef.current;
      if (el) {
        if (el.scrollHeight > 160) {
          setNeedsReadMore(true);
        } else {
          setNeedsReadMore(false);
        }
      }
    };

    // Run after children render
    requestAnimationFrame(() => {
      setTimeout(checkHeight, 0);
    });
  }, [children]);

  return (
    <div className="readmore-wrapper">
      <div
        ref={contentRef}
        className={`readmore-content ${expanded ? "expanded" : "collapsed"}`}
      >
        {children}
      </div>

      {needsReadMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="readmore-btn top"
        >
          {expanded ? (
            <>
              Read less <i className="fa-solid fa-arrow-up"></i>
            </>
          ) : (
            <>
              Read more <i className="fa-solid fa-arrow-down"></i>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ReadMoreWrapper;
