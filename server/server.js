// 伺服器端代碼
import express from 'express';
import cors from 'cors'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path, { relative } from 'path';
import { fileURLToPath } from 'url';
import { pinDirectoryToPinata } from './pinata_folder.js';

const app = express();
const port = 3000;
import { pinFileToIPFS } from './pinata.js';
import { json } from 'react-router-dom';
import { stringify } from 'querystring';

// Use the pinata_upload module here

app.use(express.json());
app.use(cors());


// 使用唯一檔案名稱作為檔案名稱
const uniqueFileNameStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

// 使用日期時間作為檔案名稱
const dateTimeFileNameStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const fileExtension = file.originalname.split('.').pop();
    const newFileName = `${timestamp}.${fileExtension}`;
    cb(null, newFileName);
  },
});

// 選擇使用唯一檔案名稱或日期時間作為檔案名稱的存儲設定
const storage = uniqueFileNameStorage; // 或者使用 dateTimeFileNameStorage

const upload = multer({ storage: storage });

///////////////////////////////////////////////////////////////////////////
const jsonData = {
  "name": "NFT的名稱",
  "description": "NFT的描述",
  "image": "https://example.com/image.png",
  "attributes": [
    {
      "trait_type": "",
      "value": ""
    },
    {
      "display_type": "date",
      "trait_type": "birthday",
      "value": ""
    },
    {
      "display_type": "boost_number",
      "trait_type": "Aqua Power",
      "value": ""
    },
    {
      "display_type": "boost_percentage",
      "trait_type": "Stamina Increase",
      "value": ""
    }
  ]
};

const formattedOutput = JSON.stringify(jsonData, null, 2);
//console.log(formattedOutput);

var temp = Object.assign({}, jsonData);
console.log('123123123');
//console.log(temp);
var count = 0;
var save_path = '';
var number = 0;


//////////////////////////////////////////////////////////////////// !!!


///////// 後端json ///////////

app.post('/backend', (req, res) => {
  //console.log('收到前端來的JSON了');


  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  fs.mkdir(path.join(__dirname, `hello_${count}`), { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    const newFolderPath = path.join(__dirname, `hello_${count}`);
    console.log('屬於你的資料夾已建立，路径为：', newFolderPath);
    save_path = newFolderPath; //設定好新資料夾路徑
    count = count + 1;
  });


  const receivedObject = req.body;
  number = parseInt(receivedObject.number);
  // 处理接收到的对象
  console.log(receivedObject);

  // 改變Temp
  temp.name = receivedObject.projectName;
  temp.description = receivedObject.description;
  temp.attributes[0].trait_type = receivedObject.String.traitsType;
  temp.attributes[0].value = receivedObject.String.value;

  temp.attributes[1].trait_type = receivedObject.date.traitsType;
  temp.attributes[1].value = receivedObject.date.value;

  temp.attributes[2].trait_type = receivedObject.boost_number.traitsType;
  temp.attributes[2].value = receivedObject.boost_number.value;

  temp.attributes[3].trait_type = receivedObject.boost_percentage.traitsType;
  temp.attributes[3].value = receivedObject.boost_percentage.value;
  //////////////

  console.log('改完之後的temp: ');
  console.log(temp);


  // 做出响应
  const response = { message: 'Object received successfully' };
  res.json(response);
});


///////////////// nft ////////////////

app.post('/nftpicture', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  else {
    // 上傳到pinata
    pinFileToIPFS(req.file.path, (err, pinataData) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to upload file to Pinata' });
      }
      // pinataData是圖片的cid

      const fileInfo = {
        name: 'nft',
        pinataData: pinataData
      };

      console.log('出來啊');
      //console.log(fileInfo.pinataData.IpfsHash);

      const str = fileInfo.pinataData.IpfsHash;
      temp.image = `https://gateway.pinata.cloud/ipfs/${str}`;
      console.log(temp);

      const jsonData = JSON.stringify(temp, null, 2); // 将数据转换为 JSON 字符串，并进行格式化

      for (let i = 0; i < number; i++) {

        const filePath = path.join(save_path, `${i}.json`); // 自定义的 JSON 文件路径

        fs.writeFile(filePath, jsonData, 'utf8', (err) => {
          if (err) {
            console.error('写入 JSON 文件时出错：', err);
            return;
          }
          console.log('Mystery JSON 文件写入成功。');
        });
      }
      console.log('111111111111111111111111111111');
      console.log(save_path);




      return res.json({ success: true, fileInfo });
    });

    console.log('good job for nftpicture. ');
    //console.log(req.file.path);
  }
});


/////////////////盲和////////////////////////
app.post('/mystery', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  else {
    // 上傳到pinata
    pinFileToIPFS(req.file.path, (err, pinataData) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to upload file to Pinata' });
      }
      // pinataData是圖片的cid

      const fileInfo = {
        name: 'mystery',
        pinataData: pinataData
      };

      var temp1 = Object.assign({}, temp);
      const str = fileInfo.pinataData.IpfsHash;
      temp1.image = `https://gateway.pinata.cloud/ipfs/${str}`;
      console.log(temp1);

      const jsonData = JSON.stringify(temp1, null, 2); // 将数据转换为 JSON 字符串，并进行格式化
      const filePath = path.join(save_path, 'box.json'); // 自定义的 JSON 文件路径

      fs.writeFile(filePath, jsonData, 'utf8', (err) => {
        if (err) {
          console.error('写入 JSON 文件时出错：', err);
          return;
        }
        console.log('Mystery JSON 文件写入成功。');
      });

      //寫完之後準備上傳到pinata 
      function getCurrentDirectory() {
        return path.resolve();
      }
      
      console.log(getCurrentDirectory());

      const relativePath = path.relative(getCurrentDirectory(), save_path);

      console.log(relativePath); // 输出: hello_0

      var file_ipfsHash ;

      pinDirectoryToPinata(relativePath, (response) => {
        if (response.error) {
          console.log("出問題了拉");
          console.log(response.error);
          console.log('??????');
        } else {
          console.log('老子收到的東西: ');
          console.log(JSON.parse(response).IpfsHash);
          console.log('!!!!!');
          file_ipfsHash = JSON.stringify(JSON.parse(response).IpfsHash).replace(/"/g, '');
          console.log(file_ipfsHash);
          console.log('..............');
          return res.send(`ipfs://${file_ipfsHash}/`);
        }
      });

      //return res.json({ success: true, file_ipfsHash });
         
    });

    console.log('good job for mystery. ');
    //console.log(req.file.path);
  }
});





app.listen(port, () => {
  console.log(`服務器運行在 http://localhost:${port}`);
});

