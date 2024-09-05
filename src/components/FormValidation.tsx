"use client";
import React, { FormEvent, useState } from 'react';

interface Form {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
}

const FormValidation = () => {
    const initialState: Form = {
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    };

    const [formData, setFormData] = useState<Form>(initialState);
    const [displayData, setDisplayData] = useState<Form | null>(null);
    const [errors, setErrors] = useState<Errors>({});

    const validate = () => {
        const newErrors: Errors = {};

        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid";
        }
        if (!formData.message) newErrors.message = "Message is required";

        return newErrors;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log(formData);

        setDisplayData(formData);
        setFormData(initialState);
        setErrors({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Form) => {
        setFormData({ ...formData, [field]: e.target.value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    return (
        <div className='container min-h-screen flex justify-center items-center py-10'>
            <div className="flex flex-col gap-10 max-w-[500px] w-full">
                <form onSubmit={handleSubmit} className="w-full border p-4 bg-white shadow-md rounded-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name">
                            First Name
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none mb-2 focus:ring ${errors.firstName ? 'border-red-500' : 'focus:border-blue-300'}`}
                            type="text"
                            id="first-name"
                            placeholder="Enter your first name"
                            onChange={(e) => handleInputChange(e, 'firstName')}
                            value={formData.firstName}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last-name">
                            Last Name
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none mb-2 focus:ring ${errors.lastName ? 'border-red-500' : 'focus:border-blue-300'}`}
                            type="text"
                            id="last-name"
                            placeholder="Enter your last name"
                            onChange={(e) => handleInputChange(e, 'lastName')}
                            value={formData.lastName}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-md mb-2 focus:outline-none focus:ring ${errors.email ? 'border-red-500' : 'focus:border-blue-300'}`}
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            onChange={(e) => handleInputChange(e, 'email')}
                            value={formData.email}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
                        <textarea
                            onChange={(e) => handleInputChange(e, 'message')}
                            value={formData.message}
                            className={`w-full px-3 resize-none py-2 border rounded-md focus:outline-none focus:ring ${errors.message ? 'border-red-500' : 'focus:border-blue-300'}`}
                            id="message"
                            placeholder="Enter your message"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white border border-blue-600 duration-300 ease-linear font-bold py-2 px-4 rounded-md hover:bg-transparent hover:text-blue-600"
                    >
                        Submit
                    </button>
                </form>

                <div id='empty-box' className='w-full h-full shadow-lg border rounded-md p-4'>
                    {displayData && (
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr>
                                    <th className='border p-2 bg-gray-200'>Field</th>
                                    <th className='border p-2 bg-gray-200'>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='border p-2'>First Name*</td>
                                    <td className='border p-2'>{displayData.firstName}</td>
                                </tr>
                                <tr>
                                    <td className='border p-2'>Last Name*</td>
                                    <td className='border p-2'>{displayData.lastName}</td>
                                </tr>
                                <tr>
                                    <td className='border p-2'>Email*</td>
                                    <td className='border p-2'>{displayData.email}</td>
                                </tr>
                                <tr>
                                    <td className='border p-2'>Message*</td>
                                    <td className='border p-2 max-w-[200px] overflow-auto whitespace-normal'>{displayData.message}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormValidation;
