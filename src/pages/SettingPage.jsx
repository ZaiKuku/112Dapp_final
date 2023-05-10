import Background from '../components/Background/Background'
import ProjectForm from '../components/ProjectForm/ProjectForm'
import './SettingPage.css'
import { UploadCard } from '../components/uploadcomponents/UploadCard'


function SettingPage() {

    return (
        <div>
            <Background />
            <span class="e4_91">Start your NFT project</span>
            <span class="e4_94">General</span>
            <span class="e4_100">Upload Media</span>
            <select class="e4_109">
                <option>boost_number</option>
                <option>Boost_percentage</option>
            </select>
            <ProjectForm />
            <div class="e4_108">
                <UploadCard/>
                {/* <div class="e4_101"></div>
                <div class="e4_105"></div> */}
            </div>

        </div>
    )
}

export default SettingPage