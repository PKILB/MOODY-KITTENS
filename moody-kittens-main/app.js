let kittens = []

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()

  let form = event.target
  let kittenName = form.kittenName.value
  let currentKitten = {}

  currentKitten = kittens.find(kitten => kitten.name == kittenName)

    if(!currentKitten){
      let newKitten = {
       id: generateId(),
       name: form.kittenName.value,
       image: `https://robohash.org/${form.kittenName.value}?set=set4`,
       mood: "meh",
       affection: 5,
      }
    kittens.push(newKitten)
    saveKittens()
    } else {
      window.alert("Only a complete GOOFBALL would give the same name to more than one kitty..... Are YOU a goofball?")
    }

  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  console.log(kittensData)
  if (kittensData) {
    kittens = kittensData
  }
  if(!document.getElementById("welcome")) {
    drawKittens()
  } 
  else {
    // clearKittens()
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = ""
  if (kittens.length > 0) {
  kittens.forEach(kitten=> {
    let hideButtons = ""
    let outtaHereButtons = ""
      if (kitten.mood == "outta here") {
        hideButtons = "hidden"
        outtaHereButtons = 
        `
        <p>
          <p class="text-light">You were a jerk to your kitty cat. </p>
          <button class="btn-cancel" onclick="deleteKitten ('${kitten.id}')"> Delete </button>
          </p>
        `
      }
    template += `
      <div class="card p-2 text-center bg-dark m-1">
        <div class="card p-2 text-center bg-dark kitten ${kitten.mood}">
          <img class="kitten" src=${kitten.image} height="100" width="100" alt="Moody Kitten">
        </div>
        <div class="mt-1 text-light">
          <div class="d-flex justify-content-center word"> Name: ${kitten.name}</div>
          <div class="d-flex justify-content-center word"> Mood: ${kitten.mood}</div>
          <div class="d-flex justify-content-center word"> Affection: ${kitten.affection}</div>
        </div>
        <div id="kitten-buttons" class="${hideButtons}">
    
          <button onClick="pet('${kitten.id}')">Pet</button>
          <button onClick="catnip('${kitten.id}')">Catnip</button>
          </div>
          ${outtaHereButtons}
      </div>
    `
    document.getElementById("kittens").innerHTML=template
  })
}else {document.getElementById("kittens").innerHTML=template}

}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id)
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let petRandom = Math.random()
  let chosenKitten = findKittenById(id)
  if (petRandom > .5) {
    chosenKitten.affection += 1
  }
  else {
    chosenKitten.affection -= 1
  } 
  setKittenMood(chosenKitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let chosenKitten = findKittenById(id)
  chosenKitten.mood = "tolerant"
  chosenKitten.affection = 5
  setKittenMood(chosenKitten)
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if (kitten.affection < 1){
    kitten.mood = "outta here"
  }
  else if (kitten.affection <= 3){
    kitten.mood = "spiteful"
  }
  else if (kitten.affection <= 5){
    kitten.mood = "tolerant"
  }
  else if (kitten.affection >= 6){
    kitten.mood = "lovey-dovey"
  }
  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = []
  saveKittens()
  kittens.slice(0, kittens.length)
}

function deleteKitten(id) {
  let kitten = kittens.indexOf(findKittenById(id))
  kittens.splice(kitten, 1)
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
  loadKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
