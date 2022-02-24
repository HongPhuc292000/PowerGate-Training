import React, { useCallback, useEffect, useState } from 'react';
import HomeForm from '../components/HomeForm';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { IFormParams } from '../../../models/album';
import { IItem, setIItem, updateIItem } from '../redux/homeForm';
import { homeListSelector } from '../redux/selector';
import '../scss/home.scss'
import Header from '../components/Header';
import { IUpdate } from '../models/homeModel';



const HomePage = () => {
  
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const listItem = useSelector(homeListSelector);

  const [data,setData] = useState<Array<IFormParams>>([]);
  const [statusBtn, setStatusBtn] = useState(true);

  const getData = useCallback(async()=>{
      const json = await dispatch(
        fetchThunk('https://jsonplaceholder.typicode.com/photos', 'get')
      );
      setData(json.slice(0,5));
      dispatch(updateIItem(json.slice(0,5)));
  },[])

  useEffect(()=>{
    getData()
  }, [])

  const handleAcceptUpdateData = useCallback(()=>{
    dispatch(updateIItem(listItem));
  },[listItem])

  const onChangeStatus = (status: boolean)=>{
    setStatusBtn(status);
  };

  const onUpdate  = (infoUpdate: IUpdate) => {
    const id = listItem.findIndex((x:any)=>x.id === infoUpdate.id)
    listItem[id].title = infoUpdate.title;
  }


  return(
    <>
      <Header></Header>
      <div className='container content-wrap home-content'>
          <div className='row justify-content-center align-items-center'>
            <div className='d-flex justify-content-end col-2 flex-column'>
              <button disabled={statusBtn} onClick={handleAcceptUpdateData} type="button" className="btn btn-primary border me-2">Confirm</button>
            </div>
            <div className='col-8'>
              {
                listItem.map((item:IFormParams, index:number)=>{
                  return(
                    <HomeForm
                      onChange={ onChangeStatus }
                      onUpdate={ onUpdate }
                      key={index}
                      albumId={item.id}
                      id={item.id}
                      title={item.title}
                      url={item.url}
                      thumbnailUrl={item.thumbnailUrl}
                      data={data}
                    />
                  )
                })
              }
            </div>
            <div className='d-flex justify-content-end col-2 flex-column'>
              <button disabled={statusBtn} type="button" className="btn btn-danger border">Reset</button> 
            </div>
          </div>
      </div>
    </>
    
  )
};

export default HomePage;

