import React, { useState, useEffect } from "react";
import Input from "./InputComponent";
import Select from "./SelectComponent";
import Button from "./ButtonComponent";

const FormComponent = ({
  modelSchema,
  formData,
  onSubmit,
  onCancel,
  dynamicOptions = {},
}) => {
  const [formState, setFormState] = useState({ ...formData });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormState({ ...formData });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleMultiChange = (e) => {
    const { name, selectedOptions } = e.target;
    const selectedValues = Array.from(selectedOptions).map(
      (option) => option.value
    );
    setFormState((prevState) => ({ ...prevState, [name]: selectedValues }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      {modelSchema.map(({ label, name, type }) => (
        <div
          key={name}
          className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4"
        >
          {type === "select" || type === "select-multiple" ? (
            <Select
              label={label}
              name={name}
              selectedOptions={
                formState[name] || (type === "select-multiple" ? [] : "")
              }
              allOptions={dynamicOptions[name] || []}
              multiple={type === "select-multiple"}
              onChange={
                type === "select-multiple" ? handleMultiChange : handleChange
              }
              disabled={isSubmitting}
            />
          ) : (
            <Input
              label={label}
              name={name}
              type={type}
              value={formState[name] || ""}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          )}
        </div>
      ))}
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
        <Button type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={
            isSubmitting ||
            JSON.stringify(formState) === JSON.stringify(formData)
          }
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormComponent;
