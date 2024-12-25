import { BarChart2, Users, Lightbulb, Globe2 } from 'lucide-react';
import './Home.css';
import { Link } from "react-router-dom";

const DhanSetuHomepage = () => {
  const stats = [
    { label: 'Rural Users', value: '50,000+' },
    { label: 'Indian Languages', value: '15+' },
    { label: 'Success Stories', value: '1000+' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Empowering Rural India with Smart Financial Solutions
          </h1>
          <p className="hero-subtitle">
            Making financial services accessible and understandable for everyone through technology and community support
          </p>
          <Link
            to="/login"
            className="get-started-button"
            style={{ borderRadius: "8px", textDecoration: "none" }}
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="solutions-section">
        <div className="container">
          <h2 className="section-title">Our Solutions</h2>
          <div className="solutions-grid">
            <div className="solution-card">
              <div className="icon-container">
                <Lightbulb color="#2563eb" size={24} />
              </div>
              <h3 className="solution-title">Smart Learning</h3>
              <ul className="solution-list">
                <li>Animation-based financial education</li>
                <li>Interactive tutorials</li>
                <li>Gamified progress tracking</li>
              </ul>
            </div>

            <div className="solution-card">
              <div className="icon-container">
                <Globe2 color="#2563eb" size={24} />
              </div>
              <h3 className="solution-title">Multilingual AI Advisor</h3>
              <ul className="solution-list">
                <li>Voice-first interface in 15+ languages</li>
                <li>Works offline in low-connectivity areas</li>
                <li>Personalized financial guidance</li>
              </ul>
            </div>

            <div className="solution-card">
              <div className="icon-container">
                <Users color="#2563eb" size={24} />
              </div>
              <h3 className="solution-title">Community Support</h3>
              <ul className="solution-list">
                <li>Peer group connections</li>
                <li>Local success stories</li>
                <li>Mentorship matching</li>
              </ul>
            </div>

            <div className="solution-card">
              <div className="icon-container">
                <BarChart2 color="#2563eb" size={24} />
              </div>
              <h3 className="solution-title">DhanSetu Growth Kit</h3>
              <ul className="solution-list">
                <li>Investment Plans</li>
                <li>Business Analytics</li>
                <li>Business Strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DhanSetuHomepage;
