import './UploadCard.css'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { updatePicture } from '../../States/pictures/pictureSlice';
import store from "../../States/stores";

export const UploadCard = (props) => {
  const [fileSrc, setFileSrc] = useState(null);
  const dispatch = useDispatch();
  const handleUploadFile = (e) => {
    if (!e.target.files[0]) return;
    dispatch(updatePicture(e.target.files[0]));


    var reader = new FileReader();
    
    reader.onload = function () {
      setFileSrc(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    // console.log(e.target.files[0]);
    
    e.target.value = "";

    // console.log(store.getState().picture);
  };
  const handleClear = (e) => {
    e.preventDefault();
    setFileSrc(null);
  };

  return (
    <label className="UploadCard" {...props}>

      {fileSrc ? (
        <>
          <button className="ClearBtn" onClick={handleClear}>刪除</button>
          <div className='UploadPreview'>
            <img className='UploadPreviewImg' src={fileSrc} />
          </div>
        </>
      ) : (
        <span className='UploadCardButton'>上傳</span>
      )}
      <input type="file" accept="image/gif, image/jpeg, image/png" className='UploadCardInput' onChange={handleUploadFile} />

    </label>
  );
};
