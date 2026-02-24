from django.urls import path
from .views import AIChefView, AIDayPlanView, AIShoppingPlanView

urlpatterns = [
    path('ai/recipe/', AIChefView.as_view(), name='ai_recipe'),
    path('ai/day-plan/', AIDayPlanView.as_view(), name='ai_day_plan'),
    path('ai/shopping-plan/', AIShoppingPlanView.as_view(), name='ai_shopping_plan'),
]
