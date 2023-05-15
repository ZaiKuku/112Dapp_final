import MetamaskBlock from '../metamaskblock/metamaskblock'

import Menu_button from '../menu_button/menu_button'
import './Background.css'


function Background() {

    return (
        <div className="e0_4">
            <div className="e3_20"></div>
            <Menu_button/>
            <MetamaskBlock />
            {/* <div className="e4_48"></div> */}
        </div>
    )
}

export default Background