from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from google import genai
import json

class AIChefView(APIView):
    """
    Feature 1: Recipe Search by Food Name
    """
    def post(self, request):
        food_name = request.data.get('food_name')
        if not food_name:
            return Response({"error": "Food name is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            client = genai.Client(api_key=settings.GEMINI_API_KEY)
            prompt = f"Provide a detailed recipe for '{food_name}'. Return ONLY a JSON object with 'title', 'ingredients' (as a list), and 'instructions' (as a list of steps)."
            
            response = client.models.generate_content(
                model='gemini-flash-latest',
                contents=prompt
            )
            
            content = response.text.strip().replace('```json', '').replace('```', '')
            data = json.loads(content)
            return Response(data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AIDayPlanView(APIView):
    """
    Feature 2: Today's Meal Planner
    """
    def post(self, request):
        meal_varieties = request.data.get('meal_varieties')
        if not meal_varieties:
            return Response({"error": "Meal varieties are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            client = genai.Client(api_key=settings.GEMINI_API_KEY)
            prompt = f"""
            Based on these meal varieties: {meal_varieties}, create a recipe for Breakfast, Lunch, and Dinner.
            Return ONLY a JSON object with this structure:
            {{
                "breakfast": {{"title": "...", "ingredients": [], "instructions": []}},
                "lunch": {{"title": "...", "ingredients": [], "instructions": []}},
                "dinner": {{"title": "...", "ingredients": [], "instructions": []}}
            }}
            """
            
            response = client.models.generate_content(
                model='gemini-flash-latest',
                contents=prompt
            )
            
            content = response.text.strip().replace('```json', '').replace('```', '')
            data = json.loads(content)
            return Response(data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AIShoppingPlanView(APIView):
    """
    Feature 3: Groceries-based Weekly Plan
    """
    def post(self, request):
        groceries = request.data.get('groceries')
        if not groceries:
            return Response({"error": "Groceries are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            client = genai.Client(api_key=settings.GEMINI_API_KEY)
            prompt = f"""
            Using these groceries: {groceries}, create a 7-day meal plan.
            For each day, specify: Morning, Evening, Night, and Snacks.
            Return ONLY a JSON object where the keys are "Monday", "Tuesday", etc., and values are objects like:
            {{"morning": "...", "evening": "...", "night": "...", "snacks": "..."}}
            """
            
            response = client.models.generate_content(
                model='gemini-flash-latest',
                contents=prompt
            )
            
            content = response.text.strip().replace('```json', '').replace('```', '')
            data = json.loads(content)
            return Response(data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
