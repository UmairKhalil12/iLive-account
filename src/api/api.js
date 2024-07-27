import axios from 'axios';

const linkStarter = 'https://profitpilot.azurewebsites.net'

const GET_METHOD = async (link) => {
    try {

        const res = await axios.get(linkStarter + link);
        return res.data;
    } catch (error) {
        console.log("Error:", error.message);
        console.log("error", error);
        return null;
    }
};

const GET_METHOD_LOCAL = async (link) => {
    try {
        const res = await axios.get(link);
        return res.data;
    } catch (error) {
        console.log("Error:", error.message);
        console.log("error", error);
        return null;
    }
}

const POST_METHOD = async (link, data) => {
    try {
        const res = await axios.post(link, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data
    }
    catch (error) {
        console.log("error", error.message);
        console.log("error", error);
    }
}

export { GET_METHOD, POST_METHOD, GET_METHOD_LOCAL };
