import axios from 'axios';
const REACT_APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

export async function axiosWithCredentials({
  path = '/api/',
  method = 'get',
  setData = () => {},
  setDataLoading = () => {},
  setDataError = () => {},
  options = {},
}) {
  setDataError((prevError) => false);
  setDataLoading((prevLoading) => false);
  try {
    setDataLoading((prevLoading) => true);
    const res = await axios[method](`${REACT_APP_SERVER_URL}${path}`, {
      withCredentials: true,
      ...options,
    });
    setData((prevData) => res?.data);
    console.log(res.data);
    setDataLoading((prevLoading) => false);
  } catch (error) {
    console.log('There was an Error\n', error);
    setDataLoading((prevLoading) => false);
    setDataError((prevError) => true);
  }
}
