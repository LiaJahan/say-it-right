const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class='btn'>${el}</span>`);
    return htmlElements.join(' ');
};

// pronunciation
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// working on spinner/loading data
const manageSpinner = (status)=>
{
    if(status == true)
    {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else
    {
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add ('hidden');
    }
}

// is the file I will fetch data from another file and show it in my website!! yippi

const fetchFile = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => (res.json()))

        //  .then(json => console.log(json.data))
        .then(json => loadFile(json.data))
};

const removeActive = () => {
    const lessonBtnRemoveActive = document.querySelectorAll('.lesson-btn-remove-active');
    lessonBtnRemoveActive.forEach(btn => btn.classList.remove('active'));
};

// modal sending

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    loadWordDetails2(details.data);
}

const loadWordDetails2 = (value) => {
    const detailsCardsModal = document.getElementById('details_cards_modal');
    detailsCardsModal.innerHTML = ` 
                <h1 class="text-2xl font-bold mb-3">${value.word} (<i class="fa-solid fa-microphone-lines"></i> : ${value.pronunciation})</h1>
                <p class="text-lg font-semibold">Meaning</p>
                <p class="text-base font-medium font-bangla mb-3">${value.meaning}</p>
                <p class="text-lg font-semibold">Example</p>
                <p class="text-base font-medium mb-3">${value.sentence}</p>
                <p class="text-lg font-medium font-bangla">সমার্থক শব্দ</p>
                <div>
                    <h2 class="text-lg font-semibold">Synonym</h2>
                    <div class = ''>${createElements(value.synonyms)}</div>
                </div>
                <div class="modal-action">
                  <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary">Complete Learning</button>
                  </form>
                </div>
                
    `
    document.getElementById('my_modal_5').showModal();
}

const loadFile = (lessons) => {

    const divContainer = document.getElementById('div-container');
    divContainer.innerHTML = '';

    for (let lesson of lessons) {
        console.log(lesson);
        const lessonButton = document.createElement('div');
        lessonButton.innerHTML =
            `
            <button onclick='loadLevelWord(${lesson.level_no})' id='lesson-btn-${lesson.level_no}' class="btn btn-outline btn-primary lesson-btn-remove-active"><i
                                class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
            `
        divContainer.appendChild(lessonButton)
    }

    // console.log(lessons)

};

// if lessson button is clicked it will show the wordlists
const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(json => {
            removeActive();
            const clickbtn2 = document.getElementById(`lesson-btn-${id}`)
            clickbtn2.classList.add('active');
            displayWords(json.data)
        }
        )
}

// if you click a button you will see all the words
const displayWords = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div class="font-bangla col-span-full text-center space-y-5">
                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                <p class="font-normal text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-medium text-3xl">নেক্সট Lesson এ যান</h2>
            </div>

            `;
        manageSpinner(false)
        return;
    }
    words.forEach(word => {
        // dynamic word box
        const wordBox = document.createElement('div');
        wordBox.innerHTML =
            `
            
             <div class="text-center rounded-md shadow-lg bg-white p-10 space-y-5">
                <h1 class="text-3xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h1>
                
                <p class="font-medium text-lg">Meaning /Pronounciation</p>
                
                <p class="font-bangla font-semibold text-2xl">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'উচ্চারণ পাওয়া যায়নি'}" </p>
                
                <div class="flex items-center justify-between">
                    <button onclick="loadWordDetails(${word.id})" class="bg-blue-100 hover:bg-blue-200 rounded-md p-2"><i class="fa-solid fa-circle-info"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="bg-blue-100 hover:bg-blue-200 rounded-md p-2"><i class="fa-solid fa-volume-high"></i></button>
                </div>
             </div>
            `
        wordContainer.append(wordBox);
    })
    manageSpinner(false)

}

// search a specific value "working with search button"
document.getElementById('search-button').addEventListener('click', () => {
    removeActive();
  const searchInput = document.getElementById('search-value');
  const searchValue = searchInput.value.trim().toLowerCase();

  fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res => res.json())
    .then(json => {
      const allWords = json.data;
      const filterWords = allWords.filter(word =>
        word.word.toLowerCase().includes(searchValue)
      );
      displayWords(filterWords);
    });
});


fetchFile();