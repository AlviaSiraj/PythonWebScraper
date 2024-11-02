 # Formatting the response from the scrape
def format_scrape_response(title, headings, content, category):
    return {
        "title": title,
        "headings": headings,
        "content": content,
        "category": category,
    }
