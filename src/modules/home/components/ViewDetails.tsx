import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { IPayroll } from '../models/payrollModel';
import { checkStatus, formatCurrency } from '../common/FormatData';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { updatePayrollItem } from '../redux/payroll';
import { styled, makeStyles } from '@mui/styles'
import { payrollListSelector } from '../redux/selector';
import moment, { Moment } from 'moment';
import '../css/payroll.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundColor: '#F1F2F5',
  borderRadius: '10px',
  paddingTop: '16px'
};

const titleStyle = {
  fontWeight: '600',
  textTransform: 'Uppercase',
  textAlign: 'center',
  paddingBottom: '20px'

}

const desStyle = {
  border: '2px solid #31A8E0',
  padding: '28px 20px 0 20px',
  borderRadius: '10px',
  backgroundColor: '#fff',
}

const inputStyle = {
  marginBottom: '28px',
}

const buttonStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
}

const DateSelect = styled(DatePicker)({
  width: '100%'
});

const useDateStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    width: '100%'
  },
});

interface Props{
  value: string,
  type: string,
  data: IPayroll,
  listStatus: Array<string>,
}

function ViewDetails(props: Props) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const storePayrollData = useSelector(payrollListSelector)
  const {value, type, data, listStatus} = props;
  
  const [open, setOpen] = React.useState(false);
  // const [payrollItem, setPayrollItem] = React.useState({
  //   id: data.payroll_id,
  //   status: checkStatus({...data}),
  //   date: data.time_created || null,
  //   currency: data.currency,
  //   total: data.volume_input_in_input_currency + data.fees,
  // });

  const [ date , setDate] = React.useState<Date | null>(new Date(data.time_created));
  const [ status, setStatus ] = React.useState(checkStatus({...data}));
  const [ currency, setCurrency ] = React.useState(data.currency);
  const [ total, setTotal ] = React.useState(data.volume_input_in_input_currency + data.fees);
  
  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleChangeCurrency = (e:any)=>{
    setCurrency(e.target.value)
  }

  const handleChangeTotal = (e:any) =>{
    setTotal(e.target.value)
  }

  const handleAcceptChange = ()=>{
    const index = storePayrollData.findIndex((x:any) =>x.payroll_id === data.payroll_id);
    storePayrollData[index].time_created = moment(date).format().slice(0,19) + 'Z';
    storePayrollData[index].currency = currency;
    storePayrollData[index].volume_input_in_input_currency = total - storePayrollData[index].fees;
    if(status == 'Receive'){
      storePayrollData[index].received = true;
    }else if(status == 'Processing'){
      storePayrollData[index].matched = true;
    }else if(status == 'Fulfill'){
      storePayrollData[index].fulfilled = true;
    }else if(status == 'Cancel'){
      storePayrollData[index].canceled = true;
    }else{
      storePayrollData[index].fulfilled = false;
      storePayrollData[index].fulfilled = false;
      storePayrollData[index].fulfilled = false;
      storePayrollData[index].fulfilled = false;
    }
    dispatch(updatePayrollItem(storePayrollData))
    handleClose();
  }

  const classes = useDateStyles(props);
  return (
    <div>
      <Button onClick={handleOpen} className={'col-5 custom-button ' + type}>{value}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={titleStyle}>
            Payroll Information
          </Typography>
          <Typography id="modal-modal-description" sx={desStyle}>
            <FormControl fullWidth sx={inputStyle}>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChangeStatus}
              >
                {
                  listStatus.map((item,index) => {
                    return (<MenuItem key={index} value={item}>{item}</MenuItem>)
                  })
                }    
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                className={classes.root}
                label="Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField fullWidth label="Client" id="fullWidth" sx={inputStyle} value={data.company_id} disabled/>
            <TextField fullWidth label="Currency" id="fullWidth" sx={inputStyle} value={currency} onChange={ handleChangeCurrency }/>
            <TextField fullWidth label="Total" id="fullWidth" sx={inputStyle} value={total} onChange={ handleChangeTotal }/>
            <TextField fullWidth label="Invoice #" id="fullWidth" sx={inputStyle} value={data.payroll_id} disabled/>
          </Typography>
          <Box sx={buttonStyle}>
            <Button sx={{marginRight: '16px'}} variant="contained" onClick={handleAcceptChange}>Confirm</Button>
            <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ViewDetails