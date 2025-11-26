interface Props {
    title: string
}

const PrimaryHeader = ({ title }: Props) => {
    return (
        <div className="w-full text-theme_topic text-xl font-medium"> 
            {title} 
        </div>
    )
}

export default PrimaryHeader;