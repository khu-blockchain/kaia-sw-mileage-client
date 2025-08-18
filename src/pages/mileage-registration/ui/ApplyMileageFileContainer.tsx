import { CloudUpload, X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";

const ApplyMileageFileContainer = ({
  index,
  files,
  setFiles,
}: {
  index: number;
  files: Array<File | null>;
  setFiles: Dispatch<SetStateAction<Array<File | null>>>;
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFiles((prev) =>
        prev.map((el, idx) => {
          if (index === idx) return file;
          else return el;
        })
      );
    },
  });

  const deleteFile = () => {
    setFiles((prev) => prev.filter((_, idx) => idx !== index));
  };
  
  return (
    <div className="flex w-full overflow-hidden rounded-md border border-border justify-between">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="flex flex-1 gap-2 cursor-pointer items-center"
      >
        <div className="bg-gray-100 p-2 justify-center items-center">
          <CloudUpload className="text-gray-400 w-4 h-4" />
        </div>
        <input {...getInputProps()} />
        {files[index] && (
          <p className="text-xs text-gray-500">{files[index]?.name ?? "-"}</p>
        )}
        {!files[index] && (
          <p className="text-xs text-gray-500">
            이곳을 클릭하거나 업로드 할 파일을 드래그하세요.
          </p>
        )}
      </div>
      <div className="flex justify-center items-center mr-2">
        <X
          className="text-gray-400 w-4 h-4 cursor-pointer"
          onClick={() => deleteFile()}
        />
      </div>
    </div>
  );
};

export default ApplyMileageFileContainer;
