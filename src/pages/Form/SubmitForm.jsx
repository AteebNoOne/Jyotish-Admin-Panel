import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import exampleForm from './data/form.json';

const API_BASE_URL = "http://localhost:3000";

const SuccessAlert = () => {
    return (
        <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
            <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                        fill="white"
                        stroke="white"
                    ></path>
                </svg>
            </div>
            <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                    Form Submitted Successfully
                </h5>
                <p className="text-base leading-relaxed text-body">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry.
                </p>
            </div>
        </div>
    );
};

const SelectGroupOne = ({ placeholder, options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        onChange(e.target.value);
    };

    return (
        <tr className="mb-4.5">

            <td className="relative z-20 bg-transparent dark:bg-form-input">
            <label htmlFor='item-select' className="mb-2.5 block text-black dark:text-white">{placeholder}</label>

                <select
                    id='item-select'
                    value={selectedOption}
                    onChange={handleChange}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                    <option value="" disabled className="text-body dark:text-bodydark">
                        {placeholder}
                    </option>
                    {options.map((option,index) => (
                        <option key={index} value={option.value} className="text-body dark:text-bodydark">
                            {option}
                        </option>
                    ))}
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

const renderFormField = (field, blockId, handleChange) => {
    const { type, name, options } = field;
    switch (type) {
        case 'input':
            return (
                <tr key={name}>
                    <td>
                    <label htmlFor='input-feild' className="mb-2.5 block text-black dark:text-white">
                        {name}
                    </label>
                    <input
                        id='input-feild'
                        type="text"
                        placeholder={name}
                        onChange={(e) => handleChange(blockId, name, e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    </td>
                </tr>
            );
        case 'select':
            return (
                <SelectGroupOne key={name} placeholder={name} options={options} onChange={(value) => handleChange(blockId, name, value)} />
            );
        case 'textarea':
            return (
                <tr key={name} className="mb-6">
                    <td>
                    <label htmlFor='textarea-field' className="mb-2.5 block text-black dark:text-white">{name}</label>
                    <textarea
                        id='textarea-field'
                        rows={6}
                        placeholder={name}
                        onChange={(e) => handleChange(blockId, name, e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                    </td>
                </tr>
            );
        default:
            return null;
    }
};

const Section = ({ header, blockId, data, handleChange, handleChangeArray }) => {

    const [values, setValues] = useState({
        "0-0": "",
        "0-1": "",
        "0-2": "",
        "1-0": "",
        "1-1": ""
    });

    useEffect(() => {
        if (values) {
            handleChangeArray(blockId, values);
        }
    }, [values, blockId]);

    const handleEditableSpanChange = (event, rowIndex, colIndex) => {
        const newValue = event.target.textContent;
        const key = `${rowIndex}-${colIndex}`;

        setValues(prevValues => ({
            ...prevValues,
            [key]: newValue,
        }));
    };


    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    {header}
                </h3>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="p-6.5">
                    <table className="border-2 border-transparent w-full" >
                        <tbody>
                        {data && data.length > 0 && data[0].block_feilds && data[0].block_feilds.map((field) => (
                            renderFormField(field, blockId, handleChange)
                        ))}

                        {data && data.length > 1 && data[0].block_row && data.map((row, rowIndex) => (
                            <tr key={rowIndex} >
                                {row.block_row.map((column, colIndex) => (
                                    <td key={colIndex} className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark" colSpan={3}>
                
                                            <p className=" text-black dark:text-white">
                                                {column.split(":")[0]}:

                                                {column !== "" &&
                                                <span
                                                    id={`editableSpan-${rowIndex}-${colIndex}`}
                                                    contentEditable="true"
                                                    suppressContentEditableWarning={true}
                                                    className=" text-black dark:text-white ml-2"
                                                    onInput={(event) => handleEditableSpanChange(event, rowIndex, colIndex)}
                                                >
                                                    Click to change
                                                </span>
                                            }
                                            </p>
                                        </td>
                                ))}
                            </tr>

                        ))}

                        {data && data.length > 1 && !data[0].block_row && data[1].block_row && data[1].block_row.map((row,index) => (
                            <tr key={index} className='flex justify-evenly'>
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

const SubmitForm = () => {
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState(exampleForm);
    const [formData, setFormData] = useState(form);
    const [apiCallComplete, setApiCallComplete] = useState(false);


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');
        const fetchFormData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/forms/${id}`);
                setForm(response.data);
                setFormData(response.data)
                setApiCallComplete(true); // Set API call complete when data is fetched
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        if (id) {
            fetchFormData();
        }
    }, [location.search]);

    const handleChange = (blockID, fieldName, value) => {
        handleChangeDate(blockID)
        setFormData(prevState => {
            const newData = prevState.data.map(item => {
                if (item.block_id === blockID) {
                    const updatedBlock = item.block.map(blockItem => {
                        if (blockItem.block_feilds) {
                            blockItem.block_feilds.forEach(field => {
                                if (field.name === fieldName) {
                                    field.value = value;
                                }
                            });
                        }
                        return blockItem;
                    });
                    item.block = updatedBlock;
                }
                return item;
            });
            return { ...prevState, data: newData };
        });
    };

    const handleChangeArray = (blockID, values) => {
        const fullArray = Object.values(values);
        let firstArray = fullArray.slice(0, 3);
        let secondArray = fullArray.slice(3);
        let newObject = [firstArray, secondArray];

        setFormData(prevState => {
            const newData = prevState.data.map(item => {
                if (item.block_id === blockID) {
                    const updatedBlock = item.block.map((blockItem, blockIndex) => {
                        if (blockItem.block_row) {
                            const newValue = Object.values(newObject[blockIndex]);
                            const updatedRow = blockItem.block_row.map((rowItem, index) => {
                                if (typeof rowItem === 'string') {
                                    const label = rowItem.split(':')[0].trim();
                                    return `${label}: ${newValue[index]}`;
                                }
                                return rowItem;
                            });
                            blockItem.block_row = updatedRow;
                        }
                        return blockItem;
                    });
                    item.block = updatedBlock;
                }
                return item;
            });
            return { ...prevState, data: newData };
        });
    };


    const handleChangeDate = (blockID) => {
        setFormData(prevState => {
            const newData = prevState.data.map(item => {
                if (item.block_id === blockID) {
                    const updatedBlock = item.block.map(blockItem => {
                        if (blockItem.block_row) {
                            const updatedRow = blockItem.block_row.map(rowItem => {

                                const currentDate = new Date().toISOString().slice(0, 10);
                                rowItem.Date = currentDate;
                                return rowItem;
                            });
                            blockItem.block_row = updatedRow;
                        }
                        return blockItem;
                    });
                    item.block = updatedBlock;
                }
                return item;
            });
            return { ...prevState, data: newData };
        });

    };

    const handleSubmit = async () => {
        if (form.form_id === "test_form") {
            alert("This is test form, cant submit to DB")
        }
        if (formData && form.form_id !== "test_form") {
            try {
                const response = await axios.post(
                    `${API_BASE_URL}/responses`,
                    {
                        data: {
                            form_name: form.form_name,
                            form_id: form.form_id,
                            data: formData,
                        },
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status !== 201) {
                    throw new Error('Failed to insert data');
                }

                alert('Data inserted successfully');
                setSuccess(true);
            } catch (error) {
                console.error(error);
                alert('Failed to insert data');
            }
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName={form.form_name} />
                {form.data && form.data.map((section, index) => (
                    <Section
                        key={index}
                        header={section.title}
                        blockId={section.block_id}
                        data={section.block}
                        handleChange={handleChange}
                        handleChangeArray={handleChangeArray}
                    />
                ))}
            <div className="grid gap-5 mt-5">
                {success && <SuccessAlert />}
                <button id='submit-button' onClick={handleSubmit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Submit
                </button>
            </div>

        </DefaultLayout>
    );
};

export default SubmitForm;

