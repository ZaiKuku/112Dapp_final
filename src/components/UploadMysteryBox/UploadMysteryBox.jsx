import './UploadMysteryBox.css'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { updateMysteryBox } from '../../States/MysteryBox/MysteryBoxSlice';
import store from "../../States/stores";

export const UploadMysteryBox = (props) => {
  const [fileSrc, setFileSrc] = useState(null);
  const dispatch = useDispatch();
  const handleUploadFile = (e) => {
    if (!e.target.files[0]) return;
    dispatch(updateMysteryBox(e.target.files[0]));


    //////////////////////////////////////////
    // const formData = new FormData();
    // formData.append('image', e.target.files[0]);
    
    // fetch('http://localhost:3000/mystery', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   // .then((response) => response.json())
    //   .then((response) => response.text())  // 將回應轉換為文字
    //   .then((data) => {
    //     // 在此處處理後端回傳的資料
    //     //console.log('我收到的最後檔案資料是: ');
    //     console.log(data);
    //     setFileSrc(data.fileUrl);
    //   })
    //   .catch((error) => {
    //     // 處理錯誤
    //     console.error('Error:', error);
    //   });
    ////////////////////////////////////////

    // console.log(store.getState().MysteryBox);
    var reader = new FileReader();
    reader.onload = function () {
      setFileSrc(reader.result);
      
    };
    reader.readAsDataURL(e.target.files[0]);
    e.target.value = "";
    
  };
  const handleClear = (e) => {
    e.preventDefault();
    setFileSrc(null);
  };

  return (
    <label className="UploadCard" {...props}>
      
      {fileSrc ? (
        <>
          <button className = "ClearBtn" onClick={handleClear}>刪除</button>
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
