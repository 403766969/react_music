import React, { memo, useEffect } from 'react'

import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { dicoverNavLinks } from '@/services/local-data'
import services from '@/services'

import {
  DiscoverWrapper
} from './style'

export default memo(function Discover(props) {

  useEffect(() => {
    async function getData() {
      const res = await services.get('/banner')
      console.log(res)
    }
    getData()
    return () => console.log('Unmount Discover')
  }, [])

  return (
    <DiscoverWrapper>
      <div className="partition">
        <ul className="wrap-v1 content">
          {
            dicoverNavLinks.map(item => {
              return (
                <li className="item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </li>
              )
            })
          }
        </ul>
      </div>
      {renderRoutes(props.route.routes)}
    </DiscoverWrapper>
  )
})
