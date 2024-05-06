import React, { useState, useEffect, useRef } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import exampleForm from './data/form.json';
import generatePDF from 'react-to-pdf';

const API_BASE_URL = "http://localhost:3000";

const SelectGroupOne = ({ placeholder, value }) => {
    return (
        <tr className="mb-4.5">
            <td className="relative z-20 bg-transparent dark:bg-form-input">
            <label className="mb-2.5 block text-black dark:text-white">{placeholder}</label>

                <select
                    readOnly
                    defaultValue={value}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                    <option className="text-body dark:text-bodydark">
                        {value}
                    </option>

                </select>

                <span className="absolute top-[60px] right-4 z-30 -translate-y-1/2">
                    <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.8">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                            ></path>
                        </g>
                    </svg>
                </span>
            </td>
        </tr>
    );
};

const renderFormField = (field) => {
    const { type, name, options, value } = field;
    switch (type) {
        case 'input':
            return (
                <tr key={name}>
                    <td>
                    <label className="mb-2.5 block text-black dark:text-white">
                        {name}
                    </label>
                    <input
                        type="text"
                        placeholder={name}
                        value={value}
                        disabled
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                                        </td>
                </tr>
            );
        case 'select':
            return (
                <SelectGroupOne key={name} placeholder={name} value={value} options={options} />
            );
        case 'textarea':
            return (
                <tr key={name} className="mb-6">
                    <td>
                    <label className="mb-2.5 block text-black dark:text-white">{name}</label>
                    <textarea
                        rows={6}
                        placeholder={name}
                        value={value}
                        disabled
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                    </td>
                </tr>
            );
        default:
            return null;
    }
};

const Section = ({ header, data }) => {
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    {header}
                </h3>
            </div>
            <form >
                <div className="p-6.5">
                    <table  className="border-2 border-transparent w-full table-auto" >
                        <tbody>
                            
                        {data && data.length > 0 && data[0].block_feilds && data[0].block_feilds.map((field) => (
                            renderFormField(field)
                        ))}

                        {data && data.length > 1 && data[0].block_row && data.map((row,rowIndex) => (
                            <tr key={rowIndex}>
                                {row.block_row.map((column,colIndex) => (

                                    <td key={colIndex} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark" colSpan={3}>
                                        <div className='flex'>
                                            <p className="text-black dark:text-white">
                                                {column}
                                            </p>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                        ))}

                        {data && data.length > 1 && !data[0].block_row && data[1].block_row && data[1].block_row.map((row,rowIndex) => (
                            <tr key={rowIndex} className='flex justify-evenly'>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        Date: <strong>{row.Date}</strong>
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                                    <p className="text-black dark:text-white ">
                                        Completed by: <strong>{row.Completed_by}</strong>
                                    </p>
                                </td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                </div>
            </form>
        </div>
    )
}
const ViewResponses = () => {
    const [form, setForm] = useState(exampleForm);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');
        const fetchFormData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/responses/${id}`);
                setForm(response.data.data);
            } catch (error) {
                console.error('Error fetching response data:', error);
            }
        };

        if (id) {
            fetchFormData();
        }
    }, [location.search]);


    const targetRef = useRef()

    return (
        <DefaultLayout>
            <Breadcrumb pageName={form.form_name} />
            <div ref={targetRef}>
            {form.data && form.data.map((section, index) => (
                <Section
                    key={index}
                    header={section.title}
                    blockId={section.block_id}
                    data={section.block}
                />
            ))}
            </div>
            <button onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 w-[93%]" >
                Download Form
            </button>
        </DefaultLayout>
    );
};

export default ViewResponses;
