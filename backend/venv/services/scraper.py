import requests #HTTP Request Library
from bs4 import BeautifulSoup #for scraping
from nlp.classifier import classify_content #import the classify_content function from the classifier.py file

def scrape_website(url):
    try:
        response=requests.get(url)
        #check if request was successful
        response.raise_for_status() 
        #parse Content with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser') 
        #extract Title of the page
        title=soup.title.string if soup.title else "No title Available"
        #extract headings
        #headings = [heading.text for heading in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])]
        headings={
            "h1": [h.get_text(strip=True) for h in soup.find_all('h1')],
            "h2": [h.get_text(strip=True) for h in soup.find_all('h2')],
            "h3": [h.get_text(strip=True) for h in soup.find_all('h3')],
        }
        #get main content
        content=[p.get_text(strip=True) for p in soup.find_all('p')]

        # Classify content into a category
        category = classify_content(content, headings)
        #combine them in a JSON result format
        result={
            "title": title,
            "headings": headings,
            "content": content[:3],#only first 3 paragraphs to keep it simple
            "category": category,       # Include the classified category
        }
    
        return result, None
    except requests.exceptions.RequestException as e:
        return None, f"Failed to fetch the webpage: {e}"