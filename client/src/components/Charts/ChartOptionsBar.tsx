import { InformationButton } from "../Information"

interface ChartOptionsBarProps {
    title: string
    information: string
    children?: React.ReactNode
}

const ChartOptionsBar: React.FC<ChartOptionsBarProps> = ({ title, information, children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3rem' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '90px', flex: 1 }}>{title}</span>
            <InformationButton information={information}/>
            {children}
        </div>
    )
}

export default ChartOptionsBar