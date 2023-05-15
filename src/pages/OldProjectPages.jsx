import Background from '../components/Background/Background'
import ProjectForm from '../components/ProjectForm/ProjectForm'
import './SettingPage.css'
import { UploadCard } from '../components/uploadcomponents/UploadCard'


function OldProjectPage() {

    return (
        <div>
            <Background />
            <span className="e4_91">Start your NFT project</span>
            <span className="e4_94">General</span>
            <span className="e4_100">Upload Media</span>
            <select className="e4_109">
                <option>boost_number</option>
                <option>Boost_percentage</option>
            </select>
            <ProjectForm />
            <div className="e4_108">
                <UploadCard/>
                {/* <div className="e4_101"></div>
                <div className="e4_105"></div> */}
            </div>

        </div>
    )
}

export default OldProjectPage