from google import genai
import os
import environ
from pathlib import Path
import sys

# Ensure UTF-8 output
if sys.stdout.encoding != 'utf-8':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_DIR = Path(__file__).resolve().parent
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))
api_key = env('GEMINI_API_KEY')

def test_api():
    print("Testing Gemini API Connection...")
    try:
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model='gemini-flash-latest',
            contents="Say 'API is Online'"
        )
        print(f"API Response: {response.text}")
    except Exception as e:
        print("Error detected:")
        print(str(e))

if __name__ == "__main__":
    test_api()
