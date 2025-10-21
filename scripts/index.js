// is the file I will fetch data from another file and show it in my website!! yippi

const fetchFile = () => 
{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => (res.json()))

    //  .then(json => console.log(json.data))
    .then(json => loadFile(json.data)) 
};

fetchFile();
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
            <button class="btn btn-outline btn-primary"><i
                                class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
            `
            divContainer.appendChild(lessonButton)
        }

        // console.log(lessons)
    
    };
