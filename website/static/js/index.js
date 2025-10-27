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
const gateway = document.querySelector('.information_request'); 

const createBeginningLog = (dateStartTime) => 
    gateway.insertAdjacentHTML('beforeend', `
        <div class="log-entry">
            <div class="log-title">🟢 Начало работы</div>
            <div>РСС: Инициирование связи с СУРР</div>
            <div>Время: ${dateStartTime.toLocaleString()}</div>
        </div>
    `);

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
function createEndLog(dateStartTime, distributionResponse, mainResponse) {
    const gateway = document.querySelector('.information_request');
    
    const bssCount = mainResponse.BSSs_satellites_data?.length || 0;
    let totalSessions = 0;
    
    mainResponse.BSSs_satellites_data?.forEach(bss => {
        bss.satellites_data?.forEach(satellite => {
            totalSessions += satellite.datetime_period?.length || 0;
        });
    });
    
    gateway.insertAdjacentHTML('beforeend', `
        <div class="log-entry log-end-bss">
            <div class="log-title">🔵 Завершение работы</div>
            <div>Время: ${dateStartTime.toLocaleString()}</div>
            <div>РСС: ${bssCount} объектов</div>
            <div>Сеансы: ${totalSessions} соединений</div>
        </div>
    `);
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
/*async function calculateRSSPlan(data) {
    try {
      const response = await fetch(`http://185.192.247.60:7130/сalculate_RSS_plan`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.params)
      });
      const result = await response.json();
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
    } 
}*/
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
  if (document.querySelector('h2').innerHTML == `Планирование РСС`) {
    let tempRssData = ``;
    const rssPromise = getRssDatas().then(result => {
        result.forEach((rssData) => {
            tempRssData = {
                name: rssData.NAIM,
                lat: rssData.SHIROTA,
                lon: rssData.DOLGOTA,
                radius: rssData.RADIUS
            };
            console.log(tempRssData);
            rss.push(tempRssData);
        });
    });
    
    const kasPromise = getKaDatas().then(result => {
        result.forEach((ka) => {
            satIDs.push(ka.ID);
        });
        console.log(satIDs);
    });

    const dateControl = document.querySelectorAll('input[type="date"]');
    const timeControl = document.querySelectorAll('input[type="time"]');
    const btnStartSim = document.getElementById('task-btn_sim');
    const allDateInputs = document.querySelectorAll('input[type="date"], input[type="time"]');

    dateControl[0].value = getDateTime().slice(0, 10);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateControl[1].value = tomorrow.toISOString().slice(0, 10);
    timeControl[1].value = '00:00:00';

    const currentTime = getDateTime();
    const numberTime = Number(currentTime.substring(11, 13));
    const timeVal = currentTime.substring(13, 19);
    timeControl[0].value = numberTime >= 10 ? `${numberTime}${timeVal}` : `0${numberTime}${timeVal}`;

    function toggleButton(show = true) {
        const { classList, style } = btnStartSim;
        
        if (show) {
            style.display = 'block';
            setTimeout(() => {
                classList.add('button-transition', 'visible-button');
                classList.remove('hidden-button');
            }, 10);
        } else {
            classList.add('button-transition', 'hidden-button');
            classList.remove('visible-button');
            setTimeout(() => style.display = 'none', 150);
        }
    }

    const DOM_CONFIG = {
        planningTitle: 'Планирование сеансов связи',
        noDataMessage: 'Данные не найдены',
        noSatellitesMessage: 'Нет доступных спутников'
    };

    const createToggle = (container, countEl, data, displayFn, label) => () => {
        const visible = container.style.display === 'block';
        container.style.display = visible ? 'none' : 'block';
        countEl.textContent = `${label} ${visible ? '▶' : '▼'}`;
        !visible && !container.children.length && displayFn(data, container);
    };

    // Функциии отображения спутников
    function displayGroupedBSSSatellites(response, containerId = 'response3') {
        const container = document.getElementById(containerId);
        const bssData = response.BSSs_satellites_data || [];
        
        container.innerHTML = bssData.length ? 
            `<br><div class="planning-title">${DOM_CONFIG.planningTitle}</div>` +
            bssData.map((bss, i) => `
                <div class="bss-container" data-bss="${i}">
                    <div class="bss-header">
                        <span>${bss.name}</span>
                        <span class="satellite-count">${bss.satellites_data?.length || 0} спутников ▶</span>
                    </div>
                    <div class="satellites-container"></div>
                </div>
            `).join('') : 
            `<br><div class="planning-title">${DOM_CONFIG.planningTitle}</div>
             <div style="color:orange;margin-top:15px">${DOM_CONFIG.noDataMessage}</div>`;
        
        bssData.forEach((bss, i) => {
            const bssCont = container.querySelector(`[data-bss="${i}"]`);
            const header = bssCont.querySelector('.bss-header');
            const satContainer = bssCont.querySelector('.satellites-container');
            const countEl = header.querySelector('.satellite-count');
            const satCount = bss.satellites_data?.length || 0;
            
            header.onclick = createToggle(satContainer, countEl, bss.satellites_data, 
                (data, cont) => displaySatellites(data, cont, i), `${satCount} спутников`);
        });
    }

    function displaySatellites(satellitesData, container, bssIndex) {
        if (!satellitesData?.length) {
            container.innerHTML = `<div class="no-data">${DOM_CONFIG.noSatellitesMessage}</div>`;
            return;
        }
        
        container.innerHTML = satellitesData.map((sat, i) => `
            <div class="satellite-item" data-sat="${i}">
                <div class="satellite-header">
                    <span>🛰️ ${sat.name}</span>
                    <span class="session-count">${sat.datetime_period?.length || 0} сеансов ▶</span>
                </div>
                <div class="sessions-container"></div>
            </div>
        `).join('');
        
        satellitesData.forEach((sat, i) => {
            const satCard = container.querySelector(`[data-sat="${i}"]`);
            const sessionsCont = satCard.querySelector('.sessions-container');
            const countEl = satCard.querySelector('.session-count');
            const sessCount = sat.datetime_period?.length || 0;
            
            satCard.onclick = (e) => {
                if (!['BUTTON', 'A'].includes(e.target.tagName)) {
                    e.stopPropagation();
                    createToggle(sessionsCont, countEl, sat.datetime_period, 
                        displaySessions, `${sessCount} сеансов`)();
                }
            };
        });
    }

    // Управление таймерами сеансов
    const timers = new Map();

    function displaySessions(periods, container) {
        timers.forEach(timer => clearInterval(timer));
        timers.clear();
        
        if (!periods?.length) {
            container.innerHTML = '<div class="no-sessions">Нет сеансов</div>';
            return;
        }
        
        const now = new Date();
        const renderId = Date.now();
        
        container.innerHTML = periods.map((period, index) => {
            const start = new Date(period.start_datetime_iso);
            const end = new Date(period.end_datetime_iso);
            const duration = period.duration_sec || Math.round((end - start) / 1000);
            const status = now < start ? ['Ожидается', '#3498db'] : 
                          now <= end ? ['В процессе', '#27ae60'] : 
                          ['Завершён', '#999'];
            
            return `
                <div class="session-item" data-session="${renderId}-${index}">
                    <div class="session-header">
                        <strong>Сеанс ${index + 1}</strong>
                        <span class="session-status" style="background:${status[1]}">${status[0]}</span>
                    </div>
                    <div id="timer-${renderId}-${index}" class="time-display"></div>
                    <div class="session-dates">
                        <div>
                            <small>Начало</small>
                            <div>${start.toLocaleDateString()}<br>${start.toLocaleTimeString()}</div>
                        </div>
                        <div>
                            <small>Окончание</small>
                            <div>${end.toLocaleDateString()}<br>${end.toLocaleTimeString()}</div>
                        </div>
                    </div>
                    <div class="session-duration">Длительность: ${formatTime(duration)}</div>
                </div>
            `;
        }).join('');
        
        periods.forEach((period, index) => {
            const sessionElement = container.querySelector(`[data-session="${renderId}-${index}"]`);
            const statusElement = sessionElement.querySelector('.session-status');
            
            startTimer(
                `timer-${renderId}-${index}`,
                new Date(period.start_datetime_iso),
                new Date(period.end_datetime_iso),
                period.duration_sec,
                statusElement
            );
        });
    }

    function startTimer(timerId, startTime, endTime, durationSeconds, statusElement) {
        const display = document.getElementById(timerId);
        if (!display) return;
        
        const duration = durationSeconds || Math.round((endTime - startTime) / 1000);
        
        const update = () => {
            const now = new Date();
            let text = 'Завершён', color = '#999';
            let status = 'Завершён', statusColor = '#999';
            
            if (now < startTime) {
                const secondsLeft = Math.floor((startTime - now) / 1000);
                text = `До начала: ${formatTime(secondsLeft)}`;
                color = '#3498db';
                status = 'Ожидается';
                statusColor = '#3498db';
            } else if (now <= endTime) {
                const secondsLeft = duration - Math.floor((now - startTime) / 1000);
                if (secondsLeft > 0) {
                    text = `Осталось: ${formatTime(secondsLeft)}`;
                    color = '#e74c3c';
                    status = 'В процессе';
                    statusColor = '#27ae60';
                } else {
                    status = 'Завершён';
                    statusColor = '#999';
                }
            }
            
            display.textContent = text;
            display.style.color = color;
            
            if (statusElement) {
                statusElement.textContent = status;
                statusElement.style.background = statusColor;
            }
            
            if (now > endTime) {
                clearInterval(timers.get(timerId));
            }
        };
        
        update();
        if (new Date() <= endTime) {
            timers.set(timerId, setInterval(update, 1000));
        }
    }

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        const parts = [];
        if (h > 0) parts.push(`${h}ч`);
        if (m > 0) parts.push(`${m}м`);
        if (s > 0 || parts.length === 0) parts.push(`${s}с`);
        return parts.join(' ');
    }

    btnStartSim.addEventListener('click', async () => { 
        toggleButton(false);
        
        const timeInputs = document.querySelectorAll('input[type="time"]');
        const dateInputs = document.querySelectorAll('input[type="date"]');
        const startDateTime = getDateTimes(dateInputs[0], timeInputs[0]);
        const endDateTime = getDateTimes(dateInputs[1], timeInputs[1]);
        
        if (endDateTime < startDateTime) {
            alert('Ошибка: время окончания не может быть раньше времени начала');
            toggleButton(true);
            return;
        }
        
        const data = {
            "params": {
                "start_datetime_iso": startDateTime.toISOString(),
                "end_datetime_iso": endDateTime.toISOString(),
                "dates_delta_in_sec": 15,
                "min_session_time_in_sec": 10,
                "acceptable_session_time_in_sec": 100
            },
            "BSSs": rss,
            "satellites_id": satIDs
        };
        
        console.log('📤 BSS данные:', data);
        createBeginningLog(new Date());
        
        try {
            const response = await calculateBSSsSatellitesAvailability(data);
            console.log('BSS запрос завершен:', response);
            displayGroupedBSSSatellites(response);
            setTimeout(() => createEndLog(new Date(), {}, response), 500);
        } catch (error) {
            console.error('Ошибка BSS запроса:', error);
        }
    });

    allDateInputs.forEach(input => {
        input.addEventListener('change', () => toggleButton(true));
    });

    window.addEventListener('beforeunload', () => {
        timers.forEach(timer => clearInterval(timer));
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



