# Currency Converter
This is very simple Python Flask application for DevOps labs and demo purposes.
To use it, you will need to create a free account at https://rapidapi.com/principalapis/api/currency-conversion-and-exchange-rates/
Once you do, you will have your API key which you can insert to the application as an environment variable as follows:
```bash
export APIHOST=currency-conversion-and-exchange-rates.p.rapidapi.com
export APIKEY=your-own-key
```
You can start the application by running:
```bash
pip3 install -t requirements.txt
python3 app.py
```
You can also use a virtual enviornment (which is more recommended).
## Working in Docker
You can build the image and run it using a command like the following:
```bash
docker build  -t currencyconverter:1.0 .
docker run -d -p 5555:5000 --env APIHOST='currency-conversion-and-exchange-rates.p.rapidapi.com' --env APIKEY='your-own-key' currencyconverter:1.0
```
## Running the application
Whether you are using Docker or directly using Python, you can reach the application at http://localhost:5555
