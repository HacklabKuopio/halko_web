import React from 'react'

export const CustomerSpecificBlock: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="container p-4 border-2 border-dashed border-primary rounded-md">
      <h3 className="text-xl font-bold mb-2">Customer Specific Component</h3>
      <p>{message || 'No message provided.'}</p>
    </div>
  )
}

