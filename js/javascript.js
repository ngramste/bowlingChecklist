let cookie_name = "states-checklist";
let numCols = 5;

let data = {
  "group": [
    {
      "name": "Game 1",
      "score": 0,
      "plates": [
        {
          "name": "1",
          "buttonState": "off"
        },
        {
          "name": "2",
          "buttonState": "off"
        },
        {
          "name": "3",
          "buttonState": "off"
        },
        {
          "name": "4",
          "buttonState": "off"
        },
        {
          "name": "5",
          "buttonState": "off"
        },
        {
          "name": "6",
          "buttonState": "off"
        },
        {
          "name": "7",
          "buttonState": "off"
        },
        {
          "name": "8",
          "buttonState": "off"
        },
        {
          "name": "9",
          "buttonState": "off"
        },
        {
          "name": "-",
          "buttonState": "off"
        },
        {
          "name": "X",
          "buttonState": "off"
        },
        {
          "name": "/",
          "buttonState": "off"
        },
        {
          "name": "O",
          "buttonState": "off"
        }
      ]
    },
    {
      "name": "Game 2",
      "score": 0,
      "plates": [
        {
          "name": "1",
          "buttonState": "off"
        },
        {
          "name": "2",
          "buttonState": "off"
        },
        {
          "name": "3",
          "buttonState": "off"
        },
        {
          "name": "4",
          "buttonState": "off"
        },
        {
          "name": "5",
          "buttonState": "off"
        },
        {
          "name": "6",
          "buttonState": "off"
        },
        {
          "name": "7",
          "buttonState": "off"
        },
        {
          "name": "8",
          "buttonState": "off"
        },
        {
          "name": "9",
          "buttonState": "off"
        },
        {
          "name": "-",
          "buttonState": "off"
        },
        {
          "name": "X",
          "buttonState": "off"
        },
        {
          "name": "/",
          "buttonState": "off"
        },
        {
          "name": "O",
          "buttonState": "off"
        }
      ]
    }
  ]
};

function getCookie(cname) {
  try {
    return JSON.parse(localStorage.getItem(cname));
  }
  catch {
    return '';
  }
}

function setCookie(cname, cvalue, exdays) {
  localStorage.setItem(cname, JSON.stringify(cvalue));
}

function deleteCookie(cname) {
  localStorage.setItem(cname, '');
}

function updateScore() {
  let cookie = getCookie(cookie_name);

  cookie.group.forEach(group => {
    group.score = 0;
    group.plates.forEach(plate => {
      group.score += (plate.buttonState == "on");
    });
  });

  setCookie(cookie_name, cookie, 1000);
}

function sortGroups() {
  data.group.forEach(group => {
    group.plates.filter(plate => plate.buttonState == 'off').concat(group.plates.filter(plate => plate.buttonState == 'on'));
  });
}

function getPlate(group, plate) {
  return getCookie(cookie_name).group.filter(obj => obj.name === group)[0].plates.filter(obj => obj.name === plate);
}

function clickTile(group, plate) {
  let id = group + ":" + plate;
  let cookie = getCookie(cookie_name);

  if (getPlate(group, plate)[0].buttonState == "on") {
    document.getElementById(id).setAttribute("class", "card off");
    cookie.group.filter(obj => obj.name === group)[0].plates.filter(obj => obj.name === plate)[0].buttonState = "off";
  }
  else {
    document.getElementById(id).setAttribute("class", "card on");
    cookie.group.filter(obj => obj.name === group)[0].plates.filter(obj => obj.name === plate)[0].buttonState = "on";
  }

  setCookie(cookie_name, cookie, 1000);
  displayBoard();
}

function newBoard() {
  if (window.confirm("Are you sure you want a new board?")) {
    deleteCookie(cookie_name);
    location.reload();
  }
}

function displayBoard() {
  let html = "";

  updateScore();
  let cookie = getCookie(cookie_name);

  cookie.group.forEach(group => {
    html += "<div class='group'>";
    html +=   "<div class='progress'>";
    html +=     "<div class='name'>" + group.name + "</div>";
    html +=     "<div class='hr'></div>";
    html +=     "<div class='score'>" + group.score + "/" + (group.plates.length - (group.plates[0].name === '+')) + "</div>";
    html +=   "</div>";

    html +=   "<div class='plates'>";

    group.plates.forEach(plate => {
      let id = group.name + ":" + plate.name;
      if (plate.name === '+') {
        html += "<div id='" + id + "' class='card " + plate.buttonState + "' onclick=\"addCustom()\">" + plate.name + "</div>";
      }
      else {
        html += "<div id='" + id + "' class='card " + plate.buttonState + "' onclick=\"clickTile('" + group.name + "','" + plate.name + "')\">" + plate.name + "</div>";
      }
    });

    html +=   "</div>";

    html += "</div>";
  });

  document.getElementById('board').innerHTML = html;

}

function addCustom() {
  let custom = prompt("Add Custom Plate", "");
  if (custom != null) {
    let cookie = getCookie(cookie_name);
    cookie.group[cookie.group.length - 1].plates.push(
      {
        "name": custom,
        "buttonState": "on"
      });

    setCookie(cookie_name, cookie, 1000);
    onLoad();
  }
}

function onLoad() {
  let board = getCookie(cookie_name);
  if (board != undefined && board != '') {
    data = board;
    // numCols = 3;
  }

  setCookie(cookie_name, data, 1000);
  displayBoard();
}

document.addEventListener("DOMContentLoaded", function () {
  onLoad();
});