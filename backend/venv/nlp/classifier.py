import re #regular Expressions

# Dictionary of industries and their related keywords
#used AI to get the keywords
CATEGORY_KEYWORDS = {
    "Technology": ["AI", "machine learning", "software", "programming", "data science"],
    "Health": ["healthcare", "medicine", "fitness", "nutrition", "mental health"],
    "Education": ["school", "university", "learning", "education", "students"],
    "Travel": ["travel", "tourism", "hotels", "flights", "vacation", "destinations"],
    "Food": ["restaurant", "recipe", "cuisine", "cooking", "dining"],
    "Sports": ["sports", "football", "basketball", "tennis", "athlete"],
    "Entertainment": ["movies", "music", "celebrity", "TV", "entertainment"],
    "Science": ["science", "research", "discovery", "experiment", "scientist"],
    "Art": ["art", "painting", "sculpture", "gallery", "artist"],
    "Fashion": ["fashion", "style", "design", "clothing", "trend"],
    }

def classify_content(content,headings):
    """Classify content based on keyword matching."""
    # Join content and headers paragraphs into a single text
    content_text = " ".join(content).lower() 
    headings_text = " ".join([heading for heading_list in headings.values() for heading in heading_list]).lower()
    content_text += headings_text

    # Initialize a dictionary to track keyword matches for each category
    category_scores = {}
    for category in CATEGORY_KEYWORDS.keys():
        category_scores[category] = 0

    # Count occurrences of keywords in the content
    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            # Use regex to count keyword occurrences in headings and content(case-insensitive)
            category_scores[category] += len(re.findall(keyword, content_text, re.IGNORECASE))
    # Find the category with the highest score
    max_category = max(category_scores, key=category_scores.get)
    
    # Check if there's a meaningful score, otherwise classify as 'Uncategorized'
    if category_scores[max_category] == 0:
        max_category = "Uncategorized"

    return max_category



