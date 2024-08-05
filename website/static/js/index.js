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
  var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
   return dateTime;
}

// example usage: realtime clock
setInterval(function(){
  let currentTime = getDateTime();
  document.getElementById("timer").innerHTML = currentTime;
}, 0);
function azimuth_and_elevation_angle() {
    const lat1 = document.getElementById('lat1').value;
    const lon1 = document.getElementById('lon1').value;
    const alt1 = document.getElementById('alt1').value;
    const lat2 = document.getElementById('lat2').value;
    const lon2 = document.getElementById('lon2').value;
    const alt2 = document.getElementById('alt2').value;
  
    fetch('/api/ade?lat1=' + lat1 + '&lon1=' + lon1 + '&alt1=' + alt1 + '&lat2=' + lat2 + '&lon2=' + lon2 + '&alt2=' + alt2)
      .then(response => response.json())
      .then(data => {
        document.getElementById('azimuth').innerText = data.azimuth;
        document.getElementById('elevation').innerText = data.elevation;
        document.getElementById('distance').innerText = data.distance;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

function finding_coordinates() {
    const lat1 = document.getElementById('first_TLE_line').value;
    const lon1 = document.getElementById('second_TLE_line').value;
    console.log(first_TLE_line)
    console.log(second_TLE_line)

    fetch('/api/finding_coordinates?first_TLE_line=' + first_TLE_line + '&second_TLE_line=' + second_TLE_line)
      .then(response => response.json())
      .then(data => {
        document.getElementById('lat.degrees').innerText = data.lat;
        document.getElementById('lon.degrees').innerText = data.lon;
        document.getElementById('height.km').innerText = data.height;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


function get_coordinates() {
    const first_TLE_line = document.getElementById('first_TLE_line').value;
    const second_TLE_line = document.getElementById('second_TLE_line').value;
    const name = document.getElementById('name').value;
    console.log(name)
    console.log(first_TLE_line)
    console.log(second_TLE_line)

    fetch('/api/get_coordinates?first_TLE_line=' + first_TLE_line + '&second_TLE_line=' + second_TLE_line + '&name' + name)
      .then(response => response.json())
      .then(data => {
       console.log(data.response)
       document.getElementById('response').innerText = data.response;

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

function communication_availability() {
    const acceptable_session_time_in_sec = document.getElementById('acceptable_session_time_in_sec').value;
    const dates_delta_in_sec = document.getElementById('dates_delta_in_sec').value;
    const interval_in_sec = document.getElementById('interval_in_sec').value;
    const min_session_time_in_sec = document.getElementById('min_session_time_in_sec').value;
    const start_datetime = document.getElementById('start_datetime').value;
    console.log(start_datetime)
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    const name = document.getElementById('name').value;


    fetch('/api/communication_availability?acceptable_session_time_in_sec=' + acceptable_session_time_in_sec +
     '&dates_delta_in_sec=' + dates_delta_in_sec + '&interval_in_sec=' + interval_in_sec + '&min_session_time_in_sec='
      + min_session_time_in_sec + '&start_datetime=' + start_datetime + '&lat=' + lat + '&lon=' + lon + '&name=' + name)

      .then(response => response.json())
      .then(data => {
       console.log(data.response)
       document.getElementById('response').innerText = data.response;

      })
      .catch(error => {
        console.error('Error:', error);
      });
   }


function release_all_frequency_resources(){
    const url = "http://185.192.247.60:7130/CommunicationAvailability/ReleaseAllFrequencyResources";
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => {

        if (!response.ok) {
            console.error("Ошибка при выполнении запроса:", response.status);
        }
        else {
        alert("Освобожден частотный ресурс");

        }
    })
    .catch(error => {
        console.error("Сетевая ошибка:", error);
    });
}




async function calculateFirstAvailableInterval(data){
  try {
    const response = await fetch("http://185.192.247.60:7130/CommunicationAvailability/CalculateFirstAvailableInterval", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    console.log("Success:", result);
    if (result.detail || Date.parse(new Date((result.start_datetime_iso)))<Date.parse(new Date())) {
      // console.log("Success:", result);
      document.getElementById('response3').innerHTML='Нет доступного KA';
      
    }
    else
    {
      createResponse(result,data);
      document.getElementById('response3').innerHTML+=`<div>Время получения КА для связи ${new Date()}</div>`;
      document.getElementById('response3').innerHTML+=`<div>Время запроса сеанса связи ${new Date()}</div>`;
     
      if (document.querySelector('.duplex-checkbox').checked) {
        postOcFrREs(result.satellite_id,document.querySelector('.duplex-checkbox').value)
        .then(respons=>{
          const randTime=getRandomNumber(60000,120000);
          document.querySelector('.information_request').innerHTML+=`<div>Время получения КА для связи  ${new Date()}</div>`;
          document.getElementById('response3').innerHTML+=`<div>Время вызова сеанса связи ${new Date()}</div>`;
          document.getElementById('response3').innerHTML+=`<div>Каналы выделены</div>`;
          document.querySelector('.information_request').innerHTML+=`<div>Время вызова сеанса связи ${new Date()}</div>`;
          
          document.querySelector('.information_request').innerHTML+=`<div> 
           Заняты частотные каналы:  ${result.satellite_name}
          ${respons.Nomera_zanyatyih_yacheek[0][1]} - ${respons.Nomera_zanyatyih_yacheek[0][0]}
          ${respons.Nomera_zanyatyih_yacheek[1][1]} - ${respons.Nomera_zanyatyih_yacheek[1][0]}
          </div> `;
          
          console.log(respons.Nomera_zanyatyih_yacheek[0]);

          if (document.querySelector('.time_call-max').checked) {
            console.log(respons.Nomera_zanyatyih_yacheek[0]);
            const time =String(document.querySelector('.total-time').innerText);
            document.getElementById('response3').innerHTML+=`<div>Прогнозируемая продолжительность сеанса ,сек: ${time.substring(time.length-3)}</div>`;
            console.log(time.substring(time.length-3));
            const timer=setTimeout(function(){
              postRelaeseFrRes(respons.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${time.substring(time.length-3)} секунд</div>`;
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова ${String(dataEndCall)}:</div>`;
                document.getElementById('response3').innerHTML+=`<br><div style="
                font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall)}</div>`;
              }); 
            },Number(time.substring(time.length-3))*1000);
            const btnEnd=document.getElementById('task-btn_cansel');
            btnEnd.addEventListener('click',()=>{
              document.getElementById("task-btn_sim").disabled = true;
              clearTimeout(timer);
              postRelaeseFrRes(respons.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                  // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Продолжительность вызова 
                  ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
                  ${dataEndCall}</div>`;
                  document.getElementById('response3').innerHTML+=`<br><div style="
                  font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall)}</div>`;
              });
              document.getElementById("task-btn_sim").disabled = false;  
            },{once:true});
          }
          else{
            document.getElementById('response3').innerHTML+=`<div>Прогнозируемая продолжительность сеанса ,сек: ${randTime/1000}</div>`;
            const timer=setTimeout(function(){
              postRelaeseFrRes(respons.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${randTime/1000} секунд</div>`;
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова ${String(dataEndCall)}:</div>`;
                document.getElementById('response3').innerHTML+=`<br><div style="
                font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall)}</div>`;
              });
              
            },randTime);
            const btnEnd=document.getElementById('task-btn_cansel');
            btnEnd.addEventListener('click',()=>{
              document.getElementById("task-btn_sim").disabled = true; 
              clearTimeout(timer);
              postRelaeseFrRes(respons.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                  // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Продолжительность вызова 
                  ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
                  ${dataEndCall}</div> <br>`;
                  document.getElementById('response3').innerHTML+=`<br><div style="
                  font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall)}</div>`;
              });
              document.getElementById("task-btn_sim").disabled = false;   
            },{once:true});
          }
          
        });
      }
      else{
        postOcFrREs(result.satellite_id,document.querySelector('.simple-checkbox').value).then(response=>{
          const randTime=getRandomNumber(60000,120000);
          
          document.querySelector('.information_request').innerHTML+=`<div>Время получения КА для связи  ${new Date()}</div>`;
          document.getElementById('response3').innerHTML+=`<div>Время вызова сеанса связи ${new Date()}</div>`;
          document.getElementById('response3').innerHTML+=`<div>Каналы выделены</div>`;
          document.querySelector('.information_request').innerHTML+=`<div>Время вызова сеанса связи ${new Date()}</div>`;
          
          document.querySelector('.information_request').innerHTML+=`<div> Заняты частотные каналы:${result.satellite_name} ${response.Nomera_zanyatyih_yacheek[0][0]} -
           ${response.Nomera_zanyatyih_yacheek[0][1]}</div> `;
          if (document.querySelector('.time_call-max').checked) {
            const time =String(document.querySelector('.total-time').innerText);
            document.getElementById('response3').innerHTML+=`<div>Прогнозируемая продолжительность сеанса ,сек: ${time.substring(time.length-3)}</div>`;
            console.log(time.substring(time.length-3));
            const timer=setTimeout(function(){
              postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${time.substring(time.length-3)} секунд</div>`;
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова ${String(dataEndCall)}:</div> <br>`;
                document.getElementById('response3').innerHTML+=`<br><div style="
                font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall)}</div>`;
              });  
            },Number(time.substring(time.length-3))*1000);
            const btnEnd=document.getElementById('task-btn_cansel');
            btnEnd.addEventListener('click',()=>{
              document.getElementById("task-btn_sim").disabled = true;
              
              clearTimeout(timer);
              postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                  // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Продолжительность вызова 
                  ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
                  ${dataEndCall}</div> <br>`;
                  document.getElementById('response3').innerHTML+=`<br><div style="
                  font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall)}</div>`;
              });
              document.getElementById("task-btn_sim").disabled = false;   
            },{once:true});
          }
          else{
            document.getElementById('response3').innerHTML+=`<div>Прогнозируемая продолжительность сеанса ,сек: ${randTime/1000}</div>`;
            setTimeout(function(){
           
              postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${randTime/1000} секунд</div>`;
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова ${String(dataEndCall)}:</div> <br>`;
                document.getElementById('response3').innerHTML+=`<br><div style="
                font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall)}</div>`;
              });
              
            },randTime);
            const btnEnd=document.getElementById('task-btn_cansel');
            btnEnd.addEventListener('click',()=>{
              document.getElementById("task-btn_sim").disabled = true;
              clearTimeout(timer);
              postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                  // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Продолжительность вызова 
                  ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
                  ${dataEndCall}</div> <br>`;
                  document.getElementById('response3').innerHTML+=`<br><div style="
                  font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall)}</div>`;
              });
              document.getElementById("task-btn_sim").disabled = false;    
            },{once:true});
          }
         
          
        });
      }
      return result;
    }
   
  } catch (error) {
    console.error("Error:", error);
  }
}
async function postJSON(data) {
    try {
      const response = await fetch("http://185.192.247.60:7128/Database/TableInfo", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  }
function createResponse(result,data){
  if (document.querySelector('.information_request')) {
    document.querySelector('.information_request').remove();
  }
  document.getElementById('response3').innerHTML='';
  for (const [key, value] of Object.entries(result)) {
    if (typeof(value)!='object') {
      if (key=='duration_in_sec') {
        document.getElementById('response3').innerHTML+=`<div class="total-time"> total_duration_in_sec: ${value}</div>`;
      }
      else {
        document.getElementById('response3').innerHTML+=`<div>${key}: ${value}</div>`;
      }
     
    }
   else{
    for (const [key, values] of Object.entries(value)){
      if (key=='duration_in_sec') {
        document.getElementById('response3').innerHTML+=`<div class="total-time"> total_duration_in_sec: ${values}</div> <br><span style="
        font-size: calc(1.2rem);">Вызов:</span>`;
      }
      else  if (key=='end_datetime_iso') {
        document.getElementById('response3').innerHTML+=`<div>${key}: ${values}</div>`;
        document.getElementById('response3').innerHTML+=`<div>Максимальная продолжительность вызова : ${(new Date(values)-new Date(data.start_datetime_iso))/1000}</div>`;
        console.log(new Date(values));
        console.log(new Date(data.start_datetime_iso));
      }
      else{
        document.getElementById('response3').innerHTML+=`<div>${key}: ${values}</div>`;
      }
     
      
    }
   }
    console.log();
  }
  
  const createInformationRequest=document.createElement('div');
  
  const parent=document.querySelector('.content');
  createInformationRequest.classList.add('information_request');
  for (const [key, value] of Object.entries(data)) {
    if (typeof(value)!='object') {
      if (key=='start_datetime_iso') {
        createInformationRequest.innerHTML+=`<br><div style="
        font-size: calc(1.2rem);">Начало сеанса связи:</div>`; 
        createInformationRequest.innerHTML+=`<div>Время начала вызова: ${value}</div>`; 
        document.getElementById('response3').innerHTML+=`<div>Время начала вызова: ${value}` ;
      }
      else if (key=='min_duration_in_sec') {
        createInformationRequest.innerHTML+=`<div>Минимальная продолжительность вызова, сек: ${value}</div>`;
        console.log(value);
      }
      else{
        createInformationRequest.innerHTML+=`<div>${key}: ${value}</div>`;
      }
    }
   else{
    const charKA=document.createElement('div');
    for (const [key, values] of Object.entries(value)){
      
      if (key=='name') {
       
        charKA.style=` font-size: calc(1.2rem);`;
        charKA.textContent="Характеристики КА:";
        // createInformationRequest.innerHTML+=`<div style="
        // font-size: calc(1.2rem);">Характеристики КА:</div>`;
       
        charKA.innerHTML+=`<div>Наименование КА: ${result.satellite_name} ${values}</div>`;
        
      }
      else if (key=='lat') {
        createInformationRequest.innerHTML+=`<div style="
        font-size: calc(1.2rem);">Характеристики Абонента:</div>`;
        createInformationRequest.innerHTML+=`<div>Широта, градусы: ${values}</div>`;
      }
      else if (key=='lon') {
        createInformationRequest.innerHTML+=`<div>Долгота, градусы: ${values}</div><br>`;
      }
      else if (key=='radius') {
        charKA.innerHTML+=`<div>Радиус зоны действия КА, км: ${values}</div>`;
        createInformationRequest.append(charKA);
      }
      else{
         createInformationRequest.innerHTML+=`<div>${key}: ${values}</div>`;
      }
      
    }
   
   }
    console.log();
  }
  parent.append(createInformationRequest);
}
async function postOcFrREs(stId,type){
  try {
    const response = await fetch(`http://185.192.247.60:7130/CommunicationAvailability/OccupyFrequencyResource?satellite_id=${stId}&number_of_cells_for_reservation=${type}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
async function postRelaeseFrRes(data,stId){
  try {
    const response = await fetch(`http://185.192.247.60:7130/CommunicationAvailability/ReleaseFrequencyResource?satellite_id=${stId}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

const imgRe=document.querySelector('.re-date');
imgRe.addEventListener('click',()=>{
  document.getElementById('lat3').value=getRandomNumber(41,77);
  document.getElementById('lon3').value=getRandomNumber(27,169);
  

});
document.getElementById("task-btn_cansel").disabled = true;
const btnStartSim=document.getElementById('task-btn_sim');
btnStartSim.addEventListener('click',()=>{
  const data = {
    'point':{
          "name":'',
          "lat": document.getElementById('lat3').value,
          "lon": document.getElementById('lon3').value,
          "radius": 2500
        },
        "start_datetime_iso": new Date().toISOString(),
        "min_duration_in_sec":document.getElementById('min-call-time').value
      
  }
   document.getElementById('response3').innerHTML='';
  if (document.querySelector('.information_request')) {
    document.querySelector('.information_request').remove();
  }
  const loader = new Loader('.loader-container');
    loader.show('Получение первого доступного КА');
  calculateFirstAvailableInterval(data).then(()=>{
    loader.close();
    document.getElementById("task-btn_cansel").disabled = false;
  });
});


// Получаем модальное окно
const modal = document.getElementById("myModal");
// Получаем кнопку, которая открывает модальное окно
const btn = document.getElementById("openModal");
// Получаем элемент <span>, который закрывает модальное окно
const span = document.getElementsByClassName("close")[0];
//// Когда пользователь нажимает на кнопку, открываем модальное окно
//btn.onclick = function() {
//    modal.style.display = "block";
//}
//// Когда пользователь нажимает на <span> (x), закрываем модальное окно
//span.onclick = function() {
//    modal.style.display = "none";
//}
//// Когда пользователь кликает вне модального окна, закрываем его
//window.onclick = function(event) {
//    if (event.target == modal) {
//        modal.style.display = "none";
//    }
//}

btn.addEventListener("click", ()=>{modal.style.display = "flex"})
span.addEventListener("click", ()=>{modal.style.display = "none"})
