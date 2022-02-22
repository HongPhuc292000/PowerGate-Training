import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { filterStatusPayroll } from '../redux/payroll';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';

interface Props{
    value: string,
    data: Array<string>
}

function SelectBox(props:Props) {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const { value, data } = props;

    const [status, setStatus] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        const text = event.target.value as string;
        setStatus(text);
        dispatch(filterStatusPayroll(text[0].toLowerCase() + text.slice(1,text.length)));
    };
    

    return (
        <Box sx={{ minWidth: 120 }} className='col-2'>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{value}</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Age"
                onChange={handleChange}
                >
                    {
                        data.map(item => (<MenuItem key={item} value={item}>{item}</MenuItem>))
                    }
                </Select>
            </FormControl>
        </Box>
    );
}

export default SelectBox