import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { startLoading, setData, setError } from '../redux/trackSlice';
import { RootState } from '../redux/store';
import Search from '../components/Search/Search';
import Result from '../components/Result/Result';

const Track: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const { data, loading, error } = useSelector((state: RootState) => state.api);

  const fetchApiData = async (id: string) => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`https://tracking.bosta.co/shipments/track/${id}?lang=ar`, {
        headers: {
          'X-Requested-By': 'Bosta',
        },
      });
      dispatch(setData(response.data));
      console.log(id, response.data);
    } catch (err: any) {
      dispatch(setError(err.message || 'Error fetching data'));
    }
  };

  React.useEffect(() => {
    if (id) fetchApiData(id);
  }, [id]);

  return (
    <div>
      <Search onSearch={(searchId) => fetchApiData(searchId)} />
      <Result data={data} loading={loading} error={error} />
    </div>
  );
};

export default Track;
