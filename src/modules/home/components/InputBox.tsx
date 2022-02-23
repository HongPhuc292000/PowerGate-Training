import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../scss/payroll.scss';
import { filterInvoicePayroll } from '../redux/payroll';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';

interface Props{
  value: string
}

function InputBox(props: Props) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  
  const { value } = props;

  const handleChangeInvoice = (e:any)=>{
    dispatch(filterInvoicePayroll(e.target.value));
  }

  return (
    <TextField className='col-2' id="outlined-basic" label={value} variant="outlined" onChange={ handleChangeInvoice }/>
  )
}

export default InputBox