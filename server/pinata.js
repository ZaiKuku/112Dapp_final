// Pinata====================================
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2M2JlZGU1ZS1kMTZiLTQ5OTEtOWY3My03ODU0NmQ2NjBmYTIiLCJlbWFpbCI6Im1hcnRpbmNyeXB0bzgxMjEzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjODQ3OWI5NTZmYmU1MzNmN2FhZiIsInNjb3BlZEtleVNlY3JldCI6IjMwNTBlMDc3NmQ0MDQ4YjIxMTFmOTY2MGUxYTczY2Q1ZTJlMGE2ZGRlYWUwY2NjYTMwZjkzMjhmZmJkOGJhMGUiLCJpYXQiOjE2ODQ1MTY2MzJ9.8kFgc0V2dXNtsDvvqUbEIGK4IhY7gFxfVUcTgijfBHE'
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