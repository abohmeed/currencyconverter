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
## Working in Kubernetes
You can deploy this application to any Kubernetes cluster using the manifests in the `k8s/base` directory. There are two Kustomize patches in the `k8s/overlays/development` and `k8s/overlays/production` directories. They switch Python Flask's `debug` mode on or off depending on the target environment.
### Storing the API key in a Secret
The cluster expects the API key for currency conversion to be stored in a Secret called `api-keys` under a key called `APIKEY`. 
First, you will need to convert the API key you got to base64 format. For example:
```bash
echo -n your_key | base64
```
You will need to create a Secret as follows:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: api-keys
type: Opaque
data:
  APIKEY: your_key_in_base64
```
### Storing the Secret as Sealed Secret
If want to use GitOps, you will want to store all the manifests - including the Secrets - in the Git repository. One possible way of doing this without exposing sensitive information in plain text is using Sealed Secrets. 
Firsy, you will need to install the CLI tool and the controller:
```bash
# Install the CLI using Home Brew
brew install kubeseal
# Install the controller to the cluster. 
# You can get the latest version from https://github.com/bitnami-labs/sealed-secrets/releases
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.25.0/controller.yaml
# You will need to get the public key to be able to enctypt Secrets
kubeseal --fetch-cert > publickey.pem
# Using this public key, you can encrypt the Secret.yaml file 
kubeseal --format=yaml --cert=publickey.pem < secret.yaml > sealedsecret.yaml
# Now, you can safely commit the sealedsecret.yaml to the repository. 
# The contents will be encrypted and the Sealed Secrets controller will 
# decrypt them on the fly when the manifest is applied to the cluster 
```