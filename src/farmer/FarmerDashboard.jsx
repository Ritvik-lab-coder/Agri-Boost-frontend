import React from 'react'
import '../CSS/AdminDashboard.css'
import SidebarFarmer from '../components/SidebarFarmer'

const FarmerDashboard = () => {
    return (
        <div className='dashboard'>
            <div className='left-side'>
                <SidebarFarmer />
            </div>
            <div className='right-side'>
                <div>
                    <h2 className='title' style={{ fontSize: "80px" }}>Welcome to <br /><span className='title-special'>Farmer Dashboard</span></h2>
                </div>
                <div>
                    <img src="/images/farmer.png" alt="" className='farmer' />
                </div>
            </div>
        </div>
    )
}

export default FarmerDashboard