import React from 'react';

export default function Button({children, href, onClick, className=''}){
  if(href){
    return (
      <a href={href} className={`btn ${className}`} target="_blank" rel="noopener noreferrer">{children}</a>
    )
  }
  return (
    <button onClick={onClick} className={`btn ${className}`}>{children}</button>
  )
}
