import os
from urllib.request import urlretrieve
from zipfile import ZipFile


BASE_DIR = 'media'

def from_ftp():
    dest_zip_file = os.path.join(BASE_DIR, 'from_ftp.zip')
    ftp_path = os.environ.get('FTP_PATH')
    urlretrieve(f'{ftp_path}/Export.zip', dest_zip_file)
    with ZipFile(dest_zip_file, 'r') as z_file:
        z_file.extract('export.xml', path=BASE_DIR)
    os.remove(dest_zip_file)
   

if __name__ == '__main__':
    from_ftp()
    print('Loaded from ftp... ')
    
