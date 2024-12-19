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
function createBeginningLog(dateStartTime,respons){
  document.querySelector('.information_request').innerHTML+=`<div style=
            "font-size: calc(1.2rem);">Начало Работы</div><br>`;
  document.getElementById('response3').innerHTML+=`<div style=
  "font-size: calc(1.2rem);">Начало Работы</div><br>`;          
  document.getElementById('response3').innerHTML+=`<div>РСС:Инициирование связи с СУРР</div>`;
  document.querySelector('.information_request').innerHTML+=`<div>РСС:Инициирование связи с СУРР</div>`;
  document.querySelector('.information_request').innerHTML+=`<div>РСС: Время инициирования получения данных от СУРР:  ${dateStartTime.toLocaleString()}</div>`;
  document.getElementById('response3').innerHTML+=`<div>РСС: Время инициирования получения данных от СУРР:  ${dateStartTime.toLocaleString()}</div>`;

  // const dataDecrip=document.createElement('div');
  // dataDecrip.innerHTML+=`<br>`;
  // respons.forEach(element => {
  //   for (const key in element) {
  //     dataDecrip.innerHTML+=`<div>${key} ${element[key]}</div>`;
  //   }
  //   dataDecrip.innerHTML+=`<br>`;
  // });
  // document.getElementById('response3').innerHTML+=`<div>СУРР: ${respons}</div>`;
  // document.querySelector('.information_request').innerHTML+=`<div>РСС:  Время получения данных: ${dateStartTime.toLocaleString()}</div>`;
  // document.querySelector('.information_request').append(dataDecrip);
}
function createEndLog(dateStartTime,respons,result){
  document.querySelector('.information_request').innerHTML+=`<br><div style="font-size: calc(1.2rem);">Завершение Работы</div><br>`;
  document.getElementById('response3').innerHTML+=`<br><div style=
  "font-size: calc(1.2rem);">Завершение Работы</div><br>`;  
  document.querySelector('.information_request').innerHTML+=`<div>СУРР: Время ответа от СУРР:  ${dateStartTime.toLocaleString()}</div>`;
  document.getElementById('response3').innerHTML+=`<div>РСС:  Время получения данных: ${dateStartTime.toLocaleString()}</div>`;
  const dataDecrip=document.createElement('div');
  dataDecrip.innerHTML+=`<br>`;
  respons.forEach(element => {
    for (const key in element) {
      dataDecrip.innerHTML+=`<div>${key}: ${element[key]}</div>`;
    }
    dataDecrip.innerHTML+=`<br>`;
  });
  // document.getElementById('response3').innerHTML+=`<div>СУРР: ${respons}</div>`;
  document.querySelector('.information_request').innerHTML+=`<div>РСС:  Время получения данных: ${dateStartTime.toLocaleString()}</div>`;
  document.querySelector('.information_request').append(dataDecrip);
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
function getDateTimes(dateControl,timeControl){
  let dateControlYear=+dateControl.value.substring(0,4);
  let dateControlMonth=+dateControl.value.substring(5,7);
  let dateControlDay=+dateControl.value.substring(8,10);
  let timeHouse=Number(`${timeControl.value[0]}${timeControl.value[1]}`);
  let timeMin=+(`${timeControl.value[3]}${timeControl.value[4]}`);
  let timeSec=+(`${timeControl.value[6]}${timeControl.value[7]}`);
  const dateTime=new Date(dateControlYear,dateControlMonth-1,dateControlDay,timeHouse,timeMin,timeSec);
  return dateTime
}
async function getRssDatas() {
  try {
    const response = await fetch(`http://185.192.247.60:7130/rss`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result =await response.json();
    console.log(result)
    return result
  } 
  catch (error) {
    
  }
}
async function getKaDatas() {
  try {
    const response = await fetch(`http://185.192.247.60:7130/ka`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result =await response.json();
    console.log(result)
    return result
  } 
  catch (error) {
    
  }
}
async function getAllAntenas() {
  try {
    const response = await fetch(`http://185.192.247.60:7130/rss/antennas`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result =await response.json();
    console.log(result)
    return result
  } 
  catch (error) {
    
  }
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
const satIDs=[];
const rss=[]
btn.addEventListener("click", ()=>{modal.style.display = "flex"});
span.addEventListener("click", ()=>{modal.style.display = "none"});  
if (document.querySelector('h2')) {
  if (document.querySelector('h2').innerHTML==`Планирование РСС`) {
    let tempRssData=``;
    const rssPromise = getRssDatas().then(result=>{
      result.forEach ((rssData)=>{
        
        tempRssData={name:rssData.NAIM,
          lat:rssData.SHIROTA,
          lon:rssData.DOLGOTA,
          radius:rssData.RADIUS};
        console.log(tempRssData)
        rss.push(tempRssData)
      })
      
    });;
    const kasPromise=getKaDatas().then(result=>{
      result.forEach ((ka)=>{
        satIDs.push(ka.ID)
      })
      console.log(satIDs)
    });
    
   
   
   
    const dateControl = document.querySelectorAll('input[type="date"]');
    dateControl[0].value=getDateTime().slice(0,10);
    // dateControl[1].value=getDateTime().slice(0,10);
    const timeControl = document.querySelectorAll('input[type="time"]');
    console.log(getDateTime().slice(0,10))
    let numberTime=Number(getDateTime().substring(11,13));
    let timeVal=getDateTime().substring(13,19);
    if (numberTime>=10) {
      timeControl[0].value=`${numberTime}${timeVal}`;
    }
    else{
      timeControl[0].value=`0${numberTime}${timeVal}`;
    }
   const testTime= (getDateTimes(dateControl[0],timeControl[0]).getTime()/1000)+900;
   const toTimeString = (second) => new Date(second * 1000);
   console.log(String(toTimeString(testTime).toLocaleDateString()));
   
    const [day, month, year] = String(toTimeString(testTime).toLocaleDateString()).split('.');
    const formattedDate = `${year}-${month}-${day}`;
    dateControl[1].value=formattedDate;
    timeControl[1].value=String(toTimeString(testTime).toLocaleTimeString())
    console.log(formattedDate);

    // timeControl.value=getDateTime().substring(11,19);
    console.log(dateControl[0].value);
    console.log(timeControl[0].value);
    console.log((timeControl[1].value));
    
    console.log()
    const btnStartSim=document.getElementById('task-btn_sim');
    btnStartSim.addEventListener('click',()=>{
      console.log()
      const timeControl = document.querySelectorAll('input[type="time"]');
      const dateControl = document.querySelectorAll('input[type="date"]');
      const startDateTime=getDateTimes(dateControl[0],timeControl[0]);
      const endDateTime=getDateTimes(dateControl[1],timeControl[1]);
      if (endDateTime<startDateTime) {
        console.log('Ошибка')
      }
      else{
        const data={
        
          "params": {
              "start_datetime_iso": startDateTime.toISOString(),
              "end_datetime_iso": endDateTime.toISOString(),
              "dates_delta_in_sec": 15,
              "min_session_time_in_sec": 10,
              "acceptable_session_time_in_sec": 100
          },
          "BSSs": rss,
          "satellites_id": satIDs
      }
      console.log(data)
      calculateBSSsSatellitesAvailability(data).then(response=>{
        console.log(response.BSSs_satellites_data);
        calculateBSSsSatellitesDistribution(response.BSSs_satellites_data).then((respons)=>{
          createBeginningLog(new Date())
          createEndLog(new Date(),respons)
        });
      })
      }
      
    });
   
  }
  if (document.querySelector('h2').innerHTML==`Передача состояния антенных постов РСС`) {
   const dataAntennasPosts= document.querySelector('.antennas-posts');
   getAllAntenas()
   .then(antennas=>{
    dataAntennasPosts.innerHTML=`<div class="RSS">Антенные посты</div>`
    antennas.forEach(antennaData=>{
      let antenna =document.createElement('div');
      let {ID,ID_RSS,NUM,NAIM,AZIMUT,UM,ID_ISPR,DATA_BEG,DATA_END}=antennaData;
      
      antenna.classList.add('antennas-post');
      antenna.innerHTML=`
      <br>
      <span class="field">ID:</span><span class="data-ant">${ID}</span>
      <br>
      <span class="field">ID_RSS:</span><span class="data-ant">${ID_RSS}</span>
      <br>
      <span class="field">NUM:</span><span class="data-ant">${NUM}</span>
      <br>
      <span class="field">NAIM:</span><span class="data-ant">${NAIM}</span>
      <br>
      <span class="field">AZIMUT:</span><span class="data-ant">${AZIMUT}</span>
      <br>
      <span class="field"> UM:</span><span class="data-ant">${UM}</span>
      <br>
      <span class="field">ID_ISPR:</span><span class="data-ant">${ID_ISPR}</span>
      <br>
      <span class="field"> DATA_BEG:</span><span class="data-ant">${DATA_BEG}</span>
      <br>
      <span class="field"> DATA_END:</span><span class="data-ant">${DATA_END}</span>`
      dataAntennasPosts.append(antenna);
    })
    const antPosts=document.querySelectorAll('.antennas-post');
    antPosts.forEach(post=>{
      post.addEventListener('click',()=>{
        const fields=[];
        const datasAnt=[];
        const postsChildren= post.children ;
        [].forEach.call(postsChildren,(chield)=>{
         
          if (chield.classList.contains('field')) {
            fields.push(chield.innerHTML);
          }
          if (chield.classList.contains('data-ant')) {
            datasAnt.push(chield.innerHTML);
          }
         

        })
        const modalEdit=document.getElementById("myEdit");
        modalEdit.innerHTML=` <div class="modal-content-edit">
        <h4 class="modal-header-edit">Редактирование антенного поста</h4>
        
        <div class="btns-edit">
            
            <button class="close-edit">Закрыть</button>
            <button class="edit-btn">Редактировать</button>
        </div>
    </div>`;
        const closeEditModal=document.querySelector('.close-edit');
        const modalHeaderEdit=document.querySelector('.modal-header-edit');
        closeEditModal.addEventListener('click',()=>{modalEdit.style.display = "none";})
       
        modalEdit.style.display = "flex";
        
        
        console.log(fields[0]);
        console.log(datasAnt);
       
        for(let i=fields.length-1;i>=0;i--){
          const modalRowEdit=document.createElement('div');
          modalRowEdit.classList.add('modal_row-edit');
          const field=document.createElement('span');
          const data=document.createElement('input');
          data.type='text';
          data.value=datasAnt[i];
          field.innerText=fields[i];
          modalRowEdit.append(field);
          modalRowEdit.append(data);
          
          modalHeaderEdit.after(modalRowEdit);
        }
      })
    })
    
   })
   
   
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





