import React from "react";
import './ProjectForm.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
    updateProjectName,
    updateExternalLink,
    updateDisplayType,
    updateTraitsType,
    updateValue,
    updateDescription,
    updateNumber,
} from '../../States/Projects/ProjectFormSlice';

const ProjectForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            projectName: formData.get('projectName'),
            externalLink: formData.get('externalLink'),
            displayType: formData.get('displayType'),
            traitsType: formData.get('traitsType'),
            value: formData.get('value'),
            description: formData.get('description'),
            number: formData.get('number'),
        };
        console.log(data);
        dispatch(updateProjectName(data.projectName));
        dispatch(updateExternalLink(data.externalLink));
        dispatch(updateDisplayType(data.displayType));
        dispatch(updateTraitsType(data.traitsType));
        dispatch(updateValue(data.value));
        dispatch(updateDescription(data.description));
        dispatch(updateNumber(data.number));

        navigate('/Mint')
    }
    return (
        <form  onSubmit={handleSubmit}>
            <div className="e5_113">
                <input required className="e4_92" name="projectName" placeholder="NFT Project Name" />
            </div>
            <div class="e5_114">
                <input required class="e4_92" name="description" placeholder="Description" ></input>
            </div>
            <div className="e5_115">
                <input required className="e4_92" name="externalLink" placeholder="External Link" />
            </div>

            <div className="e5_116">
                <input required className="e4_92" name="number of NFT" placeholder="number of NFT" />
            </div>

            <div className="display">
                <select className="ei7_116_4_99">
                    <option>boost_number</option>
                    <option>Boost_percentage</option>
                </select>
            </div>
            <div className="traitsType">
                <input className="ei7_116_4_99" name="traitsType" placeholder="Traits_Type" />
            </div>
            <div className="value">
                <input className="ei7_116_4_99" name="value" placeholder="value" />
            </div>
            <div class="build">
                <button type="submit" className="ei4_110_3_46">Build</button>
            </div>
        </form>
    )
}
export default ProjectForm;