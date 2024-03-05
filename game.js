wordcontainer = ["programming", "training", "trying", "gaming"];
wronglettercontainer = document.getElementById("wrongletter");
showup = document.getElementsByClassName("noti")[0];
figurepart = document.getElementsByClassName("figure-part");
absdiv = document.getElementsByClassName("abs-div")[0];
showlost = document.getElementsByClassName("showlost")[0];
lostwintext = document.getElementsByClassName("lostwintext")[0];
playagain = document.getElementById("playagain");

truelettercontainer = document.getElementById("trueletter");
wrong = document.getElementById("wrong");

wrong.style.display = "none";
index = 0;
playable = true;
selectedword = wordcontainer[Math.floor(Math.random() * wordcontainer.length)];

wrongletter = [];
trueletter = [];

update_wrongletter = () => {
  index++;
  wronglettercontainer.innerHTML = wrongletter.map((e) => `<span>${e}</span>`);
  if (wrongletter.length > 0) {
    wrong.classList.add("d-block");
  } else {
    wrong.classList.remove("d-block");
  }
};

display_letter = () => {
  truelettercontainer.innerHTML = `${selectedword
    .split("")
    .map((e) => `<p id="letter">${trueletter.includes(e) ? e : ""}</p>`)
    .join("")}`;
};

showup_fun = () => {
  showup.classList.add("showup");
  setTimeout(() => {
    showup.classList.remove("showup");
  }, 2000);
};

show_lost = () => {
  showlost.classList.toggle("dblock");
  absdiv.classList.toggle("dblock");
};

reset = () => {
  index = -1;
  for (let i = 0; i < figurepart.length; i++) {
    figurepart[i].style.display = "none";
  }
  wrongletter.splice(0);
  trueletter.splice(0);
  selectedword =
    wordcontainer[Math.floor(Math.random() * wordcontainer.length)];
  display_letter();
  update_wrongletter();
};
if (playable) {
  window.addEventListener("keydown", (e) => {
    const key = e.key.toLocaleLowerCase();
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      if (selectedword.includes(key)) {
        if (!trueletter.includes(key)) {
          trueletter.push(key);
          display_letter();
        } else {
          showup_fun();
        }
      } else {
        if (wrongletter.includes(key)) {
          showup_fun();
        } else {
          wrongletter.push(key);
          figurepart[index].style.display = "block";
        }
        update_wrongletter();
      }
    }
    if (index == 6) {
      playable = false;
      show_lost();
      lostwintext.innerText = "Unfortunately you lost. 😕";
    }
    if (selectedword == truelettercontainer.textContent) {
      lostwintext.innerText = "Congratulations! You won! 😃";
      show_lost();
    }
  });
}

playagain.addEventListener("click", () => {
  show_lost();
  playable = true;
  reset();
});

display_letter();
