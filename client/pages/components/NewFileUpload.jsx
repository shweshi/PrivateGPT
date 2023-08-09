import { useState } from "react";
import React from "react";
import Loading from "./Loader";

function NewFileUpload() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    console.log("hi");
    event.preventDefault();
    if (!file) {
      return null;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename_as_doc_id", "true");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/uploadFile`,
        {
          mode: "cors",
          method: "POST",
          body: formData,
        }
      );

      const responseText = await response.text();
      console.log(JSON.parse(responseText));
      if (response.status === 200) {
        setIsLoading(false);
        window.location.href = "/chat";
      } else {
        setIsLoading(false);
        const data = JSON.parse(responseText);
        setError(data.message);
      }
    } catch {
      setIsLoading(false);
      setError("Something went wrong");
    }
  };

  const handleOnChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setError("");
  };

  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-2xl py-4 sm:py-6 lg:py-7">
        <div className="flex justify-center bg-gray-700 rounded-lg border border-dashed border-gray-100/25 py-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center align-middle"
          >
            {isLoading ? (
              <>
                <Loading />
                <p className="text-xs leading-5 text-white mt-2">Uploading..</p>
              </>
            ) : file ? (
              getFileComponent()
            ) : (
              getFileUploadComponent()
            )}
          </form>
        </div>
        <div className="flex justify-center align-middle text-red-700 mt-6">
          {" "}
          <p>{error}</p>{" "}
        </div>
      </div>
    </div>
  );

  function getFileUploadComponent() {
    return (
      <div className="text-center">
        <div className="flex text-sm leading-6 text-gray-900">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md font-semibold text-white"
          >
            <span>+ New Chat</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={(e) => handleOnChange(e)}
            />
          </label>
        </div>
        <p className="text-xs leading-5 text-gray-300">Upload a new file</p>
      </div>
    );
  }

  function getFileComponent() {
    return (
      <div className="text-center">
        <div className="mt-4 flex text-sm leading-6 text-gray-700">
          <p className="text-lg relative cursor-pointer rounded-md font-bold text-white hover:text-indigo-500">
            <span>{file.name}</span>
          </p>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            onClick={
              file ? () => setError("") : () => setError("Please upload a file")
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
          >
            Upload
          </button>
        </div>
      </div>
    );
  }
}

export default NewFileUpload;
