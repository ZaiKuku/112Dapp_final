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
import store from "../../States/stores";
import { useState } from "react";




const ProjectForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [temp_T, setTraitsType] = useState('Traits_Type');
    const [temp_v, setValue] = useState('value');
    const [displayType, setDisplayType] = useState('string');
    const [isDate, setIsDate] = useState(false);
    const handleSubmit = (e) => {
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
        navigate('/Mint')
        console.log(typeof store.getState().projectform);
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
                    <option>boost percentage</option>
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
            </div>
        </form>
    )
}
export default ProjectForm;