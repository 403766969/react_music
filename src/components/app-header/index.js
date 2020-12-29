import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'


export default memo(function AppHeader() {
  return (
    <div>
      <h2>AppHeader</h2>
      <NavLink to="/discover">发现音乐</NavLink>
      <NavLink to="/mine">我的音乐</NavLink>
    </div>
  )
})
