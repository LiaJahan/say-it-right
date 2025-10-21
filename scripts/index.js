// is the file I will fetch data from another file and show it in my website!! yippi

const fetchFile = () => 
{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => (res.json()))

    //  .then(json => console.log(json.data))
    .then(json => loadFile(json.data)) 
};

const removeActive = () => {
  const lessonBtnRemoveActive = document.querySelectorAll('.lesson-btn-remove-active');
  lessonBtnRemoveActive.forEach(btn => btn.classList.remove('active'));
};


const loadFile = (lessons) => 
    
    {

        const divContainer = document.getElementById('div-container');
        divContainer.innerHTML = '';

        for(let lesson of lessons)
        {
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
    const loadLevelWord=(id)=>
    {
        const url = `https://openapi.programming-hero.com/api/level/${id}`;
        fetch(url)
        .then(res=>res.json())
        .then(json=>
            {
                removeActive();
                const clickbtn2 = document.getElementById(`lesson-btn-${id}`)
                clickbtn2.classList.add('active');
                displayWords(json.data)
            }
        )
    }

    const displayWords = (words)=>{
        const wordContainer = document.getElementById('word-container');
        wordContainer.innerHTML = '';

        if(words.length == 0)
        {
            wordContainer.innerHTML = `
            <div class="font-bangla col-span-full text-center space-y-5">
                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                <p class="font-normal text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-medium text-3xl">নেক্সট Lesson এ যান</h2>
            </div>

            `;
            return;
        }
        words.forEach(word=>
        {
            // dynamic word box
            const wordBox = document.createElement('div');
            wordBox.innerHTML=
            `
            
             <div class="text-center rounded-md shadow-lg bg-white p-10 space-y-5">
                <h1 class="text-3xl font-bold">${word.word ? word.word:'শব্দ পাওয়া যায়নি'}</h1>
                
                <p class="font-medium text-lg">Meaning /Pronounciation</p>
                
                <p class="font-bangla font-semibold text-2xl">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'উচ্চারণ পাওয়া যায়নি' }" </p>
                
                <div class="flex items-center justify-between">
                    <button onclick="my_modal_5.showModal()" class="bg-blue-100 hover:bg-blue-200 rounded-md p-2"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="bg-blue-100 hover:bg-blue-200 rounded-md p-2"><i class="fa-solid fa-volume-high"></i></button>
                </div>
             </div>
            `
            wordContainer.append(wordBox);
        })
        
    }

fetchFile();