import React, { useEffect } from 'react'

import Sidebar from '../components/Sidebar.component'
import Timeline from '../components/Timeline.component'
import Header from '../components/Header.component'

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Instagram'
  }, [])

  return (
    <div className='bg-gray-background'>
      <Header />
      <Timeline />
      <Sidebar />
    </div>
  )
}

export default Dashboard
