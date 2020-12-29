import { Redirect } from 'react-router-dom'

import Discover from '@/pages/discover'
import Mine from '@/pages/mine'

const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/discover" />
    )
  },
  {
    path: "/discover",
    component: Discover
  },
  {
    path: "/mine",
    component: Mine
  }
]

export default routes
