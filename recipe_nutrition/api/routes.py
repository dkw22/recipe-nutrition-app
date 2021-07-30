from flask import Blueprint, request, jsonify
from recipe_nutrition.helpers import token_required
from recipe_nutrition.models import db, User, Recipe, recipe_schema, recipes_schema

api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/getdata')
@token_required
def getdata(current_user_token):
    return {'some': 'value'}


# CREATE RECIPE ENDPOINT
@api.route('/create-recipe', methods=['POST'])
@token_required
def create_recipe(current_user_token):
    name = request.json['name']
    description = request.json['description']
    ingredients = request.json['ingredients']
    instructions = request.json['instructions']
    user_token = current_user_token.token

    print(f'BIG TESTER: {current_user_token.token}')

    recipe = Recipe(name, ingredients, instructions,
                    user_token=user_token, description=description)

    db.session.add(recipe)
    db.session.commit()

    response = recipe_schema.dump(recipe)
    return jsonify(response)

# RETRIEVE ALL RECIPES ENDPOINT


@api.route('/recipes', methods=['GET'])
@token_required
def get_recipes(current_user_token):
    owner = current_user_token.token
    recipes = Recipe.query.filter_by(user_token=owner).all()
    response = recipes_schema.dump(recipes)
    return jsonify(response)

# RETRIEVE ONE RECIPE ENDPOINT


@api.route('/recipes/<id>', methods=['GET'])
@token_required
def get_recipe(current_user_token, id):
    owner = current_user_token.token
    if owner == current_user_token.token:
        recipe = Recipe.query.get(id)
        response = recipe_schema.dump(recipe)
        return jsonify(response)
    else:
        return jsonify({"message": "Valid Token Required"}), 401

# UPDATE RECIPE ENDPOINT


@api.route('/recipes/update/<id>', methods=['POST', 'PUT'])
@token_required
def update_recipe(current_user_token, id):
    recipe = Recipe.query.get(id)  # GET CHARACTER INSTANCE

    recipe.name = request.json['name']
    recipe.description = request.json['description']
    recipe.ingredients = request.json['ingredients']
    recipe.instructions = request.json['instructions']
    recipe.user_token = current_user_token.token

    db.session.commit()
    response = recipe_schema.dump(recipe)
    return jsonify(response)

# DELETE RECIPE ENDPOINT


@api.route('/recipes/bye/<id>', methods=['DELETE'])
@token_required
def delete_recipe(current_user_token, id):
    recipe = Recipe.query.get(id)
    db.session.delete(recipe)
    db.session.commit()
    response = recipe_schema.dump(recipe)
    return jsonify(response)
