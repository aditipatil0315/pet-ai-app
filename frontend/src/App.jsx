import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import heroImage from "./assets/imgg.jpg";

function App() {
  const [petType, setPetType] = useState("dog");
  const [ageGroup, setAgeGroup] = useState("adult");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const answerRef = useRef(null);
  const chatSectionRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer("Loading...");

    try {
      const res = await axios.post("http://localhost:5000/api/pet-ai", {
        petType,
        ageGroup,
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Failed to get response");
    }
  };

  // Auto-scroll answer box when new answer arrives
  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.scrollTop = answerRef.current.scrollHeight;
    }
  }, [answer]);

  const scrollToChat = () => {
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="paw-icon">🐾</span>
            <h2>PetAI Care</h2>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#chat" onClick={(e) => { e.preventDefault(); scrollToChat(); }}>Chat</a></li>
            <li><a href="#about">About</a></li>
            {/* <li><a href="#contact">Contact</a></li> */}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Your Trusted Companion for Pet Care</h1>
            <p className="hero-tagline">
              Get personalized, expert advice for your furry friends. 
              From nutrition to health concerns, we're here to help you 
              provide the best care for your beloved pets.
            </p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">🐕</span>
                <span>Dog & Cat Specialists</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🏥</span>
                <span>24/7 Health Advice</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💬</span>
                <span>Personalized Answers</span>
              </div>
            </div>
            <button className="hero-cta" onClick={scrollToChat}>
              Ask Our Pet AI Assistant
              <span className="arrow-down">↓</span>
            </button>
          </div>
          <div className="hero-image">
           
<div className="hero-image">
  <div className="image-placeholder">
    <img 
      src={heroImage} 
      alt="Happy pets - dog and cat playing together"
      className="hero-pet-image"
    />
  </div>
</div>           
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="chat-section" id="chat" ref={chatSectionRef}>
        <div className="container">
          <h1>Pet AI Assistant</h1>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Pet Type:
              <select value={petType} onChange={(e) => setPetType(e.target.value)}>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </label>

            <label>
              Age Group:
              <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
                <option value="puppy">Puppy/Kitten</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
              </select>
            </label>

            <label>
              Question:
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question..."
                required
              />
            </label>

            <button type="submit">Ask AI</button>
          </form>

          {answer && (
            <div className="answer-box" ref={answerRef}>
              {answer.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="paw-icon">🐾</span>
            <h3>PetAI Care</h3>
          </div>
          <p className="footer-tagline">
            Providing trustworthy AI-powered pet care advice since 2024
          </p>
          <p className="footer-note">
            Note: This AI assistant provides general advice. Always consult with a veterinarian for serious health concerns.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;