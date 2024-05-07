import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { BRAND } from '../../types/brand';

const astrologersData: BRAND[] = [
  {
    logo: "https://static.vecteezy.com/system/resources/previews/009/397/892/non_2x/woman-face-expression-clipart-design-illustration-free-png.png",
    name: 'Alexa Fernandez',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 48,
  },
  {
    logo: "https://static.vecteezy.com/system/resources/thumbnails/008/846/297/small_2x/cute-boy-avatar-png.png",
    name: 'Naman Garg',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 43,
  },
  {
    logo: "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
    name: 'Min Ho',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 37,
  },
  {
    logo: "https://static.wixstatic.com/media/2bc4db_240c336fa07345fe8a2e62274bed832d~mv2.png",
    name: 'Ateeb NoOne',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 25,
  },
  {
    logo: "https://images.vexels.com/media/users/3/157837/isolated/preview/db181fb308b9a32197d9c3cadc58c4d3-asymmetric-cut-hair-woman-avatar.png",
    name: 'Pooja Sharma',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 42,
  },
];

const TopRatedAstrologers: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="col-span-12 xl:col-span-8">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Rated Astrologers
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Visitors
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Revenues
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Calls
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Orders
            </h5>
          </div>
        </div>

        {astrologersData.map((astrologer, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === astrologersData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={astrologer.logo} width={50} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {astrologer.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{astrologer.visitors}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">${astrologer.revenues}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{astrologer.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{astrologer.conversion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
    </DefaultLayout>
  );
};

export default TopRatedAstrologers;
