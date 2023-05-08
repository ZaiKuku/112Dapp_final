import Background from '../components/Background/Background'
import './SettingPage.css'


function SettingPage() {

    return (
        <div>
            <Background />
            <span class="e4_91">Start your NFT project</span><span class="e4_94">General</span><span class="e4_109">Attributes
            </span><span class="e4_100">Upload Media</span>
                <div class="e5_113">
                    <input required class="e4_92" placeholder="NFT Project Name" ></input>
                </div>
                <div class="e5_115">
                    <input required class="e4_92" placeholder="External Link" ></input>
                </div>
                <div class="e7_116">
                    <input class="ei7_116_4_99" placeholder="Display_Type"></input>
                </div>
                <div class="e9_119">
                    <input class="ei7_116_4_99" placeholder="Traits_Type"></input>
                </div>
                <div class="e9_122">
                    <input class="ei7_116_4_99" placeholder="value"></input>
                </div>
                <div class="e5_114">
                    <input required class="e4_92" placeholder="Description" ></input>
                </div>
                <div class="e4_108">
                    <div class="e4_101"></div>
                    <div class="e4_105"></div>
                </div>
                <div class="e4_110">
                    <button ><div id='rectangle' class='ei4_110_3_45'></div><div id='Build' class='ei4_110_3_46'>Build</div></button>
                </div>
            
            </div>
        )
}

export default SettingPage