import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../scss/detail.scss'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function generateUpload(canvas: any, crop: any) {
  if (!crop || !canvas) {
    return;
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob:any) => {
        blob.name = 'avatar.jpeg';
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
}



export default function DetailForm() {
  const [upImg, setUpImg] = useState<any>();
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({ unit: '%', width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  console.log(previewCanvasRef.current)
  //Modal
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const onSelectFile = (e: any) => {
    setOpen(true);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  const uploadAvatar = async ()=>{
    const file = await generateUpload(previewCanvasRef.current, completedCrop);
    // console.log(file)
    // if(file){
    //   const formData = new FormData();
    //   formData.append('file', file, file.name);
    // }
  }

  return (
    <div className='change-avatar-btn-wrap'>
      <input className='change-avatar-btn' type="file" accept="image/*" onChange={onSelectFile} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: '16px', textAlign: 'center', fontWeight: '600'}}>
            Update Avatar
          </Typography>
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
            />
            <div className='preview-canvas'>
                <canvas
                ref={previewCanvasRef}
                style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0)
                }}
                />
            </div>
            
            <div className='row justify-content-around mt-5'>
              <button
              className='col-4 btn btn-primary'
              type="button"
              disabled={!completedCrop?.width || !completedCrop?.height}
              onClick={() =>
                uploadAvatar()
              }
            >
              Update
            </button>

            <button className='col-4 btn btn-danger' onClick={handleClose}>
              Cancel
            </button>
            </div>
            
        </Box>
      </Modal>
      
    </div>
  );
}
