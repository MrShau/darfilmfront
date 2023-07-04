import axios from "axios";
import { SERVER_BASE } from "../consts";

class FilmApi {

    async addFilm(name, duration, videoUrl, poster) {
        let formData = new FormData();
        formData.append("Poster", poster.files[0])
        formData.append("Name", name)
        formData.append("Duration", duration)
        formData.append("VideoUrl", videoUrl)

        await axios.post(`${SERVER_BASE}/api/film/addfilm`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    async getFilms(page, count) {
        try {
            let result = [];

            await axios.get(`${SERVER_BASE}/api/film/getlistfilms?page=${page}&count=${count}`)
                .then(res => {
                    if (res.data != null)
                        result = res.data
                })
                .catch(err => console.log(err))
            return result;
        }
        catch (err) { }
    }

    async getFilm(id)
    {
        try
        {
            let result = {};

            await axios.get(`${SERVER_BASE}/api/film/getfilm?id=${id}`)
                .then(res => {
                    if (res.data != null)
                        result = res.data;
                })
                .catch(err => {})
            
            return result;
        }
        catch(err)
        {
            console.log(err);
        }
    }
}

export default new FilmApi();