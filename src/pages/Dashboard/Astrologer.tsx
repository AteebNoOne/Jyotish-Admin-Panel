import React, { useEffect, useState } from 'react';
import { ASTROLOGER } from '../../types/astrologer';
import DefaultLayout from '../../layout/DefaultLayout';
import { getAstrologerById } from '../../api';
import Loader from '../../common/Loader';

const Astrologer: React.FC = () => {

    const [astrologer, setAstrologer] = useState<ASTROLOGER>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const idParam = searchParams.get('id');
        const id = idParam ? parseInt(idParam, 10) : undefined;

        const fetchAstrologerData = async () => {
            try {
                if (id) {
                    const response = await getAstrologerById(id);
                    setAstrologer(response);
                }
            } catch (error) {
                console.error('Error fetching astrologer data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAstrologerData();
    }, []);

    if (loading) {
        return <Loader />; 
    }

    if (!astrologer) {
        return <div>No data found for this astrologer.</div>; 
    }

  return (
    <DefaultLayout >
    <div className="bg-white rounded-md shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{astrologer.name || 'Unknown Name'}</h2>
        <span className="text-gray-500">Experience: {astrologer.years_of_experience} Years</span>
      </div>
      <div className="flex space-x-4">
        {astrologer.profile_picture && (
          <img src={astrologer.profile_picture} alt="Profile Picture" className="w-20 h-20 object-cover rounded-full" />
        )}
        {astrologer.profile_picture1 && (
          <img src={astrologer.profile_picture1} alt="Profile Picture 2" className="w-20 h-20 object-cover rounded-full" />
        )}
        {astrologer.profile_picture2 && (
          <img src={astrologer.profile_picture2} alt="Profile Picture 3" className="w-20 h-20 object-cover rounded-full" />
        )}
        {astrologer.profile_picture3 && (
          <img src={astrologer.profile_picture3} alt="Profile Picture 4" className="w-20 h-20 object-cover rounded-full" />
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Bio</h3>
        <p className="text-gray-700">{astrologer.bio}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Details</h3>
        <p>Category Names:  {astrologer.category_names && astrologer.category_names.length > 0 ? astrologer.category_names.filter(category => category !== null).join(', ') : "N/a"}</p>
        <p>Language: {astrologer.language}</p>
        <p>Specialization: {astrologer.specialization}</p>
      </div>
    </div>
    </DefaultLayout>
  );
};

export default Astrologer;
