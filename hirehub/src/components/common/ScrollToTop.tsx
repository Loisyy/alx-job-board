import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  // State to track whether the "scroll to top" button should be visible
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to toggle visibility based on scroll position
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true); // Show button when scrolled down 300px
      } else {
        setIsVisible(false); // Hide button when near the top
      }
    };

    // Listen to the window scroll event
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to smoothly scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,        // Scroll to the very top
      behavior: 'smooth', // Smooth scrolling animation
    });
  };

  // If the button is not visible, render nothing
  if (!isVisible) {
    return null;
  }

  return (
    // Scroll-to-top button positioned fixed at bottom-right
    <button
      onClick={scrollToTop} // Trigger scroll to top on click
      className="fixed bottom-8 right-8 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-all focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 z-50"
      aria-label="Scroll to top" // Accessibility label for screen readers
    >
      {/* Up arrow icon */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
