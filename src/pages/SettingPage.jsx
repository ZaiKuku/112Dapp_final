import Background from '../components/Background/Background'
import ProjectForm from '../components/ProjectForm/ProjectForm'
import './SettingPage.css'
import { UploadCard } from '../components/uploadcomponents/UploadCard'


function SettingPage() {

    return (
        <div>
            <Background />
            <span className="e4_91">Start your NFT project</span>
            <span className="e4_94">General</span>
            <span className="e4_100">NFT Picture</span>
            
            <ProjectForm />
            <div className="e4_108">
                <UploadCard/>
                <span className='Mystery'>Mystery Box</span>
                <UploadCard/>
            </div>
            

        </div>
    )
}

export default SettingPage