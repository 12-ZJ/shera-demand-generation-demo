import { FC } from "react";
import Dropzone, { Accept } from "react-dropzone";
import { toastWarning } from "@/app/lib/utils";
import { MAX_FILE_NAME_LENGTH, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB, MAX_FILE_UPLOAD } from "@/app/lib/constants";
import { ImUpload } from "react-icons/im";
import { CiImageOn } from "react-icons/ci";
import { ImageUp } from "lucide-react";

interface UploadProps {
    multiple?: boolean;
    onUpload: (data?: FormData) => void;
    accept?: Accept;
}

const Upload: FC<UploadProps> = ({ multiple = true, onUpload, accept}) => {
    const handleOnDrop = (files: File[]) => {
        const validFiles = files.filter(file => file.name.length <= MAX_FILE_NAME_LENGTH);
        const invalidFiles = files.filter(file => file.name.length > MAX_FILE_NAME_LENGTH);

        if (invalidFiles.length > 0) {
            invalidFiles.forEach(file => {
                toastWarning(`"${file.name}" is too long. Maximum allowed is ${MAX_FILE_NAME_LENGTH} characters.`);
            });
        }

        if (validFiles.length === 0) return;

        const data = new FormData();
        validFiles.forEach(file => data.append('file', file));
        onUpload(data);
    };

    const handleRejected = (fileRejections: import('react-dropzone').FileRejection[]) => {
        fileRejections.forEach(({ file, errors }) => {
            errors.forEach((e: { code: string; message: string }) => {
                const message =
                    e.code === "file-too-large"
                        ? `${file.name} is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`
                        : `${file.name}: ${e.message}`;
                toastWarning(message);
            });
        });
    };

    return (
        <div>
            <div className="flex gap-5 items-center">
                <div className="w-full">
                    <Dropzone
                        onDrop={handleOnDrop}
                        onDropRejected={handleRejected}
                        multiple={multiple}
                        maxFiles={MAX_FILE_UPLOAD}
                        maxSize={MAX_FILE_SIZE_BYTES}
                        accept={accept}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()} className="min-h-16 border bg-theme_foreground rounded-lg p-2 
                                    text-center cursor-pointer hover:bg-theme_greyDark/10 flex items-center justify-center gap-5">
                                    <input {...getInputProps()} />
                                    <ImageUp size={25} className="text-theme_primary" />
                                    <span className="font-medium">{"Click to Upload"}</span>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
            </div>
        </div>
    );
};

export default Upload;