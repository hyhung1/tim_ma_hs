import json

# Load the HS mapping data
def load_hs_data():
    with open('hs_mapping.json', 'r', encoding='utf-8') as file:
        return json.load(file)

# Function to normalize HS code (add dots if missing)
def normalize_hs_code(code):
    # Remove any existing dots
    clean_code = code.replace('.', '')
    
    # Add dots in the correct positions for HS codes
    if len(clean_code) >= 8:
        # Format: XXXX.XX.XX
        return f"{clean_code[:4]}.{clean_code[4:6]}.{clean_code[6:8]}"
    return code

# Function to lookup HS code and return content
def lookup_hs_code(hs_code, data):
    normalized_code = normalize_hs_code(hs_code)
    
    # Check if the code exists in mapping
    if normalized_code in data['mapping']:
        content_key = data['mapping'][normalized_code]
        # Return the actual content description
        return data['content'].get(content_key, f"Content not found for key: {content_key}")
    else:
        return f"HS code '{normalized_code}' not found in mapping"

# Main execution
if __name__ == "__main__":
    # Load data
    hs_data = load_hs_data()
    
    # Input HS code (edit this variable to test different codes)
    INPUT_HS_CODE = "8471.30.90"  # Change this to test: "84713090", "8523.51.11", etc.
    
    # Lookup and display result
    result = lookup_hs_code(INPUT_HS_CODE, hs_data)
    
    print(f"HS Code: {INPUT_HS_CODE}")
    print(f"Normalized: {normalize_hs_code(INPUT_HS_CODE)}")
    print(f"Content:\n{result}")
