import { useCallback, useContext, useEffect, useState } from "react"
import { getDataList } from "../../api/Api";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../component/loading/loadingPage";
import ReactLoading from 'react-loading';
import { FormComponent } from "../../component/form/form";
import { Header } from "../../component/header/Header";
import axios from "axios";
import { AppContext } from "../../component/provider/Provider";
import FavoriteIcon from '@mui/icons-material/Favorite';

export const HomePage = () => {
    const [data, setData] = useState([]);
    // const [allData, setAllData] = useState([]);
    const [page, setPage] = useState(1);
    const [universityName, setUniversityName] = useState("");
    const [universityCountry, setUniversityCountry] = useState("Indonesia");
    const perPage = 25;
    const [universityPaginate, setUniversityPaginate] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [optionUniversityName, setOptionUniversityName] = useState([]);
    const [optionUniversityCountry, setOptionUniversityCountry] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearch, setIsSearch] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const { userData } = useContext(AppContext);

    const getData = useCallback(async () => {
        try {
            if (isSearch) {
                let res = await getDataList(`name=${universityName}&country=${universityCountry}`);
                if (res.status === 200) {
                    setUniversityPaginate(res.data.slice(0, perPage));
                    setData(res.data);
                    setIsLoading(false);
                    setIsLoadingData(false);
                    setTotalPage(res.data.length);
                    setIsSearch(false);
                }
            }
        } catch (error) {
            alert("Error Page Will Refresh Automatically", error);
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        }
    }, [isSearch, universityCountry, universityName]);

    useEffect(() => {
        getData();
    }, [getData]);

    useEffect(() => {
        const getAllData = async () => {
            try {
                const resp = await getDataList();
                const countryList = resp.data.map((data, i) => data.country);
                const univNameList = resp.data.map((data, i) => data.name);
                setOptionUniversityCountry([...new Set(countryList)]);
                setOptionUniversityName([...new Set(univNameList)]);
            } catch (error) {
                alert('Error! Please Refresh The Page', error);
            }

        };
        getAllData();
    }, []);


    const fetchMoreData = () => {
        setTimeout(() => {
            setPage(page + 1);
            const rowStart = page * perPage;
            setUniversityPaginate([
                ...universityPaginate,
                ...data.slice(rowStart, rowStart + perPage),
            ]);
        }, 1000);
    };

    const handleAddToFav = async (data) => {
        const name = data.name;
        const country = data.country;
        const website = data.web_pages[0];
        const email = userData[0].email;
        let obj = {
            name: name,
            country: country,
            website: website,
            email: email,
        }
        try {
            const res = await axios.post('/addFavoriteUniv', obj);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <Header />
            <FormComponent
                optionUniversityName={optionUniversityName}
                optionUniversityCountry={optionUniversityCountry}
                universityName={universityName}
                universityCountry={universityCountry}
                setUniversityName={setUniversityName}
                setUniversityCountry={setUniversityCountry}
                setIsSearch={setIsSearch}
                setIsLoading={setIsLoadingData}
            />
            {isLoadingData === false ?
                <InfiniteScroll
                    style={{ overflow: "unset !important" }}
                    dataLength={universityPaginate?.length}
                    next={fetchMoreData}
                    hasMore={totalPage > universityPaginate?.length}
                    loader={
                        (
                            <div style={{ display: "flex", width: "15%", margin: "auto" }}>
                                <ReactLoading type={"bubbles"} color={"blue"} height={'50px'} width={'50px'} />
                                <h3 style={{ margin: "auto", color: "blue" }}>Loading  </h3>
                                <ReactLoading type={"bubbles"} color={"blue"} height={'50px'} width={'50px'} />
                            </div>
                        )
                    }
                >
                    {universityPaginate?.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>University</th>
                                    <th>Country</th>
                                    <th>Website</th>
                                </tr>
                            </thead>
                            <tbody>
                                {universityPaginate?.map((data, i) => (
                                    <tr key={i}>
                                        <td data-header="University">{data.name}</td>
                                        <td data-header="Country">{data.country}</td>
                                        <td data-header="Website">{data.web_pages[0]}</td>
                                        <td style={{ cursor: "pointer" }} onClick={() => handleAddToFav(data)}><FavoriteIcon /></td>
                                    </tr>
                                ))
                                }
                            </tbody>

                        </table>
                    ) : <ReactLoading type={"bubbles"} color={"blue"} height={'50px'} width={'50px'} />}
                </InfiniteScroll>
                : <div style={{ display: "flex", width: "15%", margin: "auto" }}>
                    <ReactLoading type={"bubbles"} color={"blue"} height={'50px'} width={'50px'} />
                    <h3 style={{ margin: "auto", color: "blue" }}>Loading  </h3>
                    <ReactLoading type={"bubbles"} color={"blue"} height={'50px'} width={'50px'} />
                </div>}
        </div>
    )
}