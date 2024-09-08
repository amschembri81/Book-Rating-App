import React, { useState } from "react";

function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.starContainer}>
        {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;

          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                style={styles.radioInput}
                onClick={() => setRating(ratingValue)}
              />
              <span
                style={{
                  ...styles.star,
                  color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                }}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              >
                ★
              </span>
            </label>
          );
        })}
      </div>
      <p style={styles.ratingText}>My rating is {rating}.</p>
    </div>
  );
}

const styles = {
  star: {
    fontSize: '25px',
    cursor: 'pointer',
  },
  starContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  radioInput: {
    display: 'none',
  },
};

export default StarRating;