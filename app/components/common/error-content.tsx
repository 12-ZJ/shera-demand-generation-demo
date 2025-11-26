import { MdErrorOutline } from "react-icons/md";

interface Props {
    errorMsg?: string;
}

const ErrorContent = ({ errorMsg = "" }: Props) => {
    return (
        <>
            {errorMsg && 
            <div className="error-label bg-red-50 px-2 py-1 rounded flex gap-1 items-center">
                <MdErrorOutline size={12} /> 
                <span>{errorMsg}</span>
            </div>}
        </>
    )
}

export default ErrorContent;