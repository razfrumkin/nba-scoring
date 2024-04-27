import { useState } from 'react'
import './InformationButton.scss'

interface InformationButtonProps {
    information: string
}

const InformationButton: React.FC<InformationButtonProps> = ({ information }) => {
    const [isContentVisible, setIsContentVisible] = useState<boolean>(false)

    return (
        <div className="information-button-container" onMouseLeave={() => setIsContentVisible(false)}>
            <button className="information-button" onMouseEnter={() => setIsContentVisible(true)}>
                <span>i</span>
            </button>

            {isContentVisible ? <div className={`information-content ${isContentVisible ? 'show' : ''}`}><p>{information}</p></div> : <></>}
        </div>
    )
}

export default InformationButton