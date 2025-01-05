let output = '';
const myLibrary = [];
const container = document.getElementById('container');
const addBtn = document.getElementById('addBtn');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const bookList = document.querySelector('#bookList');
const submit = document.getElementById('newBookBtn');


submit.addEventListener('click', addBook);
submit.addEventListener('keypress', e => {
    
    if(e.key === 'Enter'){
        addBook();
    }
});

const search = document.getElementById('search');
search.addEventListener('keyup', e => {
    const searchInputValue = e.target.value.toLowerCase();
    const lis = document.getElementsByTagName('li');
    let hasMatch = false;
    Array.from(lis).forEach(li =>{
        const divContainer = li.firstElementChild;
        const titleDiv = divContainer.firstElementChild.textContent;

        if(search.value === ''){
            li.style.display = 'block';
        }

        if(titleDiv.toLowerCase().includes(searchInputValue)){
            li.style.display = 'block';
            hasMatch = true;
        }else{
            li.style.display = 'none';
        }
        

        // if(titleDiv.toLocaleLowerCase().indexOf(searchInputValue)!= -1){
        //     li.style.display = 'block';
        //     hasMatch = true;
        // }else{
        //     li.style.display = 'none';
        // }
        
        // if(!hasMatch){
        //     Array.from(lis).forEach(li => {
        //         li.style.display = 'block';
        //     })
            
        // }

        

    })
})

function addBook(){
    
    const bookTitleInput = document.querySelector('#titleInput');
    const bookAuthorInput = document.querySelector('#authorInput');
    const bookPagesInput = document.querySelector('#pagesInput');
    
    const bookTitle = bookTitleInput.value;
    const bookAuthor = bookAuthorInput.value;
    const bookPages = bookPagesInput.value;
    
 if(bookTitle && bookAuthor && bookPages){
        const li = document.createElement('li');
        const div = document.createElement('div');
        const innerDiv = document.createElement('div');
        const button = document.createElement('button');
        let index = 4;
       
        div.className = 'bookHolder';
        innerDiv.className = 'title'
        button.id = 'delete';
        button.setAttribute('data-index',index++);

        innerDiv.textContent = bookTitle; 
        button.textContent = 'delete';

        div.appendChild(innerDiv);
        div.appendChild(button);
        li.appendChild(div);
        bookList.appendChild(li);

        closeModal(modal);

        const newBook = new Book(bookTitle,bookAuthor,bookPages);
        addBookToLibrary(newBook);

        bookTitleInput.value = '';
        bookAuthorInput.value = '';
        bookPagesInput.value = '';
        
    }

    

}

        

bookList.addEventListener('click', e => {
    const indexToDelete = e.target.dataset.index;

    if(e.target.id == 'delete'){
        
        const li = e.target.closest('li')
        bookList.removeChild(li); 
        
       
    }

    (function splicer(index){

        myLibrary.splice(index,1);

     })(indexToDelete);
});    

addBtn.addEventListener('click', function(){
    openModal(modal)
})

closeBtn.addEventListener('click', function(){
    closeModal(modal)
})

function openModal(modal){
    modal.classList.add('active');
    overlay.classList.add('active'); 
}

function closeModal(modal){
    modal.classList.remove('active');
    overlay.classList.remove('active');
}



function Book(title,author,pages) {

    this.title = title;
    this.author = author;
    this.pages = pages;

    this.print = function(){
        return this.title + this.author + this.pages;
    }

}

const book1 = new Book('The Patience ','By O.O.Cyprian ','108pages');
const book2 = new Book('Love is Magical ','By O.O.Chisom ','345pages');
const book3 = new Book('The Journey ','By A.J.Smith ','220pages');
const book4 = new Book('Endurance ','By O.J.Smith ','120pages');



function addBookToLibrary(...books) {
    myLibrary.push(...books);
}

addBookToLibrary(book1,book2,book3,book4);





// function display(){
//     for(let i = 0; i<myLibrary.length; i++){

//         output += myLibrary[i].print() + "<br>";
        
//     }

//     container.innerHTML = output;
// }

// display();


 