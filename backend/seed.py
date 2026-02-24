import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cookly_backend.settings')
django.setup()

from api.models import Recipe, Ingredient, User

def seed_data():
    # Create a test user
    user, created = User.objects.get_or_create(username='testuser')
    if created:
        user.set_password('password123')
        user.save()
        print("Test user created.")

    # Create ingredients
    ingredients_data = ['Avocado', 'Bread', 'Chicken Breast', 'Tomato', 'Basil', 'Pasta', 'Quinoa', 'Spinach', 'Egg']
    ingredient_objs = {}
    for name in ingredients_data:
        obj, _ = Ingredient.objects.get_or_create(name=name)
        ingredient_objs[name] = obj
    print("Ingredients created.")

    # Create recipes
    recipes = [
        {
            'title': 'Avocado Toast',
            'description': 'A simple and healthy breakfast.',
            'instructions': '1. Toast the bread.\n2. Mash avocado and spread on toast.\n3. Season with salt and pepper.',
            'image_url': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format',
            'cooking_time': 10,
            'diet_type': 'vegan',
            'ingredients': ['Avocado', 'Bread']
        },
        {
            'title': 'Chicken Pasta',
            'description': 'Classic creamy chicken pasta.',
            'instructions': '1. Boil pasta.\n2. Cook chicken breast.\n3. Mix with tomato sauce and basil.',
            'image_url': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format',
            'cooking_time': 25,
            'diet_type': 'non-veg',
            'ingredients': ['Chicken Breast', 'Pasta', 'Tomato', 'Basil']
        },
        {
            'title': 'Quinoa Bowl',
            'description': 'Nutritious quinoa with spinach and egg.',
            'instructions': '1. Cook quinoa.\n2. Sauté spinach.\n3. Top with a fried egg.',
            'image_url': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format',
            'cooking_time': 20,
            'diet_type': 'veg',
            'ingredients': ['Quinoa', 'Spinach', 'Egg']
        }
    ]

    for r_data in recipes:
        recipe, created = Recipe.objects.get_or_create(
            title=r_data['title'],
            defaults={
                'description': r_data['description'],
                'instructions': r_data['instructions'],
                'image_url': r_data['image_url'],
                'cooking_time': r_data['cooking_time'],
                'diet_type': r_data['diet_type']
            }
        )
        if created:
            for ing_name in r_data['ingredients']:
                recipe.ingredients.add(ingredient_objs[ing_name])
            print(f"Recipe '{recipe.title}' created.")

if __name__ == "__main__":
    seed_data()
