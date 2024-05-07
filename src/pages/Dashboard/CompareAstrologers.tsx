import React, {  useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CompareAstrologersChart from '../../components/Charts/CompareAstrologersChart';
import astrologer1 from './Astrologer1.json'
import astrologer2 from './Astrologer2.json'
import compareIcon from './compare-4.svg'
const SelectDropDown = ({ options, label,value, setSelected }) => {

  const handleChange = (event) => {
    setSelected(event.target.value);
  }

  return (
    <div className="flex">
      <label htmlFor={`user-assignment`} className="relative mt-3.5 mr-4 text-black dark:text-white whitespace-nowrap">
        {label}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input lg:w-[170px] md:w-[170px]">
        <select
          id={`user-assignment`}
          value={value}
          onChange={handleChange}
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        >

          <option value="" disabled className="text-body dark:text-bodydark ">
            Select
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className="text-body dark:text-bodydark">
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
}

interface Astrologer {
  name: string;
  orders: string[];
}


const CompareAstrologers: React.FC = () => {
  const options = [astrologer1.name, astrologer2.name];
  const [data1,setData1] = useState<number[]>()
  const [data2,setData2] = useState<number[]>()

  const [astrologers, setAstrologers] = useState<Astrologer[]>([astrologer1, astrologer2]);
  const [selectedAstrologer1, setSelectedAstrologer1] = useState<string>('');
  const [selectedAstrologer2, setSelectedAstrologer2] = useState<string>('');

  const [compareFromDate,setCompareFromDate] = useState<string>()
  const [compareToDate,setCompareToDate] = useState<string>()
  let maxCount = 0;

  const handleCompare = () => {
    if (!selectedAstrologer1 || !selectedAstrologer2) {
      alert("Select two astrologers to compare!");
      return;
    }
    if (selectedAstrologer1 === selectedAstrologer2) {
      alert("Select two different astrologers to compare!");
      return;
    }

    const astrologer1Orders = astrologers.find(a => a.name === selectedAstrologer1)?.orders.map(dateStr => new Date(dateStr)) || [];
    const astrologer2Orders = astrologers.find(a => a.name === selectedAstrologer2)?.orders.map(dateStr => new Date(dateStr)) || [];

    const allOrders = [...astrologer1Orders, ...astrologer2Orders].sort((a, b) => a.getTime() - b.getTime());

    const oldestDate = allOrders[0];
    const newestDate = allOrders[allOrders.length - 1];

    console.log("Oldest Date:", formatDate(oldestDate));
    console.log("Newest Date:", formatDate(newestDate));

    const oldestMonth = getMonthName(oldestDate);
    const newestMonth = getMonthName(newestDate);

    console.log("Oldest Month:", oldestMonth);
    console.log("Newest Month:", newestMonth);

    const astrologer1MonthCounts = countOrdersByMonth(astrologer1Orders);
    const astrologer2MonthCounts = countOrdersByMonth(astrologer2Orders);

    console.log("Astrologer 1 Month Counts:", astrologer1MonthCounts);
    console.log("Astrologer 2 Month Counts:", astrologer2MonthCounts);
    setData1(astrologer1MonthCounts)
    setData2(astrologer2MonthCounts)
    setCompareFromDate(formatDate(oldestDate).toString())
    setCompareToDate(formatDate(newestDate).toString())
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const getMonthName = (date: Date): string => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getMonth()];
  };

  const countOrdersByMonth = (orders: Date[]): number[] => {
    const monthCounts: number[] = Array(12).fill(0);

    orders.forEach(order => {
      const monthIndex = order.getMonth();
      monthCounts[monthIndex]++;
    });

    return monthCounts;
  };

  return (
    <DefaultLayout>
      <div className="w-full">
        <p className="font-semibold text-black dark:text-white text-4xl md:text-3xl sm:text-sm p-3">Compare Astrologers</p>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
        <div className="col-span-2 flex justify-start items-center">
          <SelectDropDown options={options} value={selectedAstrologer1} setSelected={setSelectedAstrologer1} label={""} />
        </div>
        <div className="p-3 col-span-2 flex justify-center items-center">
          <img src={compareIcon} width={50} />
        </div>
        <div className="col-span-2 flex justify-end items-center">
          <SelectDropDown options={options} value={selectedAstrologer2} setSelected={setSelectedAstrologer2} label={""} />
        </div>
        <button onClick={handleCompare} className="mt-10 mx-auto block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md dark:bg-blue-700 dark:hover:bg-blue-800">
          Compare
        </button>
      </div>
      {
        data1 && data2 &&
        <CompareAstrologersChart title='Calls' name1={selectedAstrologer1} data1={data1} name2={selectedAstrologer2} data2={data2} from={compareFromDate} to={compareToDate} />

      }
            {
        data1 && data2 &&
        <CompareAstrologersChart title='Orders' name1={selectedAstrologer1} data1={data1} name2={selectedAstrologer2} data2={data2} from={compareFromDate} to={compareToDate} />

      }
            {
        data1 && data2 &&
        <CompareAstrologersChart title='Ratings' name1={selectedAstrologer1} data1={data1} name2={selectedAstrologer2} data2={data2} from={compareFromDate} to={compareToDate} />

      }
            {
        data1 && data2 &&
        <CompareAstrologersChart title='Revenue' name1={selectedAstrologer1} data1={data1} name2={selectedAstrologer2} data2={data2} from={compareFromDate} to={compareToDate} />

      }
    </DefaultLayout>
  );
};

export default CompareAstrologers;
