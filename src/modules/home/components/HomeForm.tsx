import React, { useCallback } from 'react'
import '../scss/home.scss';
import { useState } from 'react';
import { Action } from 'redux';
import { AppState } from '../../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { IItem } from '../redux/homeForm';
import { values } from 'lodash';
import { IUpdate } from '../models/homeModel';
interface IGetSong {
    onChange(statusBtn:boolean): void,
    onUpdate(infoUpdate: IUpdate): void,
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
    data: Array<IItem>
}

function HomeForm(props: IGetSong) {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const { onChange, onUpdate, albumId, id, title, url, thumbnailUrl, data } = props;

    const [ infoUpdate, setInfoUpdate ] = useState<IUpdate>({
        id: id,
        title: title
    })

    const handleOnChange =(e:any)=>{
        setInfoUpdate({...infoUpdate, title: e.target.value})
        if(title != e.target.value){
            onChange(false);
        }else{
            onChange(true);
        }
    }
    
    const handleMouseLeave = (e:any)=>{
        onUpdate(infoUpdate);
    }

    return (
        (id % 2 == 0) ? (
            <div className='item-wrap border border-dark border-2 d-flex align-items-center p-2 m-2' style={{backgroundColor:"grey"}}>
                <img className='img-info border border-danger rounded-circle me-2' src={thumbnailUrl} alt="" style={{width:"50px", height:"50px"}} />
                <textarea rows={3} value={infoUpdate.title} className="input-text" onMouseLeave={handleMouseLeave} onChange={ handleOnChange } />
            </div>) : (
            <div className='item-wrap border border-dark border-2 d-flex align-items-center p-2 m-2' style={{backgroundColor:"wheat"}}>
                <img className='img-info border border-danger rounded-circle me-2' src={thumbnailUrl} alt="" style={{width:"50px", height:"50px"}} />
                <textarea rows={3} value={infoUpdate.title} className="input-text" onMouseLeave={handleMouseLeave} onChange={ handleOnChange } />
            </div>
        )
    )
}

export default HomeForm