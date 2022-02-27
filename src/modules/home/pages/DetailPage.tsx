import React, { ChangeEvent } from 'react';
import Header from '../components/Header';
import '../scss/home.scss';
import '../scss/detail.scss';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { IFormParams } from '../../../models/album';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import DetailForm from '../components/DetailForm';

function DetailPage() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { id } = useParams<{id:string | undefined}>();
  const [data,setData] = React.useState<IFormParams>();

  const getData = React.useCallback(async()=>{
    const json = await dispatch(
      fetchThunk(`https://jsonplaceholder.typicode.com/photos/${id}`, 'get')
    );
    setData(json);
  },[])

  React.useEffect(()=>{
    getData()
  }, [])

  return (
    <>
        <Header></Header>
        <div className='container detail-container'>
            <div className='row'>
                <div className='col-12 banner'></div>
                <div className="col-2 info-container">
                  <div className='avatar-wrap'>
                    <img src={data?.url} className='avatar-img' />
                    <DetailForm />
                  </div>  
                </div>
                <div className="col-10 infor-content">
                  <h2>id: {data?.id}</h2>
                  <p>Title: {data?.title}</p>
                  <p>Url: <a href={data?.url}>{data?.url}</a></p>
                </div>
            </div>
            <div className='row'>
                <div className='col-5'>
                    
                </div>
                <div className='col-7'>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default DetailPage