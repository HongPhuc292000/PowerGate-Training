import React from 'react';
import Header from '../components/Header';
import '../scss/home.scss';
import '../scss/detail.scss';

function DetailPage() {
  return (
    <>
        <Header></Header>
        <div className='container detail-container'>
            <div className='row'>
                <div className='col-12 banner'></div>
                <div className="col-6"></div>
                <div className="col-6"></div>
            </div>
            <div className='row'>
                <div className='col-5'>
                    
                </div>
                <div className='col-7'>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default DetailPage