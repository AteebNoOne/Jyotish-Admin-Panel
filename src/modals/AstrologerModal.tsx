import React, { useState } from 'react';
import { ASTROLOGER } from '../types/astrologer';
import { createAstrologer } from '../api';
import DefaultLayout from '../layout/DefaultLayout';

const CreateAstrologerPage: React.FC = () => {
    const [formData, setFormData] = useState<Partial<ASTROLOGER>>({
        name: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Ensure that the value is always a string by converting null or undefined to an empty string
        const sanitizedValue = value ?? ''; // If value is null or undefined, use an empty string
        setFormData(prevData => ({
            ...prevData,
            [name]: sanitizedValue
        }));
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newAstrologer = await createAstrologer(formData as ASTROLOGER);
            // Redirect or show success message
        } catch (error) {
            console.error('Error creating astrologer:', error);
            // Handle error or display error message to the user
        }
    };

    return (
        <DefaultLayout>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Create Astrologer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    {/* Add other form fields here */}
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Create</button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default CreateAstrologerPage;
