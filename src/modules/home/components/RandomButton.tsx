import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { clearFilterPayroll } from '../redux/payroll';
import { CSVLink } from "react-csv";
import { IPayroll } from '../models/payrollModel';
import '../scss/payroll.scss';

interface Props{
    value: string,
    type: string,
    data: Array<any>
}

function RandomButton(props: Props) {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const {value, type, data} = props;

    const handleChangeFilter = (e:any) => {
        if(e.target.innerText === 'CLEAR'){
            dispatch(clearFilterPayroll(true));
        }
    }

    return (
        <Button className={'col-5 custom-button ' + type} onClick={ handleChangeFilter }>
            {
                value == 'Export CSV' ? 
                (<CSVLink
                    data={data}
                    filename={"my-file.csv"}
                    className="link-csv"
                >
                    {value}
                </CSVLink>):
                value
            }
        </Button>
    );
}

export default RandomButton