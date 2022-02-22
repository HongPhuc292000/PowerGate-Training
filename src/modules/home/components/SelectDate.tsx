import React from 'react'
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { filterDateFromPayroll, filterDateToPayroll } from '../redux/payroll';
import Stack from '@mui/material/Stack';
import '../css/payroll.css';

interface Props{
  from: string,
  to: string
}

function SelectDate(props: Props) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const { from, to } = props;

  return (
    <div className='col-5'>
        <Stack component="form" noValidate spacing={3} className="row date-wrap">
          <TextField
            id="date"
            label={from}
            type="date"
            defaultValue={Date.now}
            sx={{ width: 160 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e)=>{
              dispatch(filterDateFromPayroll(Date.parse(e.target.value)));
            }}
          />

          <TextField
            id="date"
            label={to}
            type="date"
            defaultValue={Date.now}
            sx={{ width: 160, marginTop: '0 !important'}}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e)=>{
              dispatch(filterDateToPayroll(Date.parse(e.target.value) + 86400000));
            }}
          />
        </Stack>
    </div>
  )
}

export default SelectDate