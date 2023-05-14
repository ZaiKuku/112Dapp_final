import './UploadMysteryBox.css'
import { useState } from "react";


export const UploadMysteryBox = (props) => {
  const [fileSrc, setFileSrc] = useState(null);
  const handleUploadFile = (e) => {
    if (!e.target.files[0]) return;
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
