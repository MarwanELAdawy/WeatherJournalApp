/* Global Variables */
const api_key = '&appid=96eb94c82cf7f5fcd82555c50c1b053a';
const API_base = 'https://api.openweathermap.org/data/2.5/weather?zip=';

//variables
const userData = {};
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const country = document.getElementById('country');
const generate = document.getElementById('generate');
const dateEntry = document.getElementById('date');
const tempEntry = document.getElementById('temp');
const contentEntry = document.getElementById('content');

console.log(zipCode.value, country.value, feelings.value);

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const fetchWeather = async (baseURL, newZip, apiKey)=>{

    const res = await fetch(baseURL + newZip + apiKey);
    try {
      const data = await res.json();
        return data;
    } 
    catch (err) {
      console.log("Err:", err);
    }
};

const postData = async (url = '', data = {}) =>{
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })
    });
    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error){
        console.log("error", error);
    }
};
const getWD = async(url = '', data = {})=>{
    const zip_code = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    fetchWeather(API_base, zip_code, api_key).then(function (userData) {
            postData('/add', { date: newDate, temp: userData[0].main.temp, content });
    }).then(function (newData) {UI();});
};
const UI = async(url = '', data = {}) => {
    const response = await fetch(url);
    try {
        const newData = await response.json();
        dateEntry.innerHTML = newData.date;
        tempEntry.innerHTML =  newData.temperature;
        document.getElementById('content').innerHTML = allData.content;
        //contentEntry.innerHTML = `<p>country ${newData.country}.</p> <p>feelings: ${newData.feelings}</p> <p>zipCode: ${newData.zipCode}</p>`;
        console.log('UI', newData);
    } catch (error) {
        console.log("error", error);
    }
};
generate.addEventListener('click', getWD);
