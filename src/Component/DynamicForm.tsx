import React, { useState } from 'react';

type FormField = {
  id: string;
  type: string;
  label: string;
  value: string | boolean;
  options?: string[];
};

export default function DynamicForm() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string | boolean }>({});

  const generateId = () => `field_${Math.random().toString(36).substr(2, 9)}`;

  const inputAdding = () => {
    const newField: FormField = {
      id: generateId(),
      type: 'text',
      label: `Input Field`,
      value: '',
    };
    setFields([...fields, newField]);
  };

  const dropdownAdding = () => {
    const newField: FormField = {
      id: generateId(),
      type: 'dropdown',
      label: `Dropdown Field`,
      value: '',
      options: ['Option 1', 'Option 2', 'Option 3'],
    };
    setFields([...fields, newField]);
  };

  const checkboxAdding = () => {
    const newField: FormField = {
      id: generateId(),
      type: 'checkbox',
      label: `Checkbox Field`,
      value: false,
    };
    setFields([...fields, newField]);
  };

  const deleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
    
    const updatedFormData = { ...formData };
    delete updatedFormData[id];
    setFormData(updatedFormData);
  };

  const handleFieldChange = (id: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted form data:', formData);
  };

  return (
    <div className="flex justify-center h-auto">
      <div className="w-[50rem] bg-gray-400 p-4">
        <h2 className="font-medium text-center text-2xl">Dynamic Form</h2>
        <div className="flex gap-5 justify-between mt-5">
          <button onClick={inputAdding} className="bg-green-900 border-0 rounded-md p-4 text-white">
            Add Input Field
          </button>
          <button onClick={dropdownAdding} className="bg-slate-900 border-0 rounded-md p-4 text-white">
            Add Dropdown
          </button>
          <button onClick={checkboxAdding} className="bg-orange-700 border-0 rounded-md p-4 text-white">
            Add Checkbox
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          {fields.map((field) => (
            <div key={field.id} className="mt-4">
              <label className="text-white">{field.label}</label>
              
              {/* Render input fields dynamically */}
              {field.type === 'text' && (
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full p-2 mt-1"
                    value={formData[field.id] as string || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-red-600 ml-2 p-2 rounded-md text-white"
                    onClick={() => deleteField(field.id)}
                  >
                    Delete
                  </button>
                </div>
              )}

              {/* Render dropdown fields dynamically */}
              {field.type === 'dropdown' && (
                <div className="flex items-center">
                  <select
                    className="w-full p-2 mt-1"
                    value={formData[field.id] as string || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="bg-red-600 ml-2 p-2 rounded-md text-white"
                    onClick={() => deleteField(field.id)}
                  >
                    Delete
                  </button>
                </div>
              )}

              {/* Render checkbox fields dynamically */}
              {field.type === 'checkbox' && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData[field.id] as boolean || false}
                    onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                  />
                  <label className="text-white">{field.label}</label>
                  <button
                    type="button"
                    className="bg-red-600 ml-2 p-2 rounded-md text-white"
                    onClick={() => deleteField(field.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
