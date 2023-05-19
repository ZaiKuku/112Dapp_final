import React from "react";
import './ProjectForm.css'
import store from "../../States/stores";
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
import { useState } from "react";

//0514new
import { useContractWrite, useContractEvent } from 'wagmi'
import nftFactoryAbi from '../../contract_abi/NFTFactory_abi.json'
import MintButton from '../MintButton/MintButton'

const ProjectForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [temp_T, setTraitsType] = useState('Traits_Type');
    const [temp_v, setValue] = useState('value');
    const [displayType, setDisplayType] = useState('string');
    const [isDate, setIsDate] = useState(false);
    const [newContractAddress, setNewContractAddress] = useState(null);

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
        


        // 部署智能合約
        const FactoryAddress = '0x33Be5CF29A5827A64A10AC4e414b97A4f2b431b7'; //NFT Factory地址
        const { write: createNFT, status: createNFTStatus } = useContractWrite({
            address: FactoryAddress,
            abi: nftFactoryAbi,
            functionName: 'createNFT',
            })
        
        // 傳參數
        const maxSupply = data.number;
        const baseURI = 'testURI'; //pinata URI
        const name_ = data.projectName;
        const symbol_ = 'symbol';
        const owner = state.account;
        try {
            await createNFT(maxSupply, baseURI, name_, symbol_, owner);
            navigate('/MintPage')
        } catch (error) {
            console.error(error);
        }

        // 使用 useContractEvent 監聽 NFTCreated 事件
        const { events: nftCreatedEvents } = useContractEvent({
            address: FactoryAddress,
            abi: nftFactoryAbi,
            event: 'NFTCreated',
        });

        useEffect(() => {
            if (nftCreatedEvents && nftCreatedEvents.length > 0) {
            // 獲取新合约地址
            const newContractAddress = nftCreatedEvents[nftCreatedEvents.length - 1].returnValues.nft;
            setNewContractAddress(newContractAddress);
            console.log('New contract address:', newContractAddress);
            }
        }, [nftCreatedEvents]);

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
        navigate('/Mint')
        console.log(typeof store.getState().projectform);
        console.log(store.getState());


        //////////////////////////////////////
        var obj ={}
        obj = store.getState().projectform;
        //console.log(obj);

        fetch('http://localhost:3000/backend', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
            .then(response => response.json())
            .then(data => {
              // 处理服务器响应
              console.log('收到的資料室:');
              console.log(data);
            })
            .catch(error => {
              console.error('发生错误:', error);
            });
        /////////////////////////////////////
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
                <input required type = 'number' className="e4_92" name="number of NFT" placeholder="number of NFT" />
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
                    {isDate && <input className="ei7_116_4_99" id="value" name="value" placeholder={temp_v} type = 'datetime'/>}
                    {!isDate && <input className="ei7_116_4_99" id="value" placeholder={temp_v} />}
                </div>

            </div>
            <div className="build">
                <button type="submit" className="ei4_110_3_46">Build</button>
                <MintButton newContractAddress={newContractAddress} />
            </div>
        </form>
    )
}
export default ProjectForm;