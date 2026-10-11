import React, { useState, useEffect, useContext } from 'react';
import './MysteryBagDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MysteryBagDisplay = () => {
  const { food_list, cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [filter, setFilter] = useState('All');
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });

  // Filter mystery bags from food_list
  const mysteryBags = food_list.filter((item) => item.isMysteryBag);

  // Live countdown timer to simulate late-night surplus window
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      // Target midnight 23:45:00
      const target = new Date();
      target.setHours(23, 45, 0, 0);

      let diff = target - now;
      if (diff <= 0) {
        // If past target, show tomorrow's window or next active slot
        diff = 3 * 60 * 60 * 1000; // 3 hours fallback
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const filteredBags = mysteryBags.filter((item) => {
    if (filter === 'All') return true;
    return (item.dietaryType || '').toLowerCase() === filter.toLowerCase();
  });

  if (mysteryBags.length === 0) {
    return null; // Don't render section if no mystery bags are listed
  }

  return (
    <div className="mystery-section" id="mystery-deals">
      {/* Top Banner Header */}
      <div className="mystery-banner">
        <div className="mystery-badge-row">
          <span className="badge-pill eco-pill">🍃 Anti-Food Waste Initiative</span>
          <span className="badge-pill flash-pill">⚡ Limited Night Feasts</span>
        </div>

        <div className="mystery-header-content">
          <div className="header-text">
            <h2>🌙 Late-Night Mystery Surplus Feasts</h2>
            <p className="mystery-tagline">
              Premium kitchens & bakeries pack their fresh, unsold delicacies into surprise boxes at <strong>up to 75% OFF</strong>. Delicious for you, zero waste for the planet!
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="mystery-timer-box">
            <span className="timer-title">⏰ OFFERS EXPIRE IN</span>
            <div className="timer-digits">
              <div className="digit-block">
                <span>{formatNumber(timeLeft.hours)}</span>
                <label>HRS</label>
              </div>
              <span className="timer-sep">:</span>
              <div className="digit-block">
                <span>{formatNumber(timeLeft.minutes)}</span>
                <label>MIN</label>
              </div>
              <span className="timer-sep">:</span>
              <div className="digit-block">
                <span>{formatNumber(timeLeft.seconds)}</span>
                <label>SEC</label>
              </div>
            </div>
          </div>
        </div>

        {/* Dietary Filters */}
        <div className="mystery-filters">
          {['All', 'Veg', 'Non-Veg', 'Bakery'].map((tab) => (
            <button
              key={tab}
              className={`filter-btn ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab === 'All' && '✨ All Boxes'}
              {tab === 'Veg' && '🥗 Pure Veg'}
              {tab === 'Non-Veg' && '🍗 Non-Veg Feast'}
              {tab === 'Bakery' && '🥐 Bakery & Desserts'}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="mystery-cards-grid">
        {filteredBags.map((bag) => {
          const discountPct = bag.originalPrice && bag.originalPrice > bag.price
            ? Math.round(((bag.originalPrice - bag.price) / bag.originalPrice) * 100)
            : 65;

          const savedAmount = (bag.originalPrice || bag.price * 2.5) - bag.price;

          return (
            <div key={bag._id} className="mystery-card">
              <div className="mystery-card-img-wrapper">
                <img
                  src={url + '/images/' + bag.image}
                  alt={bag.name}
                  className="mystery-card-img"
                />
                
                <div className="discount-tag">
                  {discountPct}% OFF
                </div>

                <div className="mystery-badge-pill">
                  ✨ SURPRISE BOX
                </div>

                <div className={`dietary-badge ${bag.dietaryType?.toLowerCase()}`}>
                  {bag.dietaryType || 'Veg'}
                </div>

                {/* Add to Cart or Counter Floating Button */}
                <div className="mystery-cart-btn-wrapper">
                  {!cartItem[bag._id] ? (
                    <button
                      className="mystery-add-btn"
                      onClick={() => addToCart(bag._id)}
                    >
                      <img src={assets.add_icon_white} alt="Add" />
                      Grab Box
                    </button>
                  ) : (
                    <div className="mystery-item-counter">
                      <img
                        onClick={() => removeFromCart(bag._id)}
                        src={assets.remove_icon_red}
                        alt="Remove"
                      />
                      <p>{cartItem[bag._id]}</p>
                      <img
                        onClick={() => addToCart(bag._id)}
                        src={assets.add_icon_green}
                        alt="Add"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="mystery-card-body">
                <div className="card-top-info">
                  <span className="mystery-stock-pill">
                    🔥 Only {bag.stock || 4} boxes left
                  </span>
                  <span className="mystery-window-time">
                    {bag.startTime || '9:00 PM'} - {bag.endTime || '11:45 PM'}
                  </span>
                </div>

                <h3 className="mystery-card-title">{bag.name}</h3>
                <p className="mystery-card-desc">{bag.description}</p>

                {/* Surprise Guarantee Tag */}
                <div className="surprise-guarantee">
                  🎁 <span>Surprise Curated Box: Fresh daily kitchen batch</span>
                </div>

                <div className="mystery-pricing-row">
                  <div className="pricing-left">
                    <span className="final-price">₹{bag.price}</span>
                    {bag.originalPrice > bag.price && (
                      <span className="original-price">₹{bag.originalPrice}</span>
                    )}
                  </div>
                  <span className="savings-badge">
                    Save ₹{savedAmount}!
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explainer: How It Works */}
      <div className="mystery-how-it-works">
        <div className="how-step">
          <span className="step-icon">📦</span>
          <div className="step-info">
            <h4>1. Unsold Daily Surplus</h4>
            <p>Premium kitchens pack top-quality unsold food at the end of dinner shift.</p>
          </div>
        </div>
        <div className="how-step">
          <span className="step-icon">💰</span>
          <div className="step-info">
            <h4>2. Flat 65% - 75% Off</h4>
            <p>You pay a fraction of the cost, saving money while exploring new tastes.</p>
          </div>
        </div>
        <div className="how-step">
          <span className="step-icon">🌱</span>
          <div className="step-info">
            <h4>3. Zero Waste Hero</h4>
            <p>Every mystery order directly prevents good food from ending in landfills.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MysteryBagDisplay;
