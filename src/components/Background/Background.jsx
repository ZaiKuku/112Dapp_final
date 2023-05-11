import MetamaskBlock from '../metamaskblock/metamaskblock'

import Menu_button from '../menu_button/menu_button'
import './Background.css'


function Background() {

    return (
        <div class="e0_4">
            <div class="e3_20"></div>
            <Menu_button/>
            <MetamaskBlock />
            {/* <div class="e4_48"></div> */}
        </div>
    )
}

export default Background