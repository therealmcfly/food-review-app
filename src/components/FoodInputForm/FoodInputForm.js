import { useState } from "react";
import FileInput from "../FileInput/FileInput";

const INITIAL_VALUES = {
  imgUrl: null,
  title: "",
  calorie: 0,
  content: "",
};

const FoodInputForm = ({ onSubmit, onSubmitSuccess }) => {
  const [formInputValues, setFormInputValues] = useState(INITIAL_VALUES);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  function handleChange(name, value) {
    setFormInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgUrl", formInputValues.imgUrl);
    formData.append("title", formInputValues.title);
    formData.append("calorie", formInputValues.calorie);
    formData.append("content", formInputValues.content);
    let result;
    try {
      setSubmitLoading(true);
      result = await onSubmit(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
    setFormInputValues(INITIAL_VALUES);
    onSubmitSuccess(result.food);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <FileInput
        name="imgUrl"
        type="file"
        onChange={handleChange}
        value={formInputValues.imgUrl}
      />
      <input
        name="title"
        type="text"
        placeholder="input title"
        onChange={handleInputChange}
        value={formInputValues.title}
      />
      <input
        name="calorie"
        type="number"
        placeholder="input kcal"
        onChange={handleInputChange}
        value={formInputValues.calorie}
      />
      <input
        name="content"
        type="text"
        placeholder="input content"
        onChange={handleInputChange}
        value={formInputValues.content}
      />
      <button disabled={submitLoading}>submit</button>
      {/* {onEdit && <button onClick={handleCancel}>cancel</button>} */}
    </form>
  );
};

export default FoodInputForm;
