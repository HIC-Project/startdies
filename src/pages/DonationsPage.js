import React, { useState } from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import { SiMastercard, SiVisa } from 'react-icons/si';
import { COLORS } from '../themes';

const DonationPage = () => {
  const [amount, setAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleAmountSelect = (value) => {
    setSelectedAmount(value);
    if (value !== 'other') {
      setAmount(value);
    } else {
      setAmount('');
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount) {
      setShowThankYou(true);
    }
  };

  const closePopup = () => {
    setShowThankYou(false);
    setAmount('');
    setSelectedAmount(null);
  };

  return (
    <div className="donationContainer" style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Donation</h1>
        <p style={styles.subtitle}>Support the Growth of Our Web</p>
      </div>

      <div style={styles.content}>
        <div style={styles.infoSection}>
          <div style={styles.infoBox}>
            <h2 style={styles.infoTitle}>Why Donate?</h2>
            <p style={styles.infoText}>
              Your support helps us continue developing this platform—making it faster, smarter, and
              packed with new features. Every donation directly funds:
            </p>
            <ul style={styles.infoList}>
              <li>Website improvements</li>
              <li>Advanced features and tools</li>
              <li>Better user experience</li>
              <li>Hosting & maintenance costs</li>
            </ul>
          </div>

          <div style={styles.infoBox}>
            <h2 style={styles.infoTitle}>What's Coming with Your Support?</h2>
            <ul style={styles.infoList}>
              <li>New Features & Tools</li>
              <li>Speed Optimization</li>
              <li>Modern User Interface Upgrades</li>
              <li>Enhanced Security</li>
              <li>Mobile App Integration</li>
            </ul>
          </div>

          {/* Logo section removed */}
        </div>

        <div style={styles.donationSection}>
          <h2 style={styles.donationTitle}>Make a one time donation</h2>
          <p style={styles.donationText}>
            Choose the amount you're comfortable with. Every contribution, big or small, means the world to us!
          </p>

          <form onSubmit={handleSubmit} style={styles.donationForm}>
            <div style={styles.amountLabel}>I'm giving</div>
            <div style={styles.amountInput}>
              <span style={styles.currencySymbol}>$</span>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.amountButtons}>
              <button
                type="button"
                style={selectedAmount === '25' ? styles.amountButtonSelected : styles.amountButton}
                onClick={() => handleAmountSelect('25')}
              >
                $25
              </button>
              <button
                type="button"
                style={selectedAmount === '50' ? styles.amountButtonSelected : styles.amountButton}
                onClick={() => handleAmountSelect('50')}
              >
                $50
              </button>
              <button
                type="button"
                style={selectedAmount === '75' ? styles.amountButtonSelected : styles.amountButton}
                onClick={() => handleAmountSelect('75')}
              >
                $75
              </button>
              <button
                type="button"
                style={selectedAmount === 'other' ? styles.amountButtonSelected : styles.amountButton}
                onClick={() => handleAmountSelect('other')}
              >
                Other
              </button>
            </div>

            <div style={styles.paymentMethods}>
              <div style={styles.paymentIcons}>
                <SiVisa size={32} color="#1A1F71" />
                <div style={styles.mastercardLogo}>
                  <div style={styles.mastercardCircleRed}></div>
                  <div style={styles.mastercardCircleYellow}></div>
                </div>
                <FaPaypal size={32} color="#003087" />
              </div>
            </div>

            <button type="submit" style={styles.submitButton}>
              <FaCreditCard style={styles.buttonIcon} />
              <span>Proceed to Payment</span>
            </button>
          </form>
        </div>
      </div>

      {/* Thank You Popup */}
      {showThankYou && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h2 style={styles.popupTitle}>Thank You for Your Donation!</h2>
            <p style={styles.popupText}>
              Your generous contribution of ${amount} will help us improve and grow our platform.
              We truly appreciate your support!
            </p>
            <div style={styles.checkmark}>✓</div>
            <button style={styles.closeButton} onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    color: COLORS.teal,
    margin: '0',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    margin: '0.5rem 0 0',
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  infoSection: {
    flex: '1',
    minWidth: '300px',
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  infoTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginTop: '0',
  },
  infoText: {
    lineHeight: '1.5',
    color: '#444',
  },
  infoList: {
    paddingLeft: '1.5rem',
    margin: '0.5rem 0',
    lineHeight: '1.6',
    color: '#444',
  },
  /* Logo styles removed */
  donationSection: {
    flex: '1',
    minWidth: '300px',
  },
  donationTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginTop: '0',
  },
  donationText: {
    lineHeight: '1.5',
    color: '#444',
    marginBottom: '1.5rem',
  },
  donationForm: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  amountLabel: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  amountInput: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
    position: 'relative',
  },
  currencySymbol: {
    position: 'absolute',
    left: '1rem',
    fontSize: '1.2rem',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '0.8rem 1rem 0.8rem 2rem',
    fontSize: '1.2rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  amountButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '0.5rem',
    marginBottom: '2rem',
  },
  amountButton: {
    flex: '1',
    padding: '0.7rem',
    backgroundColor: '#f1f1f1',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#333',
    transition: 'all 0.2s ease',
  },
  amountButtonSelected: {
    flex: '1',
    padding: '0.7rem',
    backgroundColor: COLORS.lightMint,
    border: `1px solid ${COLORS.teal}`,
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: COLORS.teal,
    transition: 'all 0.2s ease',
  },
  paymentMethods: {
    marginBottom: '2rem',
  },
  paymentIcons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    alignItems: 'center',
  },
  mastercardLogo: {
    position: 'relative',
    width: '32px',
    height: '20px',
  },
  mastercardCircleRed: {
    position: 'absolute',
    left: '0',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#EB001B',
  },
  mastercardCircleYellow: {
    position: 'absolute',
    right: '0',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#F79E1B',
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: COLORS.teal,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
  },
  buttonIcon: {
    marginRight: '0.5rem',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '2rem',
    width: '90%',
    maxWidth: '500px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  popupTitle: {
    color: COLORS.teal,
    fontSize: '1.8rem',
    marginTop: 0,
  },
  popupText: {
    color: '#444',
    lineHeight: '1.5',
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
  },
  checkmark: {
    backgroundColor: COLORS.mint,
    color: '#fff',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    margin: '1rem auto',
  },
  closeButton: {
    backgroundColor: COLORS.darkBlue,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.8rem 2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.2s ease',
  },
};

export default DonationPage;