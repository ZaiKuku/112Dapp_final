// Pinata====================================
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MDUyMGZkMC1iZjg3LTQyYWMtYWM2Ny1kNDk2MGM4MDcxMGIiLCJlbWFpbCI6ImJuYjgxMjEzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhMDg0YjdiYjc5MDZhMGRiMTFkNCIsInNjb3BlZEtleVNlY3JldCI6IjBmMzM2MzhhZTY4NzFiZjk2NzM0YTE4NmNhNzgxMjYxZmIyZjI5ZmI2Y2IwODJiYmJkZTNjNDMwZDU0MmVhNGEiLCJpYXQiOjE2ODQzNDc3NDZ9.TSIRDjX_kBNnvAMIoUamIXs66rHlBK4eZdOcUUCErK0'

//===========================================

// pinFileToIPFS
export async function pinFileToIPFS(newFilePath, callback) {
    const formData = new FormData();
    const src = newFilePath;
  
    const file = fs.createReadStream(src);
    formData.append('file', file);
  
    const metadata = JSON.stringify({
      name: '20230511', //這邊放前端的名字
    });
    formData.append('pinataMetadata', metadata);
  
    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);
  
    try {
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          maxBodyLength: 'Infinity',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );
      //console.log(res.data);
      callback(null, res.data); // 呼叫回調函式並傳遞回傳資料
    } catch (error) {
      callback(error); // 傳遞錯誤給回調函式
    }
  };
//module.exports = {pinFileToIPFS};
  //////////////////////////////////////////