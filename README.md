# Questions/Content Generator

This is a tool that takes a website URL as input, scrapes its content, and returns AI generated questions based on their interests or industry

## Technology Stack

<a href="https://www.python.org/" title="Python"><img src="https://github.com/get-icon/geticon/raw/master/icons/python.svg" alt="Python" width="21px" height="21px"></a>
<a href="https://reactjs.org/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="21px" height="21px"></a>
<a href="https://redux.js.org/" title="Redux"><img src="https://github.com/get-icon/geticon/raw/master/icons/redux.svg" alt="Redux" width="21px" height="21px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="21px" height="21px"></a>
<a href="https://getbootstrap.com/" title="Bootstrap"><img src="https://github.com/get-icon/geticon/raw/master/icons/bootstrap.svg" alt="Bootstrap" width="21px" height="21px"></a>
<a href="https://www.w3.org/TR/CSS/" title="CSS3"><img src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg" alt="CSS3" width="21px" height="21px"></a>
<a href="https://dev.mysql.com/" title="MySQL"><img src="https://github.com/get-icon/geticon/raw/master/icons/mysql.svg" alt="MySQL" width="21px" height="21px"></a>
<a href="https://code.visualstudio.com/" title="Visual Studio Code"><img src="https://github.com/get-icon/geticon/raw/master/icons/visual-studio-code.svg" alt="Visual Studio Code" width="21px" height="21px"></a>
<a href="https://aws.amazon.com/" title="AWS"><img src="https://github.com/get-icon/geticon/raw/master/icons/aws.svg" alt="AWS" width="21px" height="21px"></a>
<a href="https://www.npmjs.com/" title="npm"><img src="https://github.com/get-icon/geticon/raw/master/icons/npm.svg" alt="npm" width="21px" height="21px"></a>
<a href="https://git-scm.com/" title="Git"><img src="https://github.com/get-icon/geticon/raw/master/icons/git-icon.svg" alt="Git" width="21px" height="21px"></a>

## System Requirements

Please ensure you have installed these components on your computer before running the application.

- Local MySQL server (e.g. MySQL workbench)
- Python, version 3.10.6
- Pipenv, version 2022.9.4
- Npm, version 8.15.0

## Installation

Clone the project from github

```bash
git clone https://github.com/AlviaSiraj/PythonWebScraper.git
```

### Backend Installation

navigate to backend folder

```bash
cd backend/venv
```

create a .env file
(windows)

```bash
New-Item -Path .env -ItemType File
```

install Requirements from requirements.txt

```bash
pip install --upgrade -r requirements.txt
```

Add your OpenAI key (may have to pay) and your AWS database connections

```python
OPENAI_API_KEY="YOUR KEY"
DB_HOST ="DB ENDPOINT"
DB_USER ="MASTER USER"
DB_PASSWORD = "MASTER USER PASSWORD"
DB_NAME ="DATABASE NAME"
```

Run backend

```bash
python app.py
```

To test using postman or insomnia use this url

```python
http://127.0.0.1:5000/{endpoint}
```

### Frontend Installation

Navigate to frontend

```bash
cd frontend/webscraper
```

install all npm packages

```bash
npm install
```

run frontend

```bash
npm start
```

## About App

This is an application where a user enters a url and the website content is scraped and summarized to return AI generated questions based on the content provided. The user can answer the questions and they get saved into the AWS RDS database.

<img src="/frontend/webscraper/images/project_capture1.png" alt="Example Screenshot1" height="300">
<img src="/frontend/webscraper/images/project_capture2.png" alt="Example Screenshot1" height="300">
<img src="/frontend/webscraper/images/project_capture3.png" alt="Example Screenshot1" height="300">
<img src="/frontend/webscraper/images/project_capture4.png" alt="Example Screenshot1" height="100">
