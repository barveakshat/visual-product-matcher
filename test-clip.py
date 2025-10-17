#!/usr/bin/env python3
"""
Test script for CLIP service
"""
import requests
import json

CLIP_URL = "https://clip-service-562950336705.us-central1.run.app"

def test_health():
    """Test health endpoint"""
    print("🧪 Testing CLIP Service Health...")
    try:
        response = requests.get(f"{CLIP_URL}/health", timeout=10)
        print(f"✅ Status: {response.status_code}")
        print(f"📊 Response: {json.dumps(response.json(), indent=2)}")
        return True
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False

def test_encoding():
    """Test image encoding with a sample image URL"""
    print("\n🧪 Testing Image Encoding...")
    
    # Use a test image URL
    test_image_url = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
    
    try:
        # Download image first
        print("📥 Downloading test image...")
        img_response = requests.get(test_image_url, timeout=10)
        
        # Send to CLIP service
        print("🔄 Sending to CLIP service...")
        files = {'file': ('test.jpg', img_response.content, 'image/jpeg')}
        response = requests.post(f"{CLIP_URL}/encode_image", files=files, timeout=60)
        
        print(f"✅ Status: {response.status_code}")
        
        embedding = response.json()
        print(f"📊 Embedding shape: ({len(embedding)},)")
        print(f"📊 First 5 values: {embedding[:5]}")
        
        if response.status_code == 200 and len(embedding) == 512:
            print(f"✅ Image encoding successful!")
            return True
        else:
            print(f"❌ Unexpected response format")
            return False
    except Exception as e:
        print(f"❌ Encoding test failed: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("🚀 CLIP Service Test Suite")
    print("=" * 60)
    
    health_ok = test_health()
    
    if health_ok:
        encoding_ok = test_encoding()
        
        print("\n" + "=" * 60)
        if health_ok and encoding_ok:
            print("✅ All tests passed! CLIP service is working perfectly.")
        else:
            print("⚠️  Some tests failed. Check errors above.")
        print("=" * 60)
    else:
        print("\n❌ Service is not responding. Check deployment.")
