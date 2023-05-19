import React from "react";
import './ProjectForm.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
    updateProjectName,
    updateExternalLink,
    updateBoostNumber,
    updateBoostPercentage,
    updateString,
    updateDate,
    updateDescription,
    updateNumber,
} from '../../States/Projects/ProjectFormSlice';

import { updateNFTContractName } from "../../States/returns/NFTcontractSlice";

import store from "../../States/stores";
import { useState, useEffect } from "react";
import { useContractWrite, useAccount, useContractRead } from 'wagmi'
import nftFactoryAbi from '../../contract_abi/NFTFactory_abi.json'



const ProjectForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [temp_T, setTraitsType] = useState('Traits_Type');
    const [temp_v, setValue] = useState('value');
    const [displayType, setDisplayType] = useState('string');
    const [isDate, setIsDate] = useState(false);
    const [newContractAddress, setNewContractAddress] = useState(null);
    const { address } = useAccount()

    const FactoryAddress = '0x33Be5CF29A5827A64A10AC4e414b97A4f2b431b7'; //NFT Factory地址

    // 部署智能合約
    const { write: createNFT, status: createNFTStatus, isSuccess} = useContractWrite({
        address: FactoryAddress,
        abi: nftFactoryAbi,
        functionName: 'createNFT',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            projectName: formData.get('projectName'),
            externalLink: formData.get('externalLink'),
            displayType: formData.get('displayType'),

            description: formData.get('description'),
            number: formData.get('number of NFT'),
        };

        dispatch(updateProjectName(data.projectName));
        dispatch(updateExternalLink(data.externalLink));

        dispatch(updateDescription(data.description));
        dispatch(updateNumber(data.number));


        const traitsData = {
            traitsType: formData.get('traitsType'),
            value: formData.get('value'),
        }
        switch (displayType) {
            case 'string':
                dispatch(updateString(traitsData));
                break;
            case 'boost_number':
                dispatch(updateBoostNumber(traitsData));
                break;
            case 'boost_percentage':
                dispatch(updateBoostPercentage(traitsData));
                break;
            case 'date':
                dispatch(updateDate(traitsData));
                break;
            default:
                break;
        }

        //////////////////////////////////////////////////////////////////////////////////////
        var baseURI = "";
        async function fetchData() {
            try {
                var obj = store.getState().projectform;

                const response1 = await fetch('http://localhost:3000/backend', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                });
                const data1 = await response1.json();
                console.log('收到的資料室:');
                console.log(data1);

                const formData_pic = new FormData();
                formData_pic.append('image', store.getState().picture.picture, store.getState().picture.picture.name);

                const response2 = await fetch('http://localhost:3000/nftpicture', {
                    method: 'POST',
                    body: formData_pic
                });
                const data2 = await response2.json();
                console.log('.....heeheheehe');
                console.log(data2);
                //setFileSrc(data2.fileUrl);

                const formData_mystery = new FormData();
                formData_mystery.append('image', store.getState().MysteryBox.MysteryBox, store.getState().MysteryBox.MysteryBox.name);

                const response3 = await fetch('http://localhost:3000/mystery', {
                    method: 'POST',
                    body: formData_mystery
                });
                const data3 = await response3.text();
                console.log('我收到的最後檔案資料是:');
                console.log(data3);
                baseURI = data3;
                //setFileSrc(data3.fileUrl);
            } catch (error) {
                console.error('发生错误:', error);
            }
        }

        fetchData();

        /////////////////////////////////////////////////////////////////////////////////////////

        // 傳參數，在這上面fetch
        const maxSupply = store.getState().projectform.number;
        const name_ = store.getState().projectform.name;
        const symbol_ = 'symbol';
        const owner = address;
        const baseURI_ = baseURI;
        try {
            createNFT(maxSupply, baseURI_, name_, symbol_, owner);
            navigate('/Mint')
        } catch (error) {
            console.error(error);
        }
        // 確認合約部署成功，讀取新合約地址
        useEffect(() => {
            const { data, status} = useContractRead({
                address: FactoryAddress,
                abi: nftFactoryAbi,
                functionName: 'getNFTInfos',
                args: address //owner
            })
            const NFTInfo = data.result;
            newContractAddress = setNewContractAddress(NFTInfo[-2]);
            dispatch(updateNFTContractName(newContractAddress));
            },[isSuccess])
        navigate('/Mint')
        // console.log(typeof store.getState().projectform);
        console.log(store.getState());
    }

    


    const handleSwitch = (e) => {
        var tt = document.getElementById("traitsType").value;
        var v = document.getElementById("value").value;
        const data = {
            traitsType: tt,
            value: v,
        }

        // console.log(data);
        switch (displayType) {
            case 'string':
                dispatch(updateString(data));

                break;
            case 'boost_number':
                dispatch(updateBoostNumber(data));

                break;
            case 'boost_percentage':
                dispatch(updateBoostPercentage(data));

                break;
            case 'date':
                dispatch(updateDate(data));
                break;
            default:
                break;
        }
        
        if (e.target.value == 'date') {
            setIsDate(true);
        }
        else {
            setIsDate(false);
        }
        setDisplayType(e.target.value);


    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="e5_113">
                    <input required className="e4_92" name="projectName" placeholder="NFT Project Name" />
                </div>
                <div className="e5_114">
                    <input required className="e4_92" name="description" placeholder="Description" ></input>
                </div>
                <div className="e5_115">
                    <input required className="e4_92" name="externalLink" placeholder="External Link" />
                </div>

                <div className="e5_116">
                    <input required type='number' className="e4_92" name="number of NFT" placeholder="number of NFT" />
                </div>
                <div>
                    <select className="selcetTraits" name="displayType" onChange={handleSwitch}>
                        <option>string</option>
                        <option>boost_number</option>
                        <option>boost_percentage</option>
                        <option>date</option>
                    </select>
                    <div className="traitsType">
                        <input className="ei7_116_4_99" id="traitsType" name="traitsType" placeholder={temp_T} />
                    </div>
                    <div className="value">
                        {isDate && <input className="ei7_116_4_99" id="value" name="value" placeholder={temp_v} type='datetime' />}
                        {!isDate && <input className="ei7_116_4_99" id="value" placeholder={temp_v} />}
                    </div>

                </div>
                <div className="build">
                    <button type="submit" className="ei4_110_3_46">Build</button>
                </div>
            </form>
        </div>
    )
}
export default ProjectForm;