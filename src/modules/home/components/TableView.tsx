import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../scss/payroll.scss';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IPayrollItem } from '../models/payrollModel';
import ViewDetails from './ViewDetails';
import { formatDate, formatCurrency, checkStatus } from '../common/FormatData';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { deletePayrollItem } from '../redux/payroll';
import { CSVLink } from "react-csv";


interface Props{
  data: Array<IPayrollItem>,
  listStatus: Array<string>
}

function TableView(props: Props) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const {listStatus, data} = props;

  const handleDeletePayroll = (id: string)=>{
    dispatch(deletePayrollItem(id))
  }

  return (
    <TableContainer component={Paper} className="col-12 table-wrap">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='table-header'>
          <TableRow>
            <TableCell className='table-field'>Status</TableCell>
            <TableCell className='table-field' align="left">Date</TableCell>
            <TableCell className='table-field' align="left">Client</TableCell>
            <TableCell className='table-field'align="left">Currency</TableCell>
            <TableCell className='table-field' align="left">Total</TableCell>
            <TableCell className='table-field' align="left">Invoice #</TableCell>
            <TableCell className='table-field' align="left"></TableCell>
            <TableCell className='table-field' align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.payroll_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0} }}
              className='table-item'
            >
              <TableCell className={`table-field ${checkStatus({...row})}`} component="th" scope="row">
                { checkStatus({...row}) }
              </TableCell>
              <TableCell className='table-field' align="left">{formatDate(row.time_created)}</TableCell>
              <TableCell className='table-field' align="left">{row.company_id}</TableCell>
              <TableCell className='table-field' align="left">{row.currency}</TableCell>
              <TableCell className='table-field' align="left">{formatCurrency(row.volume_input_in_input_currency + row.fees)}</TableCell>
              <TableCell className='table-field invoice' align="left"><span>{row.payroll_id}</span></TableCell>
              <TableCell className='table-field' align="center">
                <ViewDetails value="View details" type="show" data={row} listStatus = {listStatus}/>
              </TableCell>
              <TableCell className='table-field' align="center">
                <IconButton aria-label="delete" size="large" onClick={()=> handleDeletePayroll(row.payroll_id)}>
                  <DeleteIcon sx={{color: 'red'}} fontSize="inherit"/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableView