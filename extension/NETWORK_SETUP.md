# Network Access Setup for HS Code Lookup Extension

## 🔧 **Problem Fixed**

The extension was only working on `localhost`, making it unusable for other users on the network. We've now made it network-accessible.

## ✅ **Changes Made**

### 1. **Server Updates** (`server.py`)
- **Default port changed** from 5000 to 1000
- **Network binding** to `0.0.0.0` (all interfaces) 
- **IP address detection** shows local network IP
- **Detailed startup info** with all access URLs

### 2. **Extension Updates**
- **Configurable server URL** in the popup interface
- **Connection testing** with "Test" button
- **Broader network permissions** in manifest
- **Persistent settings** (saves server URL)
- **Better error handling** for network issues

## 🚀 **How to Use**

### Step 1: Start the Server
```bash
cd tim_mahs
python server.py
```

The server will show output like:
```
🚀 HS Code Lookup Server Starting...
📡 Server will be accessible at:
   • Local:   http://localhost:1000
   • Network: http://192.168.1.100:1000
📋 API endpoints:
   • Health:  http://192.168.1.100:1000/api/health
   • Lookup:  http://192.168.1.100:1000/api/lookup/{code}
   • All:     http://192.168.1.100:1000/api/all
🔧 For browser extension, use: http://192.168.1.100:1000
⚠️  Make sure your firewall allows connections on port 1000
```

### Step 2: Configure the Extension

1. **Install/Reload the extension** in Chrome (`chrome://extensions/`)
2. **Click the extension icon** in your toolbar
3. **Update the Server URL** field with your network IP:
   - Replace `http://localhost:1000` 
   - With `http://192.168.1.100:1000` (use YOUR actual IP)
4. **Click "Test"** to verify connection
5. **You should see "✅ Connection successful!"**

### Step 3: Share with Other Users

Other users on your network can:

1. **Install the extension** from the same files
2. **Enter your server IP** in the Server URL field
3. **Test the connection** 
4. **Use the extension** to lookup HS codes

## 🔒 **Security Notes**

### Firewall Configuration
Make sure your firewall allows incoming connections on port 1000:

**Windows:**
```cmd
netsh advfirewall firewall add rule name="HS Code Lookup" dir=in action=allow protocol=TCP localport=1000
```

**Or manually:**
- Open Windows Firewall
- Add inbound rule for port 1000
- Allow TCP connections

### Network Security
- The server binds to all interfaces (`0.0.0.0`)
- Only accessible on your local network (private IP)
- No authentication required (suitable for internal use)
- For production use, consider adding authentication

## 🐛 **Troubleshooting**

### "Cannot reach server" error
1. **Check server is running** - should show the startup message
2. **Verify IP address** - use the IP shown in server output
3. **Test firewall** - temporarily disable to test
4. **Check network** - ping the server IP from client machine

### "Connection timeout" error  
1. **Firewall blocking** - check port 1000 is open
2. **Network issues** - verify client can reach server IP
3. **Server not responding** - restart the Python server

### Extension not loading
1. **Reload extension** in `chrome://extensions/`
2. **Check manifest permissions** - should allow http://*/*
3. **Browser console** - check for error messages

## 📋 **Network Testing Commands**

Test from another machine:
```bash
# Test server health
curl http://192.168.1.100:1000/api/health

# Test HS code lookup  
curl http://192.168.1.100:1000/api/lookup/8471.30.90

# Test in browser
http://192.168.1.100:1000/api/health
```

## 🎯 **Benefits**

- ✅ **Multi-user access** - entire team can use one server
- ✅ **Centralized data** - one source of truth for HS codes  
- ✅ **Easy updates** - update JSON file in one place
- ✅ **Network efficiency** - no need for multiple server instances
- ✅ **Simple deployment** - just share the extension files

## 🔧 **Advanced Configuration**

### Custom Port
Set a different port:
```bash
PORT=9000 python server.py
```

### Production Deployment
For production use, consider:
- Adding HTTPS support
- Implementing authentication
- Using a proper web server (nginx/Apache)
- Setting up proper logging
- Adding rate limiting
