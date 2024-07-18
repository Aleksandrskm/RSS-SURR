'use strict';
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
}, 1000);
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
    
    createResponse(result,data);
    if (document.querySelector('.duplex-checkbox').checked) {
      postOcFrREs(result.satellite_id,document.querySelector('.duplex-checkbox').value)
      .then(respons=>{
        
        document.querySelector('.information_request').innerHTML+=`<div> Заняты следующие ячейки 
        ${respons.Nomera_zanyatyih_yacheek[0]} ${respons.Nomera_zanyatyih_yacheek[1]}</div> `;
        console.log(respons.Nomera_zanyatyih_yacheek[0]);
        setTimeout(function(){
          console.log(respons.Nomera_zanyatyih_yacheek);
           postRelaeseFrRes(respons.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
            document.querySelector('.information_request').innerHTML+=`Ячейки освобождены`;
           });
           
        },10000);
       
      });
    }
    else{
      postOcFrREs(result.satellite_id,document.querySelector('.simple-checkbox').value).then(response=>{
        
        document.querySelector('.information_request').innerHTML+=`<div>Заняты следующие ячейки ${response.Nomera_zanyatyih_yacheek}</div> `;
        setTimeout(function(){
         
          postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
            document.querySelector('.information_request').innerHTML+=`<br> <div>Ячейки освобождены</div>`;
          });
          
        },10000);
      });
    }
    return result;
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

// let url = 'http://185.192.247.60:7128/Database/DBTables';
// let response =  fetch(url)
// .then(response =>response.json())
// .then(json=>{
//   json.forEach(element => {
//     const elem =document.createElement('div');
//     elem.innerHTML=`<div class="container__nav__el"> ${element}</div>`;
//     elem.addEventListener('click',(e)=>{
//       let content = e.target.innerHTML;
//       // console.log(content);
//       const data = {name:content};
//       document.querySelector('.container_content').innerHTML='';
//       postJSON(data).then(result=>{
//         if (result.total_rows_count==0) {
//           const name=document.createElement('div');
//             name.innerHTML=`<div>${result.name}</div>`;
//             document.querySelector('.container_content').append(name);
//         }
//         result.rows.forEach(element => {
//           if (result.rows[0]===element) {
//             const name=document.createElement('div');
//             name.innerHTML=`<div>${result.name}</div>`;
//             document.querySelector('.container_content').append(name);
//           }
//           const table=document.createElement('tr');

//           table.innerHTML+=`<tr></tr>`;
//           document.querySelector('.container_content').append(table);
//           element.forEach(el=>{
//             table.innerHTML+=`<td>${el}</td>
//             `;
//           });
//           // console.log(element);
//           document.querySelector('.container_content').append(table);
//         });
//         // console.log(result.rows);
//       });
//     });
//     document.querySelector('.container__nav').append(elem);
//   });
//   // console.log(json);
// });

//  const simDate=document.getElementById('simulator_this_time');
//  simDate.value=new Date().toISOString();
//  console.log(new Date().toISOString());
function createResponse(result,data){
  if (document.querySelector('.information_request')) {
    document.querySelector('.information_request').remove();
  }
  document.getElementById('response3').innerHTML='';
  for (const [key, value] of Object.entries(result)) {
    if (typeof(value)!='object') {
      document.getElementById('response3').innerHTML+=`<div>${key}: ${value}</div><br>`;
    }
   else{
    for (const [key, values] of Object.entries(value)){
      document.getElementById('response3').innerHTML+=`<div>${key}: ${values}</div><br>`;
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
        createInformationRequest.innerHTML+=`<div>Точка начала отсчета: ${value}</div><br>`;  
      }
      else{
        createInformationRequest.innerHTML+=`<div>${key}: ${value}</div><br>`;
      }
      
    }
   else{
    for (const [key, values] of Object.entries(value)){
      if (key=='name') {
        createInformationRequest.innerHTML+=`<div>Имя:${result.satellite_name} ${values}</div><br>`;
      }
      else if (key=='lat') {
        createInformationRequest.innerHTML+=`<div>Широта: ${values}</div><br>`;
      }
      else if (key=='lon') {
        createInformationRequest.innerHTML+=`<div>Долгота: ${values}</div><br>`;
      }
      else if (key=='radius') {
        createInformationRequest.innerHTML+=`<div>Радиус: ${values}</div><br>`;
      }
      else{
        createInformationRequest.innerHTML+=`<div>${key}: ${values}</div><br>`;
      }
      
    }
   
   }
    console.log();
  }
  // const checkboxSimple=document.createElement('input'); 
  // const checkboxDuplex=document.createElement('input');
  // const spanSiple=document.createElement('span');
  // const spanDuplex=document.createElement('span');
  // const btnSend=document.createElement('button');
  // const radio=document.createElement('div');
  // radio.classList.add('radio-dvi');
  // spanSiple.textContent='Симплекс';
  // spanDuplex.textContent='Дуплекс';
  // btnSend.classList.add('btn-send');
  // btnSend.textContent='Отправить';
  // checkboxSimple.type='radio';
  // checkboxSimple.checked=true;
  // checkboxDuplex.type='radio';
  // checkboxSimple.value=1;
  // checkboxDuplex.value=2;
  // checkboxSimple.name='radio';
  // checkboxDuplex.name='radio';
  // checkboxSimple.classList.add('simple-checkbox');
  // checkboxDuplex.classList.add('duplex-checkbox');
  // radio.append(spanSiple);
  // radio.append(checkboxSimple);
  // radio.append(spanDuplex);
  // radio.append(checkboxDuplex);
  
  // createInformationRequest.append(spanSiple);
  // createInformationRequest.append(checkboxSimple);
  // createInformationRequest.append(spanSiple);
  // createInformationRequest.append(checkboxDuplex);
  // createInformationRequest.append(spanDuplex);
  // createInformationRequest.append(radio);
  // createInformationRequest.innerHTML+=`<br>`;
  // createInformationRequest.append(btnSend);
  parent.append(createInformationRequest);
  // if (!document.querySelector('.duplex-checkbox').defaultChecked) {
  //   document.querySelector('.duplex-checkbox').checked=true;
  // }
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
const btnStartSim=document.getElementById('task-btn_sim');
btnStartSim.addEventListener('click',()=>{
  const data = {
    'point':{
          "name":'',
          "lat": document.getElementById('lat3').value,
          "lon": document.getElementById('lon3').value,
          "radius": 2500
        },
        "start_datetime_iso": new Date().toISOString()
      
  }
  document.getElementById('response3').innerHTML='Получение первого  доступного KA';
  if (document.querySelector('.information_request')) {
    document.querySelector('.information_request').remove();
  }
  calculateFirstAvailableInterval(data);
   

    
   
  
    // for (const [key, value] of Object.entries(result)) {
    //   if (typeof(value)!='object') {
    //     document.getElementById('response3').innerHTML+=`${key}: ${value}<br>`;
    //   }
    //  else{
    //   for (const [key, values] of Object.entries(value)){
    //     document.getElementById('response3').innerHTML+=`${key}: ${values}<br>`;
    //   }
     
    //  }
    //   console.log();
    // }
    
  
})

