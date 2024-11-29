'use strict';
class Loader {
  /**
   * Конструктор класса загрузчика.
   * 
   * @param {string} selector - селектор элемента загрузчика.
   */
  constructor(selector, delay = 300) {
      this.delay = delay;
      /**
       * DOM-элемент, представляющий загрузчик.
       * @type {HTMLElement}
       */
      this.element = document.querySelector(selector);
      /**
       * DOM-элемент, представляющий заголовок загрузчика.
       * @type {HTMLElement}
       */
      this.titleElement = this.element.querySelector('.loader-container__title');

      this.isLoading = false;
  }

  /**
   * Открывает загрузчик.
   * 
   * Этот метод удаляет класс 'loder-container--hidden' у элемента загрузчика,
   * что приведет к его отображению.
   */
  open() {
      this.isLoading = true;
      setTimeout(() => {
          if (!this.isLoading) return;
          this.element.classList.remove('loader-container--hidden');
      }, this.delay);
  }

  /**
   * Скрывает загрузчик.
   * 
   * Этот метод добавляет класс 'loder-container--hidden' к элементу загрузчика,
   * что приведет к его скрытию.
   */
  close() {
      this.isLoading = false;
      this.element.classList.add('loader-container--hidden');
  }

  /**
   * Устанавливает заголовок загрузчика и открывает его.
   *
   * @param {string} title - Заголовок загрузчика.
   */
  show(title) {
      // Устанавливаем заголовок загрузчика
      this.titleElement.innerText = title;
      this.open()
  }
}
function getRandomNumber(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}
function getDateTime() {
  let now     = new Date(); 
  let year    = now.getFullYear();
  let month   = now.getMonth()+1; 
  let day     = now.getDate();
  let hour    = now.getHours();
  let minute  = now.getMinutes();
  let second  = now.getSeconds(); 
  if(month.toString().length == 1) {
       month = '0'+month;
  }
  if(day.toString().length == 1) {
       day = '0'+day;
  }   
  if(hour.toString().length == 1) {
       hour = '0'+hour;
  }
  if(minute.toString().length == 1) {
       minute = '0'+minute;
  }
  if(second.toString().length == 1) {
       second = '0'+second;
  }  
   
  let dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
   return dateTime;
}
async function calculateBSSsSatellitesAvailability(data) {
    try {
      const response = await fetch(`http://185.192.247.60:7130/CommunicationAvailability/CalculateBSSsSatellitesAvailability`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
    } 
}
async function calculateBSSsSatellitesDistribution(data) {
  try {
    const response = await fetch(`http://185.192.247.60:7130/CommunicationAvailability/CalculateBSSsSatellitesDistribution`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  } 
}
// example usage: realtime clock
setInterval(function(){
  let currentTime = getDateTime();
  document.getElementById("timer").innerHTML = currentTime;
}, 0);
const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];
let countSession=0;
btn.addEventListener("click", ()=>{modal.style.display = "flex"});
span.addEventListener("click", ()=>{modal.style.display = "none"});  
if (document.querySelector('h2')) {
  if (document.querySelector('h2').innerHTML) {

    const dateControl = document.querySelectorAll('input[type="date"]');

    dateControl[0].value=getDateTime().slice(0,10);
    dateControl[1].value=getDateTime().slice(0,10);
    const timeControl = document.querySelectorAll('input[type="time"]');
    
    let numberTime=Number(getDateTime().substring(11,13));
    let timeVal=getDateTime().substring(13,19);
    let endTimeVal=Number(timeVal.substring(1,3))+15;
    let secEndTimeVal=timeVal.substring(3,6);
    console.log(endTimeVal,secEndTimeVal)
    let endNumTime=numberTime;
    if (endTimeVal>59) {
      endNumTime++;
      endTimeVal-=60;
      if (endTimeVal<10) {
        endTimeVal=`0${endTimeVal}`
      }
    }
    if (numberTime>=10) {
      timeControl[0].value=`${numberTime}${timeVal}`;
      console.log(String(endTimeVal));
      console.log(endTimeVal,secEndTimeVal)
      timeControl[1].value=`${endNumTime}:${(endTimeVal)}${secEndTimeVal}`;
    }
    else{
      timeControl[0].value=`0${numberTime}${timeVal}`;
      timeControl[1].value=`0${endNumTime}${String(endTimeVal)}`;
    }
   
    console.log(numberTime);
    console.log(timeVal);
    // timeControl.value=getDateTime().substring(11,19);
    console.log(dateControl[0].value);
    console.log(timeControl[0].value);
    let timeSelf=`${dateControl[0].value}T0${numberTime-3}${timeControl[0].value.substring(2,10)}.000Z`;
    console.log(timeSelf);
    console.log((timeControl[0].value));
    let dateControlYear=+dateControl[0].value.substring(0,4);
    let dateControlMonth=+dateControl[0].value.substring(5,7);
    let dateControlDay=+dateControl[0].value.substring(8,10);
    let timeHouse=Number(`${timeControl[0].value[0]}${timeControl[0].value[1]}`);
    let timeMin=+(`${timeControl[0].value[3]}${timeControl[0].value[4]}`);
    let timeSec=+(`${timeControl[0].value[6]}${timeControl[0].value[7]}`);
    
    let dateControlYearEnd=+dateControl[1].value.substring(0,4);
    let dateControlMonthEnd=+dateControl[1].value.substring(5,7);
    let dateControlDayEnd=+dateControl[1].value.substring(8,10);
    let timeHouseEnd=Number(`${timeControl[1].value[0]}${timeControl[1].value[1]}`);
    let timeMinEnd=+(`${timeControl[1].value[3]}${timeControl[1].value[4]}`);
    let timeSecEnd=+(`${timeControl[1].value[6]}${timeControl[1].value[7]}`);

    const startDateTime=new Date(dateControlYear,dateControlMonth-1,dateControlDay,timeHouse,timeMin,timeSec).toISOString();
    const endDateTime=new Date(dateControlYearEnd,dateControlMonthEnd-1,dateControlDayEnd,timeHouseEnd,timeMinEnd,timeSecEnd).toISOString();
    console.log()
    const btnStartSim=document.getElementById('task-btn_sim');
    btnStartSim.addEventListener('click',()=>{
      const data={
        
          "params": {
              "start_datetime_iso": startDateTime,
              "end_datetime_iso": endDateTime,
              "dates_delta_in_sec": 15,
              "min_session_time_in_sec": 10,
              "acceptable_session_time_in_sec": 100
          },
          "BSSs": [
              {
                  "id": 1,
                  "name": "Мурманск",
                  "lat": 69,
                  "lon": 33,
                  "radius": 2500
              },
              {
                  "id": 2,
                  "name": "Евпатория",
                  "lat": 45.20000076293945,
                  "lon": 33.29999923706055,
                  "radius": 2500
              },
              {
                  "id": 3,
                  "name": "Новосибирск",
                  "lat": 55,
                  "lon": 83,
                  "radius": 2500
              },
              {
                  "id": 4,
                  "name": "Хабаровск",
                  "lat": 48.5,
                  "lon": 135,
                  "radius": 2500
              },
              {
                  "id": 5,
                  "name": "Магадан",
                  "lat": 59.5,
                  "lon": 151,
                  "radius": 2500
              }
          ],
          "satellites_id": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28
          ]
      }
      console.log(data)
      calculateBSSsSatellitesAvailability(data).then(response=>{
        console.log(response.BSSs_satellites_data);
        calculateBSSsSatellitesDistribution(response.BSSs_satellites_data);
      })
    });
   
  }
  else if (document.querySelector('h2').innerHTML=='Имитатор потока вызовов') {
    const btnFlawStart=document.querySelector('#task-btn_sim_flow');
    
    btnFlawStart.addEventListener('click',()=>{
      const loader = new Loader('.loader-container');
      loader.show('Загрузка данных с сервера');
      const data = {
      'point':{
            "name":'',
            "lat": document.getElementById('lat4').value,
            "lon": document.getElementById('lon4').value,
            "radius": 2500
          },
      "start_datetime_iso": new Date().toISOString(),
      "min_duration_in_sec":document.getElementById('min-call-time').value
      
    }
    const arrTimers=[];
   
      const timerCalls=setInterval(function (){
        calculateFirstAvailableInterval(data,arrTimers).then(()=>{
          loader.close();
          ++countSession;
          console.log(countSession);
          document.getElementById('response3').style.display='block';
      });
      },1000);
      const time=setInterval(function(){
        if (countSession>0) {
            clearTimeout(timerCalls);
           
            console.log(countSession);
        }
    },1000);
      
     
    
      // console.log(countSession);
      // clearInterval(timerCalls);
     
   

  
    });
    
  }
}
if (document.getElementById('abonent-select')) {
  const select = document.getElementById('abonent-select');
let number = document.querySelectorAll('.number');
let lastIndex = 0; 
select.addEventListener('change', function() {
  number[lastIndex].classList.remove ("hide"); 
  number[lastIndex].classList.remove ("show"); 


  let index = select.selectedIndex; 
 if (!index) {
  number[lastIndex].classList.remove ("hide"); 
  number[lastIndex].classList.remove ("show"); 
 }
 else{
  number[index].classList.add("show"); // Показать блок с соответствующим индексом
  number[index].classList.remove ("hide");
 }
  
  
  lastIndex = index; 
});
}





