interface ChartContainerProps {
    children?: React.ReactNode
}

const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
    return (
        <div style={{ height: '100%' }}>
            {children}
        </div>
    )
}

export default ChartContainer