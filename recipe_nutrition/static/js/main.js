
function createASelfRecipes(){
    let user_token = "899933714de5fc99d06bd278e65bddbef57ea4d88458db24"
    let recipename = document.querySelector("#createname").value
    let recipedescription = document.querySelector("#createdescription").value
    let recipeingredients = document.querySelector("#createingredients").value
    let recipeinstructions = document.querySelector("#createinstructions").value
    fetch('http://127.0.0.1:5000/api/create-recipe', {
        method: "POST",
        body: JSON.stringify({
            name: `${recipename}`,
            description: `${recipedescription}`, 
            ingredients: `${recipeingredients}`,
            instructions: `${recipeinstructions}`
          }),
        headers: {
            "Content-Type": "application/json",
            "x-access-token": `Bearer ${user_token}`
        }
    })
    .then(response => response.json())
    .then(selfRecipeData => {
        console.log(selfRecipeData)
        setTimeout(()=>{ window.location.reload(); }, 1000);
        
    })
}


function getAllSelfRecipes(){
    let user_token = "899933714de5fc99d06bd278e65bddbef57ea4d88458db24"
    fetch('http://127.0.0.1:5000/api/recipes', {
        headers: {
            "Content-Type": "application/json",
            "x-access-token": `Bearer ${user_token}`
        }
    })
    .then(response => response.json())
    .then(selfRecipeData => {
        console.log(selfRecipeData)
        document.querySelector("#booking-table")
            .innerHTML = selfRecipeData.map(({ id, name, description, ingredients, instructions}) => `
                <tr>
                <th scope="row">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value=${id} id="flexCheckDefault">
                    </div>
                </th>
                <td>${name}</td>
                <td>${description}</td>
                <td>${ingredients}</td>
                <td>${instructions}</td>
                </tr>
            `)
            .join('');
    })
}

function updateASelfRecipe(){
    let user_token = "899933714de5fc99d06bd278e65bddbef57ea4d88458db24"
    let id;
    let recipename;
    let recipedescription;
    let recipeingredients;
    let recipeinstructions;
    [].forEach.call(document.querySelectorAll(".form-check-input"), function(element) {
        if(element.checked){
            id = element.value
            recipename = document.querySelector("#updatename").value
            recipedescription = document.querySelector("#updatedescription").value
            recipeingredients = document.querySelector("#updateingredients").value
            recipeinstructions = document.querySelector("#updateinstructions").value
        }
    })
    fetch(`http://127.0.0.1:5000/api/recipes/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            name: `${recipename}`,
            description: `${recipedescription}`, 
            ingredients: `${recipeingredients}`,
            instructions: `${recipeinstructions}`
          }),
        headers: {
            "Content-Type": "application/json",
            "x-access-token": `Bearer ${user_token}`
        }
    })
    .then(response => response.json())
    .then(selfRecipeData => {
        console.log(selfRecipeData)
        setTimeout(()=>{ window.location.reload(); }, 1000);
    })
}

function deleteASelfRecipe(){
    let user_token = "899933714de5fc99d06bd278e65bddbef57ea4d88458db24"
    let id;
    [].forEach.call(document.querySelectorAll(".form-check-input"), function(element) {
        if(element.checked){
            id = element.value
        }
    })
    fetch(`http://127.0.0.1:5000/api/recipes/bye/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": `Bearer ${user_token}`
        }
    })
    .then(response => response.json())
    .then(selfRecipeData => {
        console.log(selfRecipeData)
        setTimeout(()=>{ window.location.reload(); }, 1000);
    })
}

