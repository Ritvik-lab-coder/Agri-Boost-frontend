import React from 'react'
import Sidebar from '../components/Sidebar'
import '../CSS/AdminDashboard.css'

const AdminDashboard = () => {
    return (
        <div className='dashboard'>
            <div className='left-side'>
                <Sidebar />
            </div>
            <div className='right-side'>
                <div>
                    <h2 className='title' style={{ fontSize: "80px" }}>Welcome to <br /><span className='title-special'>Admin Dashboard</span></h2>
                </div>
                <div>
                    <img src="/images/farmer.png" alt="" className='farmer' />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
