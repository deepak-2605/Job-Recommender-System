import requests

url = 'http://127.0.0.1:5000/recommend'
data = {'file_path': 'CV_2.pdf'}

response = requests.post(url, json=data)

print('Status Code:', response.status_code)
print('Response JSON:', response.json())
