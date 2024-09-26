// index file functionality
// side menu 
document.getElementById('menu-btn').addEventListener('click', function () {
    document.getElementById('side-menu').style.width = '250px';
    });
    
    document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('side-menu').style.width = '0';
    });
    
    
    // categories list
    let imgElements = document.getElementsByClassName('categ-img');
    let categoryLinks = document.querySelectorAll('.categ-items a');
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response => response.json())
    .then(data => {
        let categories = data.categories;
        for (let i = 0; i < imgElements.length && i < categories.length; i++) {
            imgElements[i].setAttribute('src', categories[i].strCategoryThumb);
            let label = document.createElement('div');
            label.textContent = categories[i].strCategory.toUpperCase();  
            label.style.textAlign = 'center';
            label.style.fontWeight = 'bold';
            label.style.marginTop = '10px';
            label.style.color ='#FF6F00';
            imgElements[i].parentElement.appendChild(label);
            categoryLinks[i].setAttribute('href', `category.html?category=${categories[i].strCategory}`);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    
    
    
    
    // category file functionality
    // categories description
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
    
    
    // categories list
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
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan', 
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian', 
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast', 
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat', 
        ];
        
        // search bar input
        function searchMeal() {
            const searchInput = document.getElementById('meal-search').value;
            console.log('Search Input:', searchInput); // Debug: Check if search input is being captured
            if (!searchInput) return;
        
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
                .then(response => response.json())
                .then(data => {
                    console.log('API Response:', data); // Debug: Check if API returns data
                    const searchResultsDiv = document.getElementById('search-results');
                    searchResultsDiv.innerHTML = ''; // Clear previous results
        
                    if (data.meals) {
                        data.meals.forEach(meal => {
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
        
                            mealDiv.addEventListener('click', () => {
                                window.location.href = `mealDetails.html?mealId=${meal.idMeal}`;
                            });
        
                            searchResultsDiv.appendChild(mealDiv);
                        });
                    } else {
                        searchResultsDiv.innerHTML = `<p>No meals found for "${searchInput}"</p>`;
                    }
                })
                .catch(error => {
                    console.error('Error fetching meal data:', error);
                });
        }
        
        
    
        // category items
        const mealContainer = document.getElementById('categories-items');
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
        
                        mealDiv.addEventListener('click', () => {
                            window.location.href = `mealDetails.html?mealId=${meal.idMeal}`;
                        });
        
                        
                        mealContainer.appendChild(mealDiv);
                    });
                })
                .catch(error => {
                    console.error('Error fetching meals:', error);
                });
        } else {
            console.error('Category URL not found');
        }
        
    
            
    // meal details functionality
    // meal list
    document.addEventListener("DOMContentLoaded", () => {
        const urlParams = new URLSearchParams(window.location.search);
        const mealId = urlParams.get('mealId'); 
        if (mealId) {
            const apiURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    
            fetch(apiURL)
                .then(response => response.json())
                .then(data => {
                    const meal = data.meals[0];
    
                    const mealImage = document.querySelector('.meal-image');
                    const mealName = document.querySelector('.meal-name');
                    const mealCategory = document.querySelector('.meal-category');
                    const mealSource = document.querySelector('.meal-source');
                    const tagsList = document.querySelector('.tags-list');
                    const mealIngredients = document.querySelector('.div-ingredients');
                    const mealMeasure = document.querySelector('.measure');
                    const mealInstructions = document.querySelector('.instructions');
                    const mealBarName = document.querySelector('.meal-bar-name'); 
    
                    mealImage.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid meal-img">`;
                    mealName.textContent = meal.strMeal;
                    mealCategory.textContent = meal.strCategory;
    
                    mealBarName.textContent = meal.strMeal; 
    
                    if (meal.strSource) {
                        mealSource.href = meal.strSource;
                        mealSource.textContent = meal.strSource;
                    } else {
                        mealSource.textContent = 'No source available'; 
                    }
    
                    // Tags
                    tagsList.textContent = meal.strTags ? meal.strTags.split(',').join(', ') : 'No tags available';
    
                    // Ingredients and Measures
                    for (let i = 1; i <= 20; i++) {
                        if (meal[`strIngredient${i}`] && meal[`strMeasure${i}`]) {
                            const ingredient = meal[`strIngredient${i}`];
                            const measure = meal[`strMeasure${i}`];
                            mealIngredients.innerHTML += `<p>${ingredient}</p>`;
                            mealMeasure.innerHTML += `<p>${measure}</p>`;
                        }
                    }
    
                    // Instructions
                    const instructionsArray = meal.strInstructions.split('.').filter(Boolean);
                    instructionsArray.forEach(instruction => {
                        mealInstructions.innerHTML += `<li>${instruction.trim()}.</li>`;
                    });
    
                })
                .catch(error => console.error('Error fetching meal data:', error));
        } else {
            console.error('Meal ID not found in the URL');
        }
    });
    
    
    
    