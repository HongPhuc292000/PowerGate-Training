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



const HomePage = () => {
  
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const listItem = useSelector((state: AppState)=>state.home.listItems);

  const [data,setData] = useState<Array<IFormParams>>([]);
  const [statusBtn, setStatusBtn] = useState(true);

  const getData = useCallback(async()=>{
      const json = await dispatch(
        fetchThunk('https://jsonplaceholder.typicode.com/photos', 'get')
      );
      setData(json.slice(0,5));
  },[])
  
  // const changeData = useCallback(async()=>{
  //   const newData = await setNewData()
  // },[newData])

  useEffect(()=>{
    getData()
  }, [statusBtn])

  useEffect(()=>{
    const newData = [...data]
    console.log(newData)
    dispatch(updateIItem(newData));
  },[data])

  // useEffect(()=>{
  //   dispatch(setIItem(data));
  // }, [])

  const handleUpdateData = useCallback(()=>{
    const newData = [...data]
    dispatch(updateIItem(newData));
  },[data])

  console.log(listItem)



  const onChange = (id:number, title:string, status: boolean)=>{
    setStatusBtn(status);
    setData(data.map(item => (item.id === id ? {...item, title: title} : item))) 
  };

  return(
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='row' style={{"width":'30%'}}>
          <div className='mt-4 d-flex justify-content-end'>
            <button disabled={statusBtn} onClick={handleUpdateData} type="button" className="btn btn-light border me-2">Confirm</button>
            <button disabled={statusBtn} type="button" className="btn btn-light border">Reset</button> 
          </div>
          <div className='border p-4 mt-2' style={{background:"#92c952"}}>
            {
              listItem.map((item:IFormParams, index)=>{
                return(
                  <HomeForm
                    // updateItem={ updateItem }
                    onChange={ onChange }
                    key={index}
                    albumId={item.id}
                    id={item.id}
                    title={item.title}
                    url={item.url}
                    thumbnailUrl={item.thumbnailUrl}
                  />
                )
              })
            }
          </div> 
        </div>
        <div className='col-12'>
        <a href="/payroll" className='payroll-btn btn btn-primary'>Payroll</a>
        </div>
      </div>
    </div>
  )
};

export default HomePage;

