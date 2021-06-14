import axios from "axios"

export default class LetterService{
    getLetters(){
        return axios.get("http://localhost:8080/api/letters/getall")
    }}