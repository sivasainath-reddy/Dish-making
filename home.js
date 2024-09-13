// Open the side menu
document.getElementById('menu').addEventListener('click', function () {
    document.getElementById('side-menu').style.width = '250px';
});

// Close the side menu
document.getElementById('close').addEventListener('click', function () {
    document.getElementById('side-menu').style.width = '0';
});

// let imgElements = document.getElementsByClassName('img');
// let categoryLinks = document.querySelectorAll('.categ-items a');
// fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
// .then(response => response.json())
// .then(data => {
//     let categories = data.categories;
//     for (let i = 0; i < imgElements.length && i < categories.length; i++) {
//         imgElements[i].setAttribute('src', categories[i].strCategoryThumb);
//     }
// })
// .catch(error => {
//     console.error('Error fetching data:', error);
// });



let imgElements = document.getElementsByClassName('img');
let categoryLinks = document.querySelectorAll('.categ-items a');
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(response => response.json())
.then(data => {
    let categories = data.categories;
    for (let i = 0; i < imgElements.length && i < categories.length; i++) {
        // Set the image source
        imgElements[i].setAttribute('src', categories[i].strCategoryThumb);
        
        // Create a new div for the name label
        let label = document.createElement('div');
        label.textContent = categories[i].strCategory.toUpperCase();  // Set the category name in uppercase as shown in the image
        label.style.textAlign = 'center';
        label.style.fontWeight = 'bold';
        label.style.marginTop = '10px';
        label.style.color = '#FF6F00';  // Optional: Apply color to match the image style
        
        // Append the label below the image
        imgElements[i].parentElement.appendChild(label);
    }
})
.catch(error => {
    console.error('Error fetching data:', error);
});
