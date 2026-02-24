from django.db import models
from django.contrib.auth.models import User

class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    DIET_CHOICES = [
        ('veg', 'Vegetarian'),
        ('non-veg', 'Non-Vegetarian'),
        ('vegan', 'Vegan'),
        ('keto', 'Keto'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    instructions = models.TextField()
    image_url = models.URLField(max_length=500, blank=True, null=True)
    cooking_time = models.IntegerField(help_text="In minutes")
    diet_type = models.CharField(max_length=20, choices=DIET_CHOICES, default='veg')
    ingredients = models.ManyToManyField(Ingredient, related_name='recipes')

    def __str__(self):
        return self.title

class MealPlan(models.Model):
    DAYS_OF_WEEK = [
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='meal_plans')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    day = models.CharField(max_length=10, choices=DAYS_OF_WEEK)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'day', 'recipe')

    def __str__(self):
        return f"{self.user.username}'s plan for {self.day}: {self.recipe.title}"
