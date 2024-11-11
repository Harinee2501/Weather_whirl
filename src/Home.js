import React from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from './videos/WEATHERWHIRL.mp4';  // Add your video file here

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Background Video */}
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        style={styles.backgroundVideo}
      />

      {/* Dimmed overlay */}
      <div style={styles.overlay}></div>

      {/* Content */}
      <div style={styles.content}>
        {/* Top Button Row */}
        <div style={styles.buttonRow}>
          <div style={styles.buttonBox}>
            <Link to="/today" style={styles.button}>Today's Weather</Link>
          </div>
          <div style={styles.buttonBox}>
            <Link to="/hourly" style={styles.button}>Hourly Forecast</Link>
          </div>
        </div>

        {/* Bottom Button Row */}
        <div style={styles.buttonRow}>
          <div style={styles.buttonBox}>
            <Link to="/weekly" style={styles.button}>Weekly Forecast</Link>
          </div>
          <div style={styles.buttonBox}>
            <Link to="/search" style={styles.button}>Search by City/Zipcode</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS styles in JavaScript
const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // This will dim the background
    zIndex: 0,
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 1,
    padding: '20px',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  buttonBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Dark background for each box
    padding: '20px',
    borderRadius: '10px',
    width: '200px',
    textAlign: 'center',
  },
  button: {
    textDecoration: 'none',
    fontSize: '1.2rem',
    color: '#fff',  // Ensuring text inside button is white
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#333',
    display: 'inline-block',  // Makes the Link behave like a button
    transition: 'background-color 0.3s',
  },
};

export default Home;



