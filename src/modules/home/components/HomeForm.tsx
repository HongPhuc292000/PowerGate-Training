import React, { useCallback } from 'react'
import '../css/album.css';
import { useState } from 'react';
import { Action } from 'redux';
import { AppState } from '../../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { IItem } from '../redux/homeForm';
import { values } from 'lodash';

interface IGetSong {
    // updateItem(data: IItem): void,
    onChange(id: number, title: string,statusBtn:boolean): void,
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}
function HomeForm(props: IGetSong) {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const { /*updateItem,*/ onChange, albumId, id, title, url, thumbnailUrl } = props;

    const [statusBtn, setStatusBtn] = useState(true);

    const [value, setValue] = useState();

    const handleOnChange =(e:any)=>{
        if(e.target.value != title){
            setStatusBtn(false);
            onChange(parseInt(e.target.title), e.target.value,statusBtn);
        }else{
            setStatusBtn(true);
            onChange(parseInt(e.target.title), e.target.value,statusBtn);
        }
    }
    
    return (
        (id % 2 == 0) ? (
            <div className='item-wrap border border-dark border-2 d-flex align-items-center p-2 m-2' style={{backgroundColor:"grey"}}>
                <img className='img-info border border-danger rounded-circle me-2' src={thumbnailUrl} alt="" style={{width:"50px", height:"50px"}} />
                <textarea rows={3} title={id.toString()} defaultValue={title} className="input-text" onChange={ handleOnChange } />
            </div>) : (
            <div className='item-wrap border border-dark border-2 d-flex align-items-center p-2 m-2' style={{backgroundColor:"wheat"}}>
                <img className='img-info border border-danger rounded-circle me-2' src={thumbnailUrl} alt="" style={{width:"50px", height:"50px"}} />
                <textarea rows={3} title={id.toString()} defaultValue={title} className="input-text" onChange={ handleOnChange } />
            </div>
        )
    )
}

export default HomeForm