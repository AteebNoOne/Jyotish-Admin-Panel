import React, { useState } from 'react';
import { ASTROLOGER } from '../../types/astrologer';
import DefaultLayout from '../../layout/DefaultLayout';
import { createAstrologer } from '../../api';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';

const CreateAstrologers: React.FC = () => {
  const [formData, setFormData] = useState<Partial<ASTROLOGER>>({
    id: 0,
    category_names: [],
    name: '',
    is_verified: false,
    profile_picture: undefined,
    profile_picture1: null,
    profile_picture2: null,
    profile_picture3: null,
    profile_picture4: null,
    years_of_experience: 0,
    charges_per_min: 0,
    language: '',
    specialization: '',
    bio: '',
    country: '',
    state: '',
    address: '',
    certificate_of_astrology: '',
    gender: null,
    call: false,
    chat: false,
    emergency_call: false,
    emergency_chat: false,
    highest_qualification: null,
    degree: null,
    School_college_university: null,
    form_where_learn_astrologer: null,
    instagram: null,
    facebook: null,
    linkdin: null,
    youtube_channel: null,
    website: null,
    user: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAstrologer = await createAstrologer(formData as ASTROLOGER);
      console.log('New astrologer created:', newAstrologer);

    } catch (error) {
      console.error('Error creating astrologer:', error);

    }
  };

  return (
    <DefaultLayout>

      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white text-2xl text-center">
              Create Astrologer
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Language
                  </label>
                  <input
                    type="text"
                    name="language"
                    placeholder="Enter language"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Specialization <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    placeholder="Enter your specialization"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Highest Qualification
                  </label>
                  <input
                    type="text"
                    name='highest_qualification'
                    placeholder="Enter highest qualification"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Experience in Year(s) <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="years_of_experience"
                    placeholder="Enter your experince in years"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>


              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">


                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Country <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Enter your country"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    State <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter your state"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <SelectGroupTwo />

              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Address <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your full address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Gender
                  </label>
                  <input
                    type="text"
                    name='gender'
                    placeholder="Enter gender"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Degree
                  </label>
                  <input
                    type="text"
                    name='degree'
                    placeholder="Enter degree"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    School College University
                  </label>
                  <input
                    type="text"
                    name='School_college_university'
                    placeholder="Enter school/college/university"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    From Where Learn Astrologer
                  </label>
                  <input
                    type="text"
                    name='form_where_learn_astrologer'
                    placeholder="Enter place where learn astrology"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Certificate of Astrology
                  </label>
                  <input
                    type="text"
                    name='certificate_of_astrology'
                    placeholder="Enter certificate of astrology"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    name='years_of_experience'
                    placeholder="Enter years of experience"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Charges Per Min
                  </label>
                  <input
                    type="text"
                    name='charges_per_min'
                    placeholder="Enter charges per min"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* <SelectGroupOne /> */}

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Bio
                </label>
                <textarea
                  rows={6}
                  name='bio'
                  placeholder="About you"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <SelectGroupOne />

              {/* ------------- Profile Images could be multiple max 5 images --------------- */}

              {/* <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Profile Image
                </label>
                <input
                  type="file"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div> */}

              <div
                id="FileUpload"
                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                        fill="#3C50E0"
                      />
                    </svg>
                  </span>
                  <p>
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                  <p>(max, 800 X 800px)</p>
                </div>
              </div>


              {/* ---------------------------- End Profile Images --------------------------- */}

              <div className="flex flex-col gap-6 xl:flex-row">
                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Instagram
                  </label>
                  <input
                    type="text"
                    name='instagram'
                    placeholder="Enter instagram"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Facebook
                  </label>
                  <input
                    type="text"
                    name='facebook'
                    placeholder="Enter facebook"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Linkdin
                  </label>
                  <input
                    type="text"
                    name='linkdin'
                    placeholder="Enter linkdin"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Youtube Channel
                  </label>
                  <input
                    type="text"
                    name='youtube_channel'
                    placeholder="Enter youtube channel"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Website
                </label>
                <input
                  type="text"
                  name='website'
                  placeholder="Enter website"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button className="flex w-full justify-center rounded bg-indigo-600 text-white p-3 font-medium hover:bg-opacity-90">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="p-4">
        <h2 className="text-lg font-semibold mb-4"></h2>
        <form onSubmit={handleSubmit}>
        </form>
      </div> */}
    </DefaultLayout>
  );
};

export default CreateAstrologers;