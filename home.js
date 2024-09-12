// Open the side menu
document.getElementById('menu').addEventListener('click', function () {
    document.getElementById('side-menu').style.width = '250px';
});

// Close the side menu
document.getElementById('close').addEventListener('click', function () {
    document.getElementById('side-menu').style.width = '0';
});

let imgElements = document.getElementsByClassName('img');
let categoryLinks = document.querySelectorAll('.categ-items a');
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(response => response.json())
.then(data => {
    let categories = data.categories;
    for (let i = 0; i < imgElements.length && i < categories.length; i++) {
        imgElements[i].setAttribute('src', categories[i].strCategoryThumb);
    }
})
.catch(error => {
    console.error('Error fetching data:', error);
});



