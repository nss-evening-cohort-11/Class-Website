// initialize the tool-tip plugin for Bootstrap4
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


$.ajax({
  url: "data/cohort.json"
}).done(cohortMembers)
  .fail(function (error) {
    console.log("error", error);
  });

const hoverEvent = (cardId) => {
  $(`#${cardId}.cohortMems`).hover(() => {
    $(`#${cardId} .proImg`).toggle();
    $(`#${cardId} .funImg`).toggle();
  });
};

function cohortMembers(list) {
  let data = list.cohort.sort((a,b) => (a.firstName > b.firstName) ? 1 : -1);
  data.forEach(function (item) {
    let studentContact = `<div class="studentContact">`
    //if student doesn't have a portfolio site then don't display the icon
    if (item.portfolio != null) {

      studentContact += `<a href=${item.portfolio} target="_blank">
      <i class="fas fa-globe fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a github site then don't display the icon
    if (item.github != null) {

      studentContact += `<a href=${item.github} target="_blank">
      <i class="fab fa-github fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have a linkedin site then don't display the icon
    if (item.linkedIn != null) {

      studentContact += `<a href=${item.linkedIn} target="_blank">
      <i class="fab fa-linkedin fa-2x contactIcons"></i>
      </a>`
    }
    //if student doesn't have an email then don't display the icon
    if (item.email != null) {

      studentContact += `<a href=mailto:${item.email}>
              <i class="fas fa-envelope fa-2x contactIcons"></i>
            </a>`
    }
    studentContact += `</div>`

    let studentInfo = `<div id="dev-${item.id}" class="card col-md-3 cohortMems">
                          <img src=${item.proImg} alt="${item.firstName} ${item.lastName}" class="card-img-top proImg">
                          <img src=${item.funImg} alt="Fun photo of ${item.firstName} ${item.lastName}" class="card-img-top funImg">  
                          <div class="card-body">
                            <h4 class="card-title title-font">${item.firstName} ${item.lastName}</h4>`
                            //if student didn't provide a reelthemin quote then nothing is displayed
                            if (item.reelThemIn != null) {
                              studentInfo += `<p class="card-text">${item.reelThemIn}</p>`
                            }
                            studentInfo += studentContact
                            {
                              studentInfo += `
                          </div>
                        </div>`
                            }  
    document.getElementById("cohort").innerHTML += studentInfo;
    for (let i = 0; i < data.length; i += 1) {
      hoverEvent(`dev-${data[i].id}`);
      console.error('dev id', `${data[i].id}`);
    }

  });
};


$.ajax({
  url: "data/techs.json"
}).done(techs)
  .fail(function (error) {
    console.log("error", error);
  });

function techs(list) {
  let data = list.techs;
  data.forEach(function (item) {
    document.getElementById("techs").innerHTML +=
      `<div class="col-sm-2 technologies">
         <center><a href="${item.link}" target="_blank"><img class="techs" src="images/techs/${item.image}" alt="${item.name}" data-toggle="tooltip" data-placement="top" title="${item.name}"></a><br>
         </center>
      </div>`;
  });
};
