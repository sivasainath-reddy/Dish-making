// Open the side menu
document.getElementById('menu').addEventListener('click', function () {
    document.getElementById('side-menu').style.width = '250px';
});

// Close the side menu
document.getElementById('close').addEventListener('click', function () {
    document.getElementById('side-menu').style.width = '0';
});



//Category
let imgElements = document.getElementsByClassName('img');
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(response => response.json())
.then(data => {
    let categories = data.categories;
    for (let i = 0; i < imgElements.length && i < categories.length; i++) {
        // Set the image source
        imgElements[i].setAttribute('src', categories[i].strCategoryThumb);
        
        // Create a new div for the name label
        let label = document.createElement('div');
        label.textContent = categories[i].strCategory.toUpperCase();  
        label.style.textAlign = 'center';
        label.style.fontWeight = 'bold';
        label.style.marginTop = '10px';
        label.style.color = '#FF6F00';  
        
        // Append the label below the image
        imgElements[i].parentElement.appendChild(label);
    }
})
.catch(error => {
    console.error('Error fetching data:', error);
});


// description
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(response => response.json())
.then(data => {
    const categories = data.categories;
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const selectedCategory = categories.find(cat => cat.strCategory === category);
    const mealNameElement = document.querySelector('.category-name');
    const mealDescriptionElement = document.querySelector('.description');
    if (selectedCategory) {
        mealNameElement.textContent = selectedCategory.strCategory; 
        mealDescriptionElement.textContent = selectedCategory.strCategoryDescription; 
    } 
    else {
        mealNameElement.textContent = 'Category not found';
        mealDescriptionElement.textContent = '';
    }
})
.catch(error => {
    console.error('Error fetching categories:', error);
});

// meals-category

let arr = [
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert',
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Miscellaneous', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Pork',
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Side', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian',
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast',
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat'
    ];
    const mealContainer = document.getElementById('meal-items');
    let mealCount = 0; 
    
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');
    const categoryUrl = arr.find(url => url.includes(`c=${selectedCategory}`));
    
    if (categoryUrl) {
    fetch(categoryUrl)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            mealContainer.innerHTML = ''; 
            meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.classList.add('meal');
                const mealImg = document.createElement('img');
                mealImg.setAttribute('src', meal.strMealThumb);
                mealImg.setAttribute('alt', meal.strMeal);
        
                const mealName = document.createElement('div');
                mealName.classList.add('meal-name');
                mealName.textContent = meal.strMeal;
        
                mealDiv.appendChild(mealImg);
                mealDiv.appendChild(mealName);
        
                mealContainer.appendChild(mealDiv);
    
                mealCount++; 
            });
        })
        .catch(error => {
            console.error('Error fetching meals:', error);
        });
    } else {
    console.error('Category URL not found');
    }