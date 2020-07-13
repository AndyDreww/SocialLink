const links = [];

function Link(title, site, author) {
    this.title = title,
    this.site = site,
    this.author = author
}

links.push(new Link('Hacker News', 'https://news.ycombinator.com', 'Baptiste'));
links.push(new Link('Reddit', 'http://reddit.com', 'Thomas'));
links.push(new Link('Boing Boing', 'https://boingboing.net', 'Daniel'));



const submitElement = document.getElementById('submit');
const addLinkElement = document.getElementById('form-container');
const addElement = document.getElementById('add');
const linkListElement = document.getElementById('list');


submitElement.addEventListener('click', () => {
    //toggles the add link form when you click the button in the header
    addLinkElement.classList.toggle('hidden');
})

addElement.addEventListener('click', e => {
    //when you click button on form gets all the inputs. 
    e.preventDefault();
    const nameInputElement = document.getElementById('name');
    const titleInputElement = document.getElementById('title');
    const siteInputElement = document.getElementById('site');

    //uses the inputs as argument for the checkInputs function
    checkInputs(nameInputElement, titleInputElement, siteInputElement)        
})

function checkInputs(name, title, URL) {
    //creates a warning box for incorrect inputs
    const warningDiv = document.getElementById('warning')
    const warningElement = document.createElement('h2');

    //gets the values from the inputs
    //trims the value - stops user from just entering a space
    name = name.value.trim();
    title = title.value.trim();
    URL = URL.value.trim();

    //checks the values - if they're empty then a warning will appear
    if (name == '') {
        warningElement.textContent = 'Name input is empty';
        warningDiv.classList.add('warning-active');
    } else if(title == '') {
        warningElement.textContent = 'Title input is empty';
        warningDiv.classList.add('warning-active');
    } else if(URL === '') {
        warningElement.textContent = 'URL input is empty';
        warningDiv.classList.add('warning-active');       
    //extra checks for the url value, only .com, .co.uk or .net work
    } else if (!(URL.endsWith('.com') || URL.endsWith('.co.uk') || URL.endsWith('.net'))) {
        warningElement.textContent = 'URL is not valid!';
        warningDiv.classList.add('warning-active');
    //if all values are valid then run the else -- which will create a new object
    } else {
        warningDiv.classList.remove('warning-active');
        addLinkElement.classList.toggle('hidden');
        //removes the hidden class from the success div
        const success = document.getElementById('success');
        success.classList.toggle('hidden')
        //sets a timer for two seconds then toggles the hidden class back
        setTimeout(() => success.classList.toggle('hidden'), 2000);
        //checkurl function just checks if the url value starts with
        //http:// or https://, if not then adds it
        URL = checkUrl(URL);

        //creates a link object using the input values then pushes them.
        links.push(new Link(title, URL, name));

        //clears the linkList element
        linkListElement.innerHTML = '';

        //createList function, creates a list elements from the list array
        createList();
    }
    warningDiv.innerHTML = warningElement.textContent;
}

function checkUrl(url) {
    if(!(url.startsWith('http://') || url.startsWith('https://'))) {
        url = 'http://' + url;
    }
    return url;
}

function createList() {
    links.forEach(linkItem => {
        //create a detailed list item
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('link-block');
        const linkTitle = document.createElement('dt');
        const linkDesc = document.createElement('dd');

        //gets the keys from each item
        linkTitle.innerHTML = `<a href="${linkItem.site}" target="_blank"><span id="url-title">${linkItem.title}</span> ${linkItem.site}</a>`;
        linkDesc.innerHTML = `Submitted by ${linkItem.author}`;

        //adds a delete div to each list item
        const deleteBox = document.createElement('div');
        deleteBox.innerHTML = '<p>delete</p>';
        deleteBox.classList.add('delete');

        //appends all the elements to a new Div
        linkDiv.append(linkTitle, linkDesc, deleteBox);

        //adds the new div to the document
        linkListElement.append(linkDiv);

        
        //event deletes the item and removes it from the array when click
        deleteBox.addEventListener('click', e => {
            linkListElement.removeChild(linkDiv);
            const indexItem = links.indexOf(linkItem);
            links.splice(indexItem, 1);
        })
    });
}

createList();
