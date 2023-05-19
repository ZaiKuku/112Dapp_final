import './UploadCard.css'
import { useState } from "react";

export const UploadCard = (props) => {
  const [fileSrc, setFileSrc] = useState(null);
  const handleUploadFile = (e) => {
    if (!e.target.files[0]) return;    
    var reader = new FileReader();
    reader.onload = function () {
      setFileSrc(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files); 
    // e.target.value = "";
     //////////////////////////////////////////
     const formData = new FormData();
     console.log(typeof(e.target.files[0]))
     formData.append('image', e.target.files[0]);
     console.log(formData)
     fetch('http://localhost:3000/nftpicture', {
       method: 'POST',
       body: formData,
     })
       .then((response) => response.json())
       .then((data) => {
         // 在此處處理後端回傳的資料
         console.log(data);
         setFileSrc(data.fileUrl);
       })
       .catch((error) => {
         // 處理錯誤
         console.error('Error:', error);
       });
     ////////////////////////////////////////
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
