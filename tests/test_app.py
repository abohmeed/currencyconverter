import unittest
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from app import app


class RealAPICallTest(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_real_api_call(self):
        # Example of making a real API call through your Flask route
        response = self.app.get("/convert?from=USD&to=EUR&amount=1")
        data = response.get_json()

        # Check that the response is successful
        self.assertEqual(response.status_code, 200)

        # Verify that the result is a float (indicative of a successful conversion)
        # Note: This is a simplistic check and assumes the API returns a JSON with a 'result' key
        self.assertIsInstance(data.get("result"), float)


if __name__ == "__main__":
    unittest.main()