import React from 'react'

const QuickAction = () => {
  return (
    <div>
        <div className="quickaction">
            <div className="action-card">
                <span>📍</span>
                <h3>Near Me</h3>
                <p>Places within 10km</p>
            </div>

            <div className="action-card">
                <span>🍂</span>
                <h3>Peak</h3>
                <p>Best places right now!</p>
            </div>

            <div className="action-card">
                <span>⭐</span>
                <h3>Popular</h3>
                <p>Most Popular Places.</p>
            </div>
        </div>
    </div>
  )
}

export default QuickAction