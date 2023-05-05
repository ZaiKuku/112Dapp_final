import './UploadButton.css'

export const UploadCard = () => {
    const [fileSrc, setFileSrc] = useState(null);
    const handleUploadFile = (e) => {
      if (!e.target.files[0]) return;
      var reader = new FileReader();
      reader.onload = function () {
        setFileSrc(reader.result);
      };
      reader?.readAsDataURL(e?.target?.files[0]);
      e.target.value = "";
    };
    return (
      <span className='UploadCard'>
        <span className='UploadCardButton'>上傳</span>
        <input onChange={handleUploadFile} />
      </span>
    );
  };