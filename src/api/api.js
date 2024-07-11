import axios from 'axios';

const GET_METHOD = async (link) => {
    try {
        const res = await axios.get(link);
        // console.log('link of api',link); 
        return res.data; 
    } catch (error) {
        console.log("Error", error.message);
    }
};

export { GET_METHOD };
