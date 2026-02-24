from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Ingredient, Recipe, MealPlan

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name']

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    ingredient_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=Ingredient.objects.all(), source='ingredients'
    )

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'instructions', 'image_url', 'cooking_time', 'diet_type', 'ingredients', 'ingredient_ids']

class MealPlanSerializer(serializers.ModelSerializer):
    recipe_details = RecipeSerializer(source='recipe', read_only=True)

    class Meta:
        model = MealPlan
        fields = ['id', 'user', 'recipe', 'recipe_details', 'day', 'created_at']
