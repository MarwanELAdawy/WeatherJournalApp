/* Global Variables */
const api_key = '96eb94c82cf7f5fcd82555c50c1b053a';
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

const fetchWeather = async (url)=>{
    let response = await fetch(url);
    try {
      let data = await response.json();
      return data;
    } 
    catch (err) {
      console.log("Err:", err);
    }
};

const postData = async (url = '', data = {}) =>{
    console.log(data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
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
    const countryCode = `${(country.value).toLowerCase()}`;
    const resopnse = `${API_base}${zip_code}&APPID=${api_key}`;
    if (zip_code.length === 0 || feelings.length === 0) {
        alert("Please fill up all values !");
        return;
    }
    try{
        let temp = await fetchWeather(resopnse).main.temp;
        // Create a new date instance dynamically with JS
        let d = new Date();
        let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
        const newD = {
            date: newDate,
            temp: temp,
            content: content
        };
        await postData('/projectData',newD);
        UI();
    }
    catch(error){
        console.log("error", error);
    }
};
const UI = async(url = '', data = {}) => {
    const response = await fetch(url);
    try {
        const newData = await response.json();
        dateEntry.innerHTML = newData.date;
        tempEntry.innerHTML =  newData.temperature;
        contentEntry.innerHTML = `<p>country ${newData.country}.</p> <p>feelings: ${newData.feelings}</p> <p>zipCode: ${newData.zipCode}</p>`;
        console.log('UI', newData);
    } catch (error) {
        console.log("error", error);
    }
};
generate.addEventListener('click', getWD);
