import React from 'react'
import './NavItem.css';

export default function NavItem(props) {
  return (
    <div>
      <a className="item">{props.name}</a>
    </div>
  )
}