function getRecipe(){
    let keyword = document.querySelector('#keyword').value;
    const apiKey = 'e030efb8c3af3f9b872403e53bba66ea'
    const apiId = 'f121dff2'

    fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${apiId}&app_key=${apiKey}&q=${keyword}`)
    .then(response => response.json())
    .then(recipeData => {
        console.log(recipeData)

        //Get Recipe Title
        let titleData = recipeData.hits[0].recipe.label
        let recipeTitleHtml = document.querySelector('#recipe-title')
        recipeTitleHtml.innerHTML = titleData

        //Get Image
        let imageData = recipeData.hits[0].recipe.image
        let img_url = document.querySelector('#recipe-image')
        img_url.innerHTML = `<img src=${imageData}>`;


        //Get Servings
        let servingsData = recipeData.hits[0].recipe.yield
        let servingsHtml = document.querySelector('#recipe-servings')
        servingsHtml.innerHTML = "Servings: " + servingsData

        //Get Nutrition
        // calories
        let nutritionCalories = Math.round(recipeData.hits[0].recipe.totalNutrients.ENERC_KCAL.quantity) 
        let nutritionCaloriesHtml = document.querySelector('#calories')
        nutritionCaloriesHtml.innerHTML = nutritionCalories / servingsData
        //total fat
        let nutritionTotalFat = Math.round(recipeData.hits[0].recipe.totalNutrients.FAT.quantity)
        let nutritionTotalFatHtml = document.querySelector('#total-fat')
        nutritionTotalFatHtml.innerHTML = (nutritionTotalFat / servingsData) + "g"
        let nutritionDailyFat = Math.round(recipeData.hits[0].recipe.totalDaily.FAT.quantity)
        let nutritionDailyFatHtml = document.querySelector('#daily-fat')
        nutritionDailyFatHtml.innerHTML = (nutritionDailyFat / servingsData) + "%"
        // Sat fat
        let nutritionSatFat = Math.round(recipeData.hits[0].recipe.totalNutrients.FASAT.quantity)
        let nutritionSatFatHtml = document.querySelector('#sat-fat')
        nutritionSatFatHtml.innerHTML = (nutritionSatFat / servingsData) + "g"
        let nutritionDailySatFat = Math.round(recipeData.hits[0].recipe.totalDaily.FASAT.quantity)
        let nutritionDailySatFatHtml = document.querySelector('#daily-sat-fat')
        nutritionDailySatFatHtml.innerHTML = (nutritionDailySatFat / servingsData) + "%"
        // Trans Fat
        let nutritionTransFat = Math.round(recipeData.hits[0].recipe.totalNutrients.FATRN.quantity)
        let nutritionTransFatHtml = document.querySelector('#trans-fat')
        nutritionTransFatHtml.innerHTML = (nutritionTransFat / servingsData) + "g"
        // Chol 
        let nutritionChol = Math.round(recipeData.hits[0].recipe.totalNutrients.CHOLE.quantity)
        let nutritionCholHtml = document.querySelector('#chol')
        nutritionCholHtml.innerHTML = (nutritionChol / servingsData) + "mg"
        let nutritionDailyChol = Math.round(recipeData.hits[0].recipe.totalDaily.CHOLE.quantity)
        let nutritionDailyCholHtml = document.querySelector('#daily-chol')
        nutritionDailyCholHtml.innerHTML = (nutritionDailyChol / servingsData) + "%"
        // Sod
        let nutritionSod = Math.round(recipeData.hits[0].recipe.totalNutrients.NA.quantity)
        let nutritionSodHtml = document.querySelector('#sodium')
        nutritionSodHtml.innerHTML = (nutritionSod / servingsData) + "mg"
        let nutritionDailySod = Math.round(recipeData.hits[0].recipe.totalDaily.NA.quantity)
        let nutritionDailySodHtml = document.querySelector('#daily-sodium')
        nutritionDailySodHtml.innerHTML = (nutritionDailySod / servingsData) + "%"
        // Total Carbs
        let nutritionCarbs = Math.round(recipeData.hits[0].recipe.totalNutrients.CHOCDF.quantity)
        let nutritionCarbsHtml = document.querySelector('#total-carbs')
        nutritionCarbsHtml.innerHTML = (nutritionCarbs / servingsData) + "g"
        let nutritionDailyCarbs = Math.round(recipeData.hits[0].recipe.totalDaily.CHOCDF.quantity)
        let nutritionDailyCarbsHtml = document.querySelector('#total-daily-carbs')
        nutritionDailyCarbsHtml.innerHTML = (nutritionDailyCarbs / servingsData) + "%"
        // Fiber
        let nutritionFiber = Math.round(recipeData.hits[0].recipe.totalNutrients.FIBTG.quantity)
        let nutritionFiberHtml = document.querySelector('#fiber')
        nutritionFiberHtml.innerHTML = (nutritionFiber / servingsData) + "g"
        let nutritionDailyFiber = Math.round(recipeData.hits[0].recipe.totalDaily.FIBTG.quantity)
        let nutritionDailyFiberHtml = document.querySelector('#daily-fiber')
        nutritionDailyFiberHtml.innerHTML = (nutritionDailyFiber / servingsData) + "%"
        // TotalSugars
        let nutritionTotalSugars = Math.round(recipeData.hits[0].recipe.totalNutrients.SUGAR.quantity)
        let nutritionTotalSugarsHtml = document.querySelector('#total-sugar')
        nutritionTotalSugarsHtml.innerHTML = (nutritionTotalSugars / servingsData) + "g"
        // Protein
        let nutritionProtein = Math.round(recipeData.hits[0].recipe.totalNutrients.PROCNT.quantity)
        let nutritionProteinHtml = document.querySelector('#protein')
        nutritionProteinHtml.innerHTML = (nutritionProtein / servingsData) + "g"
        // VitD
        let nutritionVitD = Math.round(recipeData.hits[0].recipe.totalNutrients.VITD.quantity)
        let nutritionVitDHtml = document.querySelector('#vit-d')
        nutritionVitDHtml.innerHTML = "Vitamin D " + (nutritionVitD / servingsData) + "mcg"
        let nutritionDailyVitD = Math.round(recipeData.hits[0].recipe.totalDaily.VITD.quantity)
        let nutritionDailyVitDHtml = document.querySelector('#daily-vit-d')
        nutritionDailyVitDHtml.innerHTML = (nutritionDailyVitD / servingsData) + "%"
        // Cal
        let nutritionCal = Math.round(recipeData.hits[0].recipe.totalNutrients.CA.quantity)
        let nutritionCalHtml = document.querySelector('#cal')
        nutritionCalHtml.innerHTML = "Calcium " + (nutritionCal / servingsData) + "mg"
        let nutritionDailyCal = Math.round(recipeData.hits[0].recipe.totalDaily.CA.quantity)
        let nutritionDailyCalHtml = document.querySelector('#daily-cal')
        nutritionDailyCalHtml.innerHTML = (nutritionDailyCal / servingsData) + "%"
        // Iron
        let nutritionIron = Math.round(recipeData.hits[0].recipe.totalNutrients.FE.quantity)
        let nutritionIronHtml = document.querySelector('#iron')
        nutritionIronHtml.innerHTML = "Iron " + (nutritionIron / servingsData) + "mg"
        let nutritionDailyIron = Math.round(recipeData.hits[0].recipe.totalDaily.FE.quantity)
        let nutritionDailyIronHtml = document.querySelector('#daily-iron')
        nutritionDailyIronHtml.innerHTML = (nutritionDailyIron / servingsData) + "%"
        // Pot
        let nutritionPot = Math.round(recipeData.hits[0].recipe.totalNutrients.K.quantity)
        let nutritionPotHtml = document.querySelector('#pot')
        nutritionPotHtml.innerHTML = "Potassium " + (nutritionPot / servingsData) + "mg"
        let nutritionDailyPot = Math.round(recipeData.hits[0].recipe.totalDaily.K.quantity)
        let nutritionDailyPotHtml = document.querySelector('#daily-pot')
        nutritionDailyPotHtml.innerHTML = (nutritionDailyPot / servingsData) + "%"


        //Get Ingredients
        let ingredientData = recipeData.hits[0].recipe.ingredientLines
        let ingredientsHtml = document.querySelector('#ingredients-lines')
        ingredientsHtml.innerHTML = ingredientData.map((item) => {
            return `<li>${item}</li>`;
        }).join('');
    })
}