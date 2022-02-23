import React, { useCallback, useEffect, useState } from 'react'
import RandomButton from '../components/RandomButton';
import '../scss/payroll.scss';
import '../scss/home.scss';
import SelectBox from '../components/SelectBox';
import SelectDate from '../components/SelectDate';
import InputBox from '../components/InputBox';
import TableView from '../components/TableView';
import {LIST_PAYROLL} from '../../../data_clients/mock_data';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { filterAllSelector } from '../redux/selector';
import { AppState } from '../../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { setDefaultListPayroll } from '../redux/payroll';
import Header from '../components/Header';


const data = LIST_PAYROLL.payrolls;

function Payroll() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const payrollList = useSelector(filterAllSelector);
  const [listData, setListData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    item: 6
  })
  const [status, setStatus] = useState<Array<string>>(['Receive', 'Processing', 'Fulfill', 'Cancel', 'Pending']);
  // const [client, setClient] = useState<Array<string>>(['Receive', 'Processing', 'Fulfill', 'Cancel', 'Pending']);
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  // console.log(useSelector((state:AppState) =>state.payroll.filters))

  const pushData = useCallback( async()=>{
    dispatch(setDefaultListPayroll(data))
  },[])

  useEffect(()=>{
    setListData(data);
  },[page])

  useEffect(()=>{
    pushData()
  },[])

  return (
    <>
      <Header></Header>
      <div className='container content-wrap payroll-container'>
        <div className='row justify-content-between me-0 mb-2'>
          <p className='header col-9'>Payroll Transactions List</p>
          <div className="col-3">
            <div className="row justify-content-end">
              <RandomButton value="Export CSV" type="default" data={data}/> 
            </div>   
          </div>
        </div>
        <div className='row justify-content-between me-0'>
          <div className='col-9'>
            <div className="row justify-content-evenly">
              <SelectBox value="Status" data={status}/>
              <SelectBox value="Client" data={status}/>
              <SelectDate from = "From" to="To"/>
              <InputBox value="Invoice #"/>
            </div>
          </div>
          <div className='col-3'>
            <div className="row justify-content-between h-100">
              <RandomButton value="apply" type="confirm" data={data}/>
              <RandomButton value="clear" type="cancel" data={data}/>
            </div>
          </div>
        </div>
        <div className="row mt-4 ms-1 me-1">
          <TableView data={payrollList.slice(page * pagination.item - pagination.item, page * pagination.item)} listStatus={status}/>
        </div>
        
        <div className='row mt-2'>
          <div className='col-6 ps-4' style={{fontWeight: '600'}}>
            Showing {pagination.item} from {listData.length} data
          </div>
          <div className='col-6 d-flex justify-content-end'>
            <Stack spacing={2}>
              <Pagination count={Math.ceil(payrollList.length / pagination.item)} page={page} color="primary" onChange={ handleChange } defaultPage={1}/>
            </Stack>
          </div>
        </div>
      </div>
    </>
    
    
  )
}

export default Payroll