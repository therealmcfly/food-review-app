import { useEffect, useRef, useState } from "react";

export default function FileInput({ name, value, onChange }) {
  const [previewUrl, setPreviewUrl] = useState();
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const imgFile = e.target.files[0];
    onChange(name, imgFile);
  };

  const clearFileInput = () => {
    fileInputRef.current.value = null;
    onChange(name, value);
  };

  useEffect(() => {
    if (!value) return;
    const objectUrl = URL.createObjectURL(value);
    setPreviewUrl(objectUrl);

    return () => {
      setPreviewUrl(null);
      URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

  return (
    <div>
      <img src={previewUrl} alt="preview" width="300px" />
      <input type="file" onChange={handleChange} ref={fileInputRef} />
      {value && <button onClick={clearFileInput}>X</button>}
    </div>
  );
}
