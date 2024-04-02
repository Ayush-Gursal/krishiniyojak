import { useState } from 'react'
import Sidebar from '../components/graphsbar'
import Image1 from "./gyanchart1.jpeg";
import Image2 from "./gyanchart2.jpeg";
import './styleschart.css'

function Analytics() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  
  return (
    <div className='grid-container'>
     
      <Sidebar/>
      <h1>Gantt Charts</h1>
      <img src={Image1} alt="Image 1" className="image" style={{ height: '300px' }} />
      <img src={Image2} alt="Image 2" className="image" style={{ height: '300px' }} />
    </div>
    
  )
}

export default Analytics