from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import uvicorn
from typing import Dict, Any
import os

# Import the HS lookup functions from the existing module
from hs_lookup import load_hs_data, normalize_hs_code

# Create FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load HS data on startup
hs_data: Dict[str, Any] = {}

@app.on_event("startup")
async def startup_event():
    """Load HS data when the server starts"""
    global hs_data
    try:
        hs_data = load_hs_data()
        print("HS data loaded successfully")
    except Exception as e:
        print(f"Error loading HS data: {e}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "OK", "message": "Server is running"}

@app.get("/api/all")
async def get_all_hs_codes():
    """
    Get all HS codes and their content
    
    Returns:
        JSON response with success status and all HS code data
    """
    try:
        # Force reload the data to ensure we get the latest version
        fresh_data = load_hs_data()
        
        all_data = []
        
        # Iterate through all mappings and get their content
        for hs_code, content_key in fresh_data.get('mapping', {}).items():
            content = fresh_data.get('content', {}).get(content_key, '')
            all_data.append({
                "hsCode": hs_code,
                "content": content
            })
        
        # Sort by HS code for better organization
        all_data.sort(key=lambda x: x['hsCode'])
        
        return {
            "success": True,
            "data": all_data
        }
            
    except Exception as e:
        print(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/lookup/{code}")
async def lookup_hs_code(code: str):
    """
    Lookup HS code and return its content
    
    Args:
        code: The HS code to lookup (can be with or without dots)
        
    Returns:
        JSON response with success status and data or error message
    """
    try:
        # Force reload the data to ensure we get the latest version
        fresh_data = load_hs_data()
        
        # Normalize the HS code
        normalized_code = normalize_hs_code(code)
        
        # Check if the code exists in mapping
        if normalized_code in fresh_data.get('mapping', {}):
            content_key = fresh_data['mapping'][normalized_code]
            content = fresh_data.get('content', {}).get(content_key)
            
            if content:
                return {
                    "success": True,
                    "data": {
                        "hsCode": normalized_code,
                        "content": content
                    }
                }
            else:
                return {
                    "success": False,
                    "message": "The HS code does not exist in the database"
                }
        else:
            return {
                "success": False,
                "message": "The HS code does not exist in the database"
            }
            
    except Exception as e:
        print(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    # Get port from environment variable or use default
    port = int(os.environ.get("PORT", 1000))
    
    # Get the local IP address for network access
    import socket
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    
    print(f"🚀 HS Code Lookup Server Starting...")
    print(f"📡 Server will be accessible at:")
    print(f"   • Local:   http://localhost:{port}")
    print(f"   • Network: http://{local_ip}:{port}")
    print(f"📋 API endpoints:")
    print(f"   • Health:  http://{local_ip}:{port}/api/health")
    print(f"   • Lookup:  http://{local_ip}:{port}/api/lookup/{{code}}")
    print(f"   • All:     http://{local_ip}:{port}/api/all")
    print(f"🔧 For browser extension, use: http://{local_ip}:{port}")
    print(f"⚠️  Make sure your firewall allows connections on port {port}")
    print("-" * 60)
    
    # Run the server
    uvicorn.run(app, host="0.0.0.0", port=port)
