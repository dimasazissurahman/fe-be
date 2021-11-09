import axios from "axios";

export const getDataList = async (props) => {
    try {
        const res = await axios.get(`http://universities.hipolabs.com/search?${props}`);
        return res;
    } catch (error) {
        return error;
    }
}