from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = 8

    @task
    def upload_mp4(self):
        with open('test.mp4', 'rb') as file:    
            mp4_content = file.read()
        error='Success !'
        headers = {'Content-Type': 'multipart/form-data'}
        files = {'file': ('test.mp4', mp4_content, 'video/mp4')}
        url = 'http://localhost:5000/my-endpoint'
        response = self.client.post(url,  headers=headers, files=files)
        if response.status_code == 200:
            # Parse the response data and do any necessary validations
            json_value = response.json()
            text = json_value['data']
            
            value = "la rubrique de naissance nous sommes le samedi 25 février et le 25 février 1836 Samuel Colt dépose le brevet du revolver qui portera d'ailleurs son nom 25 février 1841 c'est la naissance d'Auguste Renoir l'un des plus célèbres peintres français il décédera le 3 décembre 1919 et enfin le 25 février 1899 création du constructeur automobile Renault par les trois frères Louis et Marcel et Fernand Reno"
            if (text == value):
                print(f'Success :  {text}') 
            else: 
                print(f'{error}')
            
        else:
            # Handle any errors or failures
            print(f'Failed to upload MP4 file: {response.status_code} ')
