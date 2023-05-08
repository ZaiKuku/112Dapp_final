import React from "react";
import './ProjectForm.css'

import { useDispatch } from 'react-redux';
import {
    updateProjectName,
    updateExternalLink,
    updateDisplayType,
    updateTraitsType,
    updateValue,
    updateDescription,
} from '../../States/Projects/ProjectFormSlice';

const ProjectForm = () => {
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
        };
        console.log(data);
        dispatch(updateProjectName(data.projectName));
        dispatch(updateExternalLink(data.externalLink));
        dispatch(updateDisplayType(data.displayType));
        dispatch(updateTraitsType(data.traitsType));
        dispatch(updateValue(data.value));
        dispatch(updateDescription(data.description));
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="e5_113">
                <input required className="e4_92" name="projectName" placeholder="NFT Project Name" />
            </div>
            <div class="e5_114">
                <input required class="e4_92" name="description" placeholder="Description" ></input>
            </div>
            <div className="e5_115">
                <input required className="e4_92" name="externalLink" placeholder="External Link" />
            </div>
            <div className="e7_116">
                <input className="ei7_116_4_99" name="displayType" placeholder="Display_Type" />
            </div>
            <div className="e9_119">
                <input className="ei7_116_4_99" name="traitsType" placeholder="Traits_Type" />
            </div>
            <div className="e9_122">
                <input className="ei7_116_4_99" name="value" placeholder="value" />
            </div>
            <div class="e4_110">
                <button type="submit"><div id='rectangle' class='ei4_110_3_45'></div><div id='Build' class='ei4_110_3_46'>Build</div></button>
            </div>
        </form>
    )
}
export default ProjectForm;