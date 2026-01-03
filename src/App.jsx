import React, { useState, useEffect, useRef } from 'react';
import { Heart, Moon, Cat, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [fadeOutIntro, setFadeOutIntro] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        setScrollProgress(progress);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [started]);

  const handleStart = () => {
    setStarted(true);
    setShowIntro(true);
    
    // Start music
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      setIsMusicPlaying(true);
    }

    // Fade out intro after 5 seconds
    setTimeout(() => {
      setFadeOutIntro(true);
      setTimeout(() => {
        setShowIntro(false);
      }, 1500);
    }, 5000);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const sections = [
    {
      image: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=800&q=90",
      title: "DEZZE",
      subtitle: "A Special Friend",
      quote: "In a world full of noise, I found someone who understands the beauty of silence.",
      note: "To my new friend who sees the world differently"
    },
    {
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=90",
      title: "CAT LOVER",
      subtitle: "Where Cats Understand Best",
      quote: "She trusts cats more than people, and that makes perfect sense.",
      note: "Your cats are lucky to have someone who understands them",
      icon: <Cat className="w-16 h-16 text-purple-400" />
    },
    {
      image: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=800&q=90",
      title: "PEACEFUL DARKNESS",
      subtitle: "Finding Comfort in the Night",
      quote: "Not all who wander in darkness are lost—some just prefer the quiet of the moon.",
      note: "There's beauty in preferring moonlight over sunshine"
    },
    {
      image: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800&q=90",
      title: "UNDERSTANDING LONELINESS",
      subtitle: "You're Not Alone Anymore",
      quote: "Sometimes the kindest souls know loneliness the deepest.",
      note: "Loneliness doesn't mean you're meant to be alone"
    },
    {
      image: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=800&q=90",
      title: "MOVING FORWARD",
      subtitle: "Past Doesn't Define You",
      quote: "What hurt you before taught you strength you didn't know you had.",
      note: "Healing takes time, and that's completely okay"
    },
    {
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=90",
      title: "NEW FRIENDSHIP",
      subtitle: "Building Something Real",
      quote: "We're still new, still learning about each other. And that's perfectly fine.",
      note: "Real friendship grows naturally, not forcefully"
    }
  ];

  if (!started) {
    return (
      <div className="landing-screen">
        {/* Animated stars background */}
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Enter button with classy animation */}
        <div className="landing-content">
          <div className="moon-container">
            <Moon className="moon-icon" fill="currentColor" />
          </div>

          <h1 className="landing-title">A TRIBUTE</h1>

          <div className="divider" />

          {/* Classy enter button */}
          <button onClick={handleStart} className="enter-button">
            {/* Corner decorations */}
            <div className="corner corner-tl" />
            <div className="corner corner-tr" />
            <div className="corner corner-bl" />
            <div className="corner corner-br" />

            <span className="enter-text">ENTER</span>
          </button>

          <p className="tap-text">Tap to Begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      {/* Background audio */}
      <audio 
        ref={audioRef} 
        loop 
        src="./public/chill.mp3"
      />

      {/* Intro Screen */}
      {showIntro && (
        <div className={`intro-screen ${fadeOutIntro ? 'fade-out' : ''}`}>
          {/* Background image */}
          <div className="intro-bg">
            <img 
              src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&q=90"
              alt="Dark aesthetic"
              className="intro-img"
            />
            <div className="intro-overlay" />
          </div>

          <div className="intro-content">
            <div className="intro-divider-top" />

            <div className="intro-text">
              <p className="intro-for">For</p>
              
              <h1 className="intro-name">DEZZE</h1>
              
              <div className="intro-quotes">
                <p className="intro-quote-main">
                  The girl who survives the dark in silence
                </p>
                <p className="intro-quote-sub">
                  And finds beauty where others fear to look
                </p>
              </div>

              <div className="intro-icons">
                <Moon className="intro-icon" />
                <Cat className="intro-icon" />
                <Heart className="intro-icon" fill="currentColor" />
              </div>
            </div>

            <div className="intro-divider-bottom" />
          </div>
        </div>
      )}

      {/* Music control */}
      <button onClick={toggleMusic} className="music-button">
        {isMusicPlaying ? (
          <Volume2 className="music-icon active" />
        ) : (
          <VolumeX className="music-icon" />
        )}
      </button>

      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Scroll indicator */}
      {!showIntro && (
        <div className="scroll-indicator">
          <ChevronDown className="scroll-icon" />
        </div>
      )}

      {/* Main content */}
      <div ref={containerRef} className="content-container">
        {/* Hero */}
        <section className="hero-section">
          <div className="hero-bg" />
          
          {/* Stars */}
          <div className="hero-stars">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          <div className="hero-content">
            <div className="hero-icons">
              <Moon className="hero-icon small" />
              <Cat className="hero-icon" />
              <Heart className="hero-icon" fill="currentColor" />
              <Cat className="hero-icon" />
              <Moon className="hero-icon small" />
            </div>
            
            <h1 className="hero-title">DEZZE</h1>
            
            <div className="hero-divider" />
            
            <p className="hero-subtitle">MY SPECIAL FRIEND</p>
            
            <p className="hero-text">IN DARKNESS WE FOUND UNDERSTANDING</p>

            <p className="hero-description">
              To the friend who loves cats, embraces the quiet, and shows me a different perspective
            </p>
          </div>
        </section>

        {/* Sections */}
        {sections.map((section, index) => (
          <section key={index} className="content-section">
            {/* Full image background */}
            <div className="section-bg">
              <img 
                src={section.image} 
                alt={section.title}
                className="section-img"
              />
              <div className="section-overlay" />
            </div>

            {/* Content */}
            <div className="section-content">
              {section.icon && (
                <div className="section-icon-container">
                  {section.icon}
                </div>
              )}

              <div className="section-header">
                <p className="section-chapter">Chapter {index + 1}</p>
                <h2 className="section-title">{section.title}</h2>
                <p className="section-subtitle">{section.subtitle}</p>
              </div>

              <div className="section-quote">
                <p className="quote-text">"{section.quote}"</p>
              </div>

              {/* Note card */}
              <div className="section-note">
                <p className="note-text">📝 {section.note}</p>
              </div>

              {/* Cat decorations */}
              {section.icon && (
                <div className="cat-decoration">
                  {[...Array(5)].map((_, i) => (
                    <Cat key={i} className="cat-small" />
                  ))}
                </div>
              )}

              {/* Progress dots */}
              <div className="progress-dots">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className={`dot ${i === index ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Final */}
        <section className="final-section">
          <div className="final-stars">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="star-small"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="final-content">
            <div className="final-icons">
              <Cat className="final-icon" />
              <Heart className="final-icon large" fill="currentColor" />
              <Cat className="final-icon" />
            </div>
            
            <h2 className="final-title">GRATEFUL</h2>
            
            <p className="final-subtitle">To my friend Dezze</p>

            <p className="final-text">
              Thank you for being yourself—a friend who loves cats, finds peace in quiet moments, and sees beauty in darkness. I'm honored you're letting me be part of your world. This friendship may be new, but it already means a lot. No judgment, no pressure, just genuine connection.
            </p>

            <div className="final-tags">
              <span>Understanding</span>
              <span>•</span>
              <span>Acceptance</span>
              <span>•</span>
              <span>Respect</span>
              <span>•</span>
              <span>Always</span>
            </div>

            <div className="final-divider">
              <div className="line left" />
              <Moon className="divider-icon" fill="currentColor" />
              <Cat className="divider-icon" />
              <div className="line right" />
            </div>

            <p className="final-quote">"Real friends accept you exactly as you are"</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;