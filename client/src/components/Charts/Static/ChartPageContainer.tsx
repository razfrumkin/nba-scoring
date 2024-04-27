interface ChartPageContainerProps {
    children?: React.ReactNode
}

const ChartPageContainer: React.FC<ChartPageContainerProps> = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem', gap: '2rem', height: '100%' }}>
            {children}
        </div>
    )
}

export default ChartPageContainer