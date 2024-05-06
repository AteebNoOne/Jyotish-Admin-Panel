import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AdminLayout from '../../layout/DefaultLayout';

// import defaultObject from './data/default_block.json'
import defaultObject from './data/default.json'
// import testObject from './data/test_block.json'


const API_BASE_URL = "http://localhost:3000";
function CustomButton({ onClick }) {
    return (
        <button id='add-item-button' onClick={onClick} className="mt-2 mb-2 text-sm px-3 py-1 text-black border-2 border-green-600 bg-green-600 flex items-center justify-between w-full">
            Add
            <i className="text-lg text-black fa fa-plus-circle"></i>
        </button>

    )
}

const SelectGroupOne = ({ placeholder, options, setAssignedTo }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const generateRandom = () => {
        return Math.floor(100000 + Math.random() * 900000);
    }

    const randomIndex = generateRandom();

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        setAssignedTo(selectedValue);
    };

    return (
        <div className="flex ">
            <label htmlFor={`user-assignment${randomIndex}`} class="relative mt-3.5 mr-4 text-black dark:text-white whitespace-nowrap">
                {placeholder}
            </label>

            <div className="relative z-20 bg-transparent dark:bg-form-input lg:w-[170px] md:w-[170px]">
                <select
                    id={`user-assignment${randomIndex}`}
                    value={selectedOption}
                    onChange={handleChange}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >

                    <option value="" disabled className="text-body dark:text-bodydark ">
                        {placeholder}
                    </option>
                    {options.map((option, index) => (
                        <option id={`user-assignment-d${index}`} key={index} value={option} className="text-body dark:text-bodydark">
                            {option}
                        </option>
                    ))}
                </select>

                <span className="absolute top-[25px] right-4 z-30 -translate-y-1/2">
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
            </div>
        </div>
    );
};

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const AvaiableOptions = [
    {
        name: "input"
    },
    {
        name: "select",
        options: []
    },
    {
        name: "textarea",
    }
]


function Palette({ blockData, setBlockData, blockID, selectedBlockData, bData, setBData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [blockName, setBlockName] = useState("");
    const [show, setShow] = useState('')
    const [optionName, setOptionName] = useState('')
    const options = ["1", "2"];

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setBlockName("");
        setIsModalOpen(false);
    };

    const handleNameChange = (e) => {
        setBlockName(e.target.value);
    };

    const handleAddBlock = () => {
        if (blockName.length < 3) {
            alert("Block name Must atleast have 3 characters")
        }
        else {
            setBlockData(prevBlockData => ({
                ...prevBlockData,
                block_id: generateRandomString(6),
                title: blockName
            }));
            closeModal();
        }
    };


    const handleShowOptions = (type) => {
        setShow(show === type ? '' : type);
    };


    const handleOptionNameChange = (name) => {
        setOptionName(name)
    }


    const handleCreatOptionData = (type) => {
        const index = bData.findIndex(element => element.block_id === blockID);
        if (index !== -1) {
            let updatedBData;
            if (type !== "select") {
                updatedBData = bData.map((item, idx) => {
                    if (idx === index) {
                        return {
                            ...item,
                            block: [
                                {
                                    block_feilds: [
                                        ...item.block[0].block_feilds,
                                        { type: type, name: optionName, value: "" }
                                    ]
                                },
                                {
                                    "block_row": [
                                        {
                                            "Date": "date",
                                            "Completed_by": "user_id"
                                        }
                                    ]
                                }
                            ]
                        };
                    } else {
                        return item;
                    }
                });
            } else {
                updatedBData = bData.map((item, idx) => {
                    if (idx === index) {
                        return {
                            ...item,
                            block: [
                                {
                                    block_feilds: [
                                        ...item.block[0].block_feilds,
                                        { type: type, options: options, name: optionName, value: "" }
                                    ]
                                },
                                {
                                    "block_row": [
                                        {
                                            "Date": "date",
                                            "Completed_by": "user_id"
                                        }
                                    ]
                                }

                            ]
                        };
                    } else {
                        return item;
                    }
                });
            }
            setBData(updatedBData);
        }
    };



    return (
        <div >
            <h2 className="text-xl font-bold mb-2">Palette</h2>
            <button id='open-modal-button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 w-full" onClick={openModal}>
                Add Block
            </button>
            {blockID && (
                <div className="p-2">
                    <h3 >Selected Block:</h3>
                    <strong >{selectedBlockData.block_id}</strong>
                    <div className="grid gap-4">
                        <h3>Avaiable options:</h3>
                        {AvaiableOptions.map((option, index) => (
                            <div key={index} className="border-2 border-blue-600 rounded-md">
                                <div className="flex items-center justify-center hover:cursor-pointer" onClick={() => handleShowOptions(option.name)}>
                                    <h3 className="mr-12">{option.name}</h3>
                                    <i className="fa fa-angle-down text-2xl font-bold"></i>
                                </div>
                                {show === option.name && (
                                    <div className="grid gap-2 p-2">
                                        <label htmlFor='name' className="">Name:</label>
                                        <input id='name' type="text" className="border-2 border-black rounded-md p-1" onChange={(e) => handleOptionNameChange(e.target.value)} />
                                        <CustomButton onClick={() => handleCreatOptionData(option.name)} />
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed z-9999 inset-0 overflow-y-auto bg-blue-200 bg-opacity-90">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg border-2 border-black">
                            <div className="mb-4">
                                <label htmlFor='block-name' className="block text-gray-700 text-sm font-bold mb-2">Block Name:</label>
                                <input id='block-name' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter block name" value={blockName} onChange={handleNameChange} />
                            </div>
                            <div className="flex justify-end">
                                <button id='add-block-button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleAddBlock}>Add</button>
                                <button id='close-modal-button' className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={closeModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Options({ data, onDataChange }) {
    const handleNameChange = (index, newName) => {
        const newData = [...data];
        newData[index].name = newName;
        onDataChange(newData);
    };

    const handleRemoveItem = (index) => {
        data.splice(index, 1);
    };

    const [selectedOption, setSelectedOption] = useState('');


    return (
        <>
            {data.map((item, index) => (
                <div key={index} className="relative  flex mt-5 mb-5">
                    <div>
                        <div className="p-2">
                            <input
                                id='item-label'
                                className="mb-2.5 block text-black dark:text-white"
                                type="text"
                                value={item.name}
                                onChange={(e) => handleNameChange(index, e.target.value)}
                            />
                        </div>
                        <div >
                            {item.type === "input" ? (
                                <input
                                    id='item-name'
                                    type="text"
                                    placeholder={item.name}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            ) : item.type === "select" ? (
                                <select
                                    id='item-select'
                                    value={selectedOption}
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);

                                    }}
                                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                >
                                    <option value="" disabled className="text-body dark:text-bodydark">
                                        {item.name}
                                    </option>
                                    {item.options.map((option, index) => (
                                        <option key={index} value={option} className="text-body dark:text-bodydark">
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : item.type === "textarea" ? (
                                <textarea
                                    id='item-textarea'
                                    rows={6}
                                    placeholder={item.name}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            ) : null}
                        </div>
                    </div>
                    <div className="absolute right-0 mr-1">
                        <svg
                            id='extra-content3'
                            className="w-6 h-6 text-red-600 rounded hover:text-black cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="red"
                            onClick={() => handleRemoveItem(index)}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9l-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                        </svg>
                    </div>
                </div>
            ))}
        </>
    );
}

function Block({ id, heading, data, onRemove, blockID, setBlockID, setSelectedBlockData, bData, setBData, assignedTo, setAssignedTo }) {
    const [updatedData, setUpdatedData] = useState(data);
    const ChooseUser = ["Ateeb", "NoOne", "Faiz"]

    useEffect(() => {
        setUpdatedData(data);
    }, [data]);

    useEffect(() => {
        handleChangeUser();
    }, [assignedTo]);
    const handleChangeUser = () => {
        // Find the index of the block in the bData array
        const index = bData.findIndex(element => element.block_id === blockID);

        // Ensure the block and its structure exist
        if (index !== -1 && bData[index]?.block[1]?.block_row[0]?.Completed_by !== undefined) {
            // Create a deep copy of the bData array
            const updatedBData = bData.map((item, idx) => {
                if (idx === index) {
                    // Create a deep copy of the nested structure that needs to be modified
                    const updatedBlock = {
                        ...item.block[1].block_row[0],
                        Completed_by: assignedTo
                    };
                    const updatedBlock1 = { ...item.block[1], block_row: [updatedBlock] };
                    const updatedBlock0 = { ...item.block[0] };
                    const updatedBlockArray = [updatedBlock0, updatedBlock1];

                    // Return a new object with the modified nested structure
                    return {
                        ...item,
                        block: updatedBlockArray
                    };
                } else {
                    return item;
                }
            });

            // Update the state with the new array
            setBData(updatedBData);
        } else {

        }
    };

    const maxColumns = Array.isArray(updatedData) ? Math.max(
        ...updatedData.filter((row) => !row.block_feilds).map((row) => Object.values(row)[0].length)
    ) : 0;

    const handleDataChange = (index, newData) => {
        if (!Array.isArray(updatedData)) return;
        const newDataArray = [...updatedData];
        newDataArray[index] = { ...newDataArray[index], block_feilds: newData };
        setUpdatedData(newDataArray);

        const BLOCKINDEX = bData.findIndex(element => element.id === id);

        if (BLOCKINDEX !== -1) {
            let updatedBData;
            updatedBData = bData.map((item, idx) => {
                if (idx === BLOCKINDEX) {
                    return {
                        ...item,
                        block: newDataArray
                    };
                } else {
                    return item;
                }
            });
            setBData(updatedBData);
        }
    };

    const handleRemoveBlock = () => {
        setBlockID('');
        setTimeout(() => {
            onRemove();
        }, 0);
    };

    const handleBlock = () => {
        if (id !== 'default') {
            setBlockID(id);
            setSelectedBlockData(
                {
                    block_id: id,
                    title: heading,
                    block: data
                }
            )
        }
    };


    return (
        <section className={`container mx-auto p-6 ${id !== 'default' ? 'hover:cursor-pointer' : ''}`} onClick={handleBlock}>
            <table id='table-to-recolor' className={`border-2 ${id === blockID ? 'border-green-500' : 'border-transparent'} w-full table-auto`} >

                <thead>

                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11" colSpan={maxColumns}>
                            {heading}
                        </th>
                        {id !== 'default' &&
                            <th className="relative mt-4 right-0" >
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="red"
                                    onClick={handleRemoveBlock}
                                    id='extra-content2'
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9l-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                                </svg>
                            </th>
                        }
                    </tr>
                </thead>

                <tbody>
                    {updatedData && updatedData.map((row, rowIndex) => (
                        <React.Fragment key={rowIndex} >
                            {row.block_feilds && row.block_feilds.length > 0 && (
                                <tr key={rowIndex}>
                                    <td colSpan={maxColumns} className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <>
                                            <Options data={row.block_feilds} onDataChange={(newData) => handleDataChange(rowIndex, newData)} />
                                        </>
                                    </td>
                                </tr>
                            )}
                            {!row.block_feilds && !row.block_row[0].Date && (
                                <tr key={rowIndex}>
                                    {Array.from({ length: maxColumns }).map((_, columnIndex) => {
                                        const rowData = Object.values(row)[0];
                                        const columnValue = rowData && rowData[columnIndex];
                                        const colspan = rowData && rowData.length ? 1 : maxColumns;
                                        return (
                                            <td key={columnIndex} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark" colSpan={colspan}>
                                                <p className="text-black dark:text-white">
                                                    {columnValue}
                                                </p>
                                            </td>
                                        );
                                    })}
                                </tr>
                            )}
                            {row.block_row && row.block_row[0].Date && row.block_row.map((row, index) => (
                                <tr key={index}>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className='flex justify-between'>
                                            <p className="mt-[13px] text-black dark:text-white">
                                                Date: {row.Date}
                                            </p>
                                            <SelectGroupOne key={index} placeholder={"Completed by:"} options={ChooseUser} setAssignedTo={setAssignedTo} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

const initialBlockData = {
    title: null,
    block_id: null,
    block: [
        { block_feilds: [] },
        {
            block_row: [{
                "Date": "date",
                "Completed_by": "user_id"
            }]
        }
    ]
};

const CreateForm = () => {
    const [formName, setFormName] = useState("Form Name Default")
    const [blockData, setBlockData] = useState(initialBlockData);
    const [bData, setBData] = useState([defaultObject]);
    const [blockID, setBlockID] = useState('')
    const [selectedBlockData, setSelectedBlockData] = useState()
    const [assignedTo, setAssignedTo] = useState("Ateeb")
    const [hideInfo,setHideInfo] = useState(false)

    useEffect(() => {
        if (blockData.title) {
            setBData(prevBData => [...prevBData, blockData]);
        }
    }, [blockData]);


    const handleRemoveBlock = (indexToRemove) => {
        if (indexToRemove === bData.findIndex(block => block.id === blockID)) {
            setBlockID('');
        }
        setBData(prevBData => prevBData.filter((_, index) => index !== indexToRemove));
    };

    const handleCreateForm = async () => {
        if (!formName || formName.length < 3) {
            setFormName("XYZ");
            alert("Form Name Must be at least 3 characters");
            return;
        }
        if (bData.length < 2) {
            alert("Form Must have at least 2 blocks");
            return;
        }
        else {
            try {
                const response = await axios.post(`${API_BASE_URL}/forms`, {
                    data: { form_name: formName, data: bData }
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status !== 201) {
                    throw new Error('Failed to insert data');
                }
                alert("Data inserted successfully");
            } catch (error) {
                alert("Failed to insert data");
            }
        }
    };

    const handleFormNameChange = (event) => {
        setFormName(event.target.textContent);
    };

    useEffect(() => {
        document.getElementById("editableSpan").textContent = formName;
    }, [formName]);

    return (
        <AdminLayout>
            <Breadcrumb pageName="Create Form" />
            <div className="flex flex-col sm:flex-row w-full">
                <div className="flex flex-col gap-9  sm:w-[65%] h-[600px] overflow-y-scroll">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                <span
                                    id="editableSpan"
                                    contentEditable="true"
                                    onInput={handleFormNameChange}
                                >
                                </span>
                                <span
                                    id='extra-content'
                                    className='text-red-500 font-bold ml-10'
                                >
                                    Click to change
                                </span>
                            </h3>
                        </div>
                        {bData.map((block, index) => (
                            <Block
                                key={index}
                                id={block.block_id && block.block_id}
                                heading={block.title}
                                data={block.block}
                                onRemove={() => handleRemoveBlock(index)}
                                blockID={blockID}
                                setBlockID={setBlockID}
                                selectedBlockData={selectedBlockData}
                                setSelectedBlockData={setSelectedBlockData}
                                bData={bData}
                                setBData={setBData}
                                assignedTo={assignedTo}
                                setAssignedTo={setAssignedTo}
                            />

                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-9 mx-5 sm:w-[30%]">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        {!hideInfo &&
                                                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                                <h3 className="font-medium text-black dark:text-white flex justify-between">
                                                    <span>Select Form Fileds</span><span className='text-red-500 hover:cursor-pointer' onClick={() => setHideInfo(true)}>Hide</span>
                                                </h3>
                                                <br></br>
                                                <span className="text-red-700">You can select same fileds multiple time, makesure you place it in right flow before you save the workflow</span>
                                            </div>

                        }
                        <div className="flex flex-col gap-2 p-6.5">
                            <div className="bg-gray-100 p-4 rounded-md">
                                <Palette blockData={blockData} setBlockData={setBlockData} blockID={blockID} selectedBlockData={selectedBlockData} bData={bData} setBData={setBData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button id='create-form-buttom' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 w-[93%]" onClick={handleCreateForm}>
                Create Form
            </button>
        </AdminLayout>
    );
};

export default CreateForm;
