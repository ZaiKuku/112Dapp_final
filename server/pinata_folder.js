import fs from 'fs';
import FormData from 'form-data';
import rfs from 'recursive-fs';
import basePathConverter from 'base-path-converter';
import got from 'got';
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MDUyMGZkMC1iZjg3LTQyYWMtYWM2Ny1kNDk2MGM4MDcxMGIiLCJlbWFpbCI6ImJuYjgxMjEzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhMDg0YjdiYjc5MDZhMGRiMTFkNCIsInNjb3BlZEtleVNlY3JldCI6IjBmMzM2MzhhZTY4NzFiZjk2NzM0YTE4NmNhNzgxMjYxZmIyZjI5ZmI2Y2IwODJiYmJkZTNjNDMwZDU0MmVhNGEiLCJpYXQiOjE2ODQzNDc3NDZ9.TSIRDjX_kBNnvAMIoUamIXs66rHlBK4eZdOcUUCErK0'

export async function pinDirectoryToPinata(newFilePath, callback) {

  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const src = newFilePath;

  var status = 0;
  try {
    const { dirs, files } = await rfs.read(src);
    console.log(dirs);
    console.log(files);

    let data = new FormData();
    for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    }
    const response = await got(url, {
      method: 'POST',
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        "Authorization": JWT
      },
      body: data
    })
      .on('uploadProgress', progress => {
        console.log(progress);
      });
    //console.log('why??????????')
    console.log(JSON.parse(response.body));
    console.log(response.body) 
    callback(response.body);
    
  } catch (error) {
    console.log(error);
  }

}
