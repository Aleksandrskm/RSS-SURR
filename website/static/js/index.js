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
            <div class="log-title">Начало работы</div>
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
function createEndLog(dateStartTime) {
  const gateway = document.querySelector('.information_request');
  gateway.insertAdjacentHTML('beforeend', `
        <div class="log-entry log-end-bss">
            <div class="log-title">Завершение работы</div>
            <div>Время: ${dateStartTime.toLocaleString()}</div>
        </div>
    `);
}
function getDateTime() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + day;
  }
  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }
  if (second.toString().length == 1) {
    second = '0' + second;
  }

  let dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  return dateTime;
}
function getDateTimes(dateControl, timeControl) {
  let dateControlYear = +dateControl.value.substring(0, 4);
  let dateControlMonth = +dateControl.value.substring(5, 7);
  let dateControlDay = +dateControl.value.substring(8, 10);
  let timeHouse = Number(`${timeControl.value[0]}${timeControl.value[1]}`);
  let timeMin = +(`${timeControl.value[3]}${timeControl.value[4]}`);
  let timeSec = +(`${timeControl.value[6]}${timeControl.value[7]}`);
  const dateTime = new Date(dateControlYear, dateControlMonth - 1, dateControlDay, timeHouse, timeMin, timeSec);
  return dateTime
}
function toggleButton(element, show = true) {
    const { classList, style } = element;
    classList.add('button-transition');
    
    if (show) {
        style.display = 'block';
        setTimeout(() => {
            classList.add('visible-button');
            classList.remove('hidden-button');
        }, 10);
    } else {
        classList.add('hidden-button');
        classList.remove('visible-button');
        setTimeout(() => style.display = 'none', 150);
    }
}
function formatDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('ru-RU');
}
function getStatusText(deistv) {
  return deistv === 1 ? 'Активен' : 'Неактивен';
}
/*async function getRssDatas() {
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
}*/
async function calculateRSSPlan(data) {
  try {
    const response = await fetch(`http://185.192.247.60:7130/сalculate_RSS_plan`, {
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
async function GETActiveRSSPlans(data) {
  try {
    const response = await fetch(`http://185.192.247.60:7130/active_rss_plans_data?id_rss_plan=${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
async function ActiveRSSPlans() {
  try {
    const response = await fetch('http://185.192.247.60:7130/active_rss_plans?ist=0', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayRSSPlans(data) {
  const container = document.getElementById('response3');
  container.innerHTML = '';
  const planNumber = data[0]?.ID_RSS_PLAN || 'Неизвестен';
  const tableHTML = `
        <div class="rss-plans-table-container">
            <h3>План РСС №${planNumber}</h3>
            <div class="table-wrapper">
                <table class="rss-plans-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Спутник</th>
                            <th>Время начала</th>
                            <th>Время окончания</th>
                            <th>РСС</th>
                            <th>Азимут</th>
                            <th>Угол места</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(RSS => `
                            <tr>
                                <td>${RSS.ID}</td>
                                <td>${RSS.ID_KA}</td>
                                <td>${formatDateTime(RSS.DATA_TIME_IN)}</td>
                                <td>${formatDateTime(RSS.DATA_TIME_OUT)}</td>
                                <td>${RSS.ID_RSS}</td>
                                <td>${RSS.AZIMUT.toFixed(2)}°</td>
                                <td>${RSS.UM.toFixed(2)}°</td>
                                <td class="${RSS.DEISTV}">${getStatusText(RSS.DEISTV)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
      `;
  container.insertAdjacentHTML('beforeend', tableHTML);
}
// example usage: realtime clock
setInterval(function () {
  let currentTime = getDateTime();
  document.getElementById("timer").innerHTML = currentTime;
}, 0);

const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];
let countSession = 0;
const satIDs = [];
const rss = []
btn.addEventListener("click", () => { modal.style.display = "flex" });
span.addEventListener("click", () => { modal.style.display = "none" });
if (document.querySelector('h2')) {
  if (document.querySelector('h2').innerHTML == `Планирование РСС`) {
    /*let tempRssData = ``;
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
    });*/

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

    btnStartSim.addEventListener('click', async () => {
      toggleButton(btnStartSim, false);

      const timeInputs = document.querySelectorAll('input[type="time"]');
      const dateInputs = document.querySelectorAll('input[type="date"]');
      const startDateTime = getDateTimes(dateInputs[0], timeInputs[0]);
      const endDateTime = getDateTimes(dateInputs[1], timeInputs[1]);

      if (endDateTime < startDateTime) {
        alert('Ошибка: время окончания не может быть раньше времени начала');
        toggleButton(btnStartSim, true);
        return;
      }

      const data = {
        "start_datetime_iso": startDateTime.toISOString(),
        "end_datetime_iso": endDateTime.toISOString(),
        "dates_delta_in_sec": 15,
        "min_session_time_in_sec": 10,
        "acceptable_session_time_in_sec": 100
      };

      console.log('RSS данные:', data);
      createBeginningLog(new Date());
      try {
        const idRSSPlan = await calculateRSSPlan(data);
        console.log('RSS запрос завершен:', idRSSPlan);
        const RSSPlan = await GETActiveRSSPlans(idRSSPlan);
        console.log('RSS Plan:', RSSPlan);
        if (Array.isArray(RSSPlan) && RSSPlan.length > 0) {
          displayRSSPlans(RSSPlan);
        } else {
          console.log('Нет данных для отображения');
          const container = document.getElementById('response3');
          container.innerHTML = '<p>Нет данных для отображения</p>';
        }
        setTimeout(() => createEndLog(new Date()), 500);
      } catch (error) {
        console.error('Ошибка RSS запроса:', error);
      } 
    });

    allDateInputs.forEach(input => {
      input.addEventListener('change', () => toggleButton(btnStartSim, true));
    });
  }
  if (document.querySelector('h2').innerHTML == `План работы антенных постов`) {
    const dateControl = document.querySelectorAll('input[type="date"]');
    const timeControl = document.querySelectorAll('input[type="time"]');
    const btnStartSim = document.getElementById('task-btn_sim');
    const allDateInputs = document.querySelectorAll('input[type="date"], input[type="time"]');
    const FirstInput = new Date();
    const SecondInput = new Date();
    const currentTime = getDateTime();
    const numberTime = Number(currentTime.substring(11, 13));
    const timeVal = currentTime.substring(13, 19);
    const TimeValue = numberTime >= 10 ? `${numberTime}${timeVal}` : `0${numberTime}${timeVal}`;
    FirstInput.setDate(FirstInput.getDate() - 2);
    SecondInput.setDate(SecondInput.getDate() + 2);
    dateControl[0].value = FirstInput.toISOString().slice(0, 10);
    dateControl[1].value = SecondInput.toISOString().slice(0, 10);
    timeControl[0].value = TimeValue;
    timeControl[1].value = TimeValue;

    function displayFilterRSSPlans(data) {
      const container = document.getElementById('response3');

      if (!data?.length) {
        container.innerHTML = '<p>Нет активных планов РСС для выбранного периода</p>';
        return;
      }

      container.innerHTML = `
        <div class="refresh-icon-container">
            <span class="refresh-table" title="Обновить таблицу">
                <img src="/static/img/re.png" alt="Обновить" class="re-date-flow">
            </span>
        </div>
        <div class="rss-plans-table-container">
            <h3>Активные планы РСС</h3>
            <div class="table-wrapper">
                <table class="rss-plans-table" id="plans-table">
                    <thead><tr>
                        <th>ID плана</th><th>Дата вызова</th><th>Начало периода</th>
                        <th>Окончание периода</th><th>Длительность</th><th>Статус</th>
                    </tr></thead>
                    <tbody>
                        ${data.map(item => `
                            <tr data-plan-id="${item.ID}" class="selectable-row">
                                <td>${item.ID}</td><td>${formatDateTime(item.DATA_VYZ)}</td>
                                <td>${formatDateTime(item.DATA_BEG)}</td><td>${formatDateTime(item.DATA_END)}</td>
                                <td>${item.TIME_PLAN} д</td>
                                <td class="status-${item.DEISTV}">${item.DEISTV === 1 ? 'Активен' : 'Неактивен'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="btn2" id="dynamic-action-button" style="display: none;">
            <button id="current-plan-btn">Получить выбранный план</button>
        </div>
    `;
      const actionButton = document.getElementById('dynamic-action-button');
      const currentPlanBtn = document.getElementById('current-plan-btn');
      window.isPlanLoaded = false;
      toggleButton(actionButton, false);

      document.querySelector('.refresh-table').addEventListener('click', async function (e) {
        this.classList.add('spin-animation');

        setTimeout(() => this.classList.remove('spin-animation'), 600);

        try {
          const timeInputs = document.querySelectorAll('input[type="time"]');
          const dateInputs = document.querySelectorAll('input[type="date"]');
          const startDateTime = getDateTimes(dateInputs[0], timeInputs[0]);
          const endDateTime = getDateTimes(dateInputs[1], timeInputs[1]);
          createBeginningLog(new Date());
          const idPlan = await ActiveRSSPlans();
          const FilterPlan = idPlan.plans.filter(plan => {
            const PlanStartTime = new Date(plan.DATA_BEG);
            const PlanEndTime = new Date(plan.DATA_END);
            return (PlanStartTime >= startDateTime && PlanStartTime <= endDateTime) ||
              (PlanEndTime >= startDateTime && PlanEndTime <= endDateTime) ||
              (PlanStartTime <= startDateTime && PlanEndTime >= endDateTime);
          });
          updatePlansTable(FilterPlan);

          setTimeout(() => createEndLog(new Date()), 500);
        } catch (error) {
          console.error('Ошибка при обновлении таблицы:', error);
          alert('Ошибка при обновлении таблицы');
        }
      });

      container.addEventListener('click', (e) => {
        const row = e.target.closest('.selectable-row');
        if (!row || window.isPlanLoaded) return;
        document.querySelectorAll('.selectable-row').forEach(r => r.classList.remove('selected-plan-row'));
        row.classList.add('selected-plan-row');
        window.selectedPlanId = row.dataset.planId;
        toggleButton(actionButton, true);
      });
      currentPlanBtn.addEventListener('click', async () => {
        if (!window.selectedPlanId) {
          alert('Выберите план из таблицы');
          return;
        }

        toggleButton(actionButton, false);

        try {
          createBeginningLog(new Date());
          const result = await GETActiveRSSPlans(window.selectedPlanId);

          if (result?.length) {
            toggleButton(actionButton, false);
            window.isPlanLoaded = true;
            const planNumber = result[0]?.ID_RSS_PLAN || 'Неизвестен';
            const secondTableHTML = `
                    <div class="second-table-container" style="margin-top: 20px;">
                        <div class="rss-plans-table-container" style="border-top: 2px solid #888;">
                            <h3>План РСС №${planNumber}</h3>
                            <div class="table-wrapper">
                                <table class="rss-plans-table">
                                    <thead><tr>
                                        <th>ID</th>
                                        <th>Спутник</th>
                                        <th>Время начала</th>
                                        <th>Время окончания</th>
                                        <th>РСС</th>
                                        <th>Азимут</th>
                                        <th>Угол места</th>
                                        <th>Статус</th>
                                    </tr></thead>
                                    <tbody>
                                        ${result.map(RSS => `
                                            <tr>
                                                <td>${RSS.ID}</td>
                                                <td>${RSS.ID_KA}</td>
                                                <td>${formatDateTime(RSS.DATA_TIME_IN)}</td>
                                                <td>${formatDateTime(RSS.DATA_TIME_OUT)}</td>
                                                <td>${RSS.ID_RSS}</td>
                                                <td>${RSS.AZIMUT?.toFixed(2) || '0'}°</td>
                                                <td>${RSS.UM?.toFixed(2) || '0'}°</td>
                                                <td class="${RSS.DEISTV}">${getStatusText(RSS.DEISTV)}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="btn2" style="margin-top: 15px;">
                            <button id="clear-table-btn">Очистить</button>
                        </div>
                    </div>`;

            document.querySelector('.rss-plans-table-container').insertAdjacentHTML('afterend', secondTableHTML);
            document.querySelectorAll('.selectable-row').forEach(r => {
              if (!r.classList.contains('selected-plan-row')) {
                r.style.cssText = 'cursor: not-allowed; opacity: 0.7;';
              }
            });
            document.getElementById('clear-table-btn').addEventListener('click', () => {
              document.querySelector('.second-table-container')?.remove();
              window.isPlanLoaded = false;
              document.querySelectorAll('.selectable-row').forEach(r => {
                r.style.cssText = 'cursor: pointer; opacity: 1;';
              });
              if (window.selectedPlanId) toggleButton(actionButton, true);
            });
          } else {
            alert('Не удалось получить данные плана');
            toggleButton(actionButton, true);
          }
        } catch (error) {
          console.error('Ошибка сети:', error);
          alert('Ошибка соединения с сервером');
        } finally {
          setTimeout(() => createEndLog(new Date()), 500);
        }
      });
    }

    function updatePlansTable(data) {
      const tableBody = document.querySelector('#plans-table tbody');

      if (!tableBody) return;

      tableBody.innerHTML = data.map(item => `
        <tr data-plan-id="${item.ID}" class="selectable-row">
            <td>${item.ID}</td><td>${formatDateTime(item.DATA_VYZ)}</td>
            <td>${formatDateTime(item.DATA_BEG)}</td><td>${formatDateTime(item.DATA_END)}</td>
            <td>${item.TIME_PLAN} д</td>
            <td class="status-${item.DEISTV}">${item.DEISTV === 1 ? 'Активен' : 'Неактивен'}</td>
        </tr>
    `).join('');
      window.selectedPlanId = null;
      window.isPlanLoaded = false;
      const actionButton = document.getElementById('dynamic-action-button');
      actionButton && toggleButton(actionButton, false);
      document.querySelector('.second-table-container')?.remove();
      document.querySelectorAll('.selectable-row').forEach(r => {
        r.style.cssText = 'cursor: pointer; opacity: 1;';
      });
    }

    btnStartSim.addEventListener('click', async () => {
      toggleButton(btnStartSim, false);
      const timeInputs = document.querySelectorAll('input[type="time"]');
      const dateInputs = document.querySelectorAll('input[type="date"]');
      const startDateTime = getDateTimes(dateInputs[0], timeInputs[0]);
      const endDateTime = getDateTimes(dateInputs[1], timeInputs[1]);

      if (endDateTime < startDateTime) {
        alert('Ошибка: время окончания не может быть раньше времени начала');
        toggleButton(btnStartSim, true);
        return;
      }

      createBeginningLog(new Date());

      try {
        const idPlan = await ActiveRSSPlans();
        const FilterPlan = idPlan.plans.filter(plan => {
          const PlanStartTime = new Date(plan.DATA_BEG);
          const PlanEndTime = new Date(plan.DATA_END);
          return (PlanStartTime >= startDateTime && PlanStartTime <= endDateTime) ||
            (PlanEndTime >= startDateTime && PlanEndTime <= endDateTime) ||
            (PlanStartTime <= startDateTime && PlanEndTime >= endDateTime);
        });
        displayFilterRSSPlans(FilterPlan);
        setTimeout(() => createEndLog(new Date()), 500);
      } catch (error) {
        console.error('Ошибка запроса:', error);
      }
    });

    allDateInputs.forEach(input => {
      input.addEventListener('change', () => toggleButton(btnStartSim, true));
    });
  }

  if (document.querySelector('h2').innerHTML == `Передача состояния антенных постов РСС`) {
    const dataAntennasPosts = document.querySelector('.antennas-posts');
    getAllAntenas()
      .then(antennas => {
        dataAntennasPosts.innerHTML = `<div class="RSS">Антенные посты</div>`
        antennas.forEach(antennaData => {
          let antenna = document.createElement('div');
          let { ID, ID_RSS, NUM, NAIM, AZIMUT, UM, ID_ISPR, DATA_BEG, DATA_END } = antennaData;

          antenna.classList.add('antennas-post');
          antenna.innerHTML = `
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
        const antPosts = document.querySelectorAll('.antennas-post');
        antPosts.forEach(post => {
          post.addEventListener('click', () => {
            const fields = [];
            const datasAnt = [];
            const postsChildren = post.children;
            [].forEach.call(postsChildren, (chield) => {

              if (chield.classList.contains('field')) {
                fields.push(chield.innerHTML);
              }
              if (chield.classList.contains('data-ant')) {
                datasAnt.push(chield.innerHTML);
              }


            })
            const modalEdit = document.getElementById("myEdit");
            modalEdit.innerHTML = ` <div class="modal-content-edit">
        <h4 class="modal-header-edit">Редактирование антенного поста</h4>
        
        <div class="btns-edit">
            
            <button class="close-edit">Закрыть</button>
            <button class="edit-btn">Редактировать</button>
        </div>
    </div>`;
            const closeEditModal = document.querySelector('.close-edit');
            const modalHeaderEdit = document.querySelector('.modal-header-edit');
            closeEditModal.addEventListener('click', () => { modalEdit.style.display = "none"; })

            modalEdit.style.display = "flex";


            console.log(fields[0]);
            console.log(datasAnt);

            for (let i = fields.length - 1; i >= 0; i--) {
              const modalRowEdit = document.createElement('div');
              modalRowEdit.classList.add('modal_row-edit');
              const field = document.createElement('span');
              const data = document.createElement('input');
              data.type = 'text';
              data.value = datasAnt[i];
              field.innerText = fields[i];
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
  select.addEventListener('change', function () {
    number[lastIndex].classList.remove("hide");
    number[lastIndex].classList.remove("show");
    
    let index = select.selectedIndex;
    if (!index) {
      number[lastIndex].classList.remove("hide");
      number[lastIndex].classList.remove("show");
    }
    else {
      number[index].classList.add("show"); // Показать блок с соответствующим индексом
      number[index].classList.remove("hide");
    }


    lastIndex = index;
  });
}



