import React from 'react'
import { Button } from '@mui/material';
import '../scss/header.scss';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header-wrap'>
        <div className='header-page container'>
            <Button className='nav-item' variant="contained">
                <Link to="/home" className='payroll-btn'>Home</Link>
            </Button>
            <Button className='nav-item' variant="contained">
                <Link to="/detail" className='payroll-btn'>Detail</Link>
            </Button>
            <Button className='nav-item' variant="contained">
                <Link to="/payroll" className='payroll-btn'>Payroll</Link>
            </Button>
            <Button className='nav-item' variant="contained">
                <Link to="/login" className='payroll-btn'>Logout</Link>
            </Button>
        </div>
    </div>
    
  )
}

export default Header