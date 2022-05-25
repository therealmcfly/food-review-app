import { useEffect, useState } from "react";

export default function FileInput({ name, value, onChange }) {
  const [previewUrl, setPreviewUrl] = useState();

  const handleChange = (e) => {
    const imgFile = e.target.files[0];
    onChange(name, imgFile);
  };

  useEffect(() => {
    if (!value) return;
    const objectUrl = URL.createObjectURL(value);
    setPreviewUrl(objectUrl);

    return () => {
      // setPreviewUrl(preview);
      URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

  return (
    <div>
      <img src={previewUrl} alt="preview" width="300px" />
      <input type="file" onChange={handleChange} />;
    </div>
  );
}
