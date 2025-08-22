// Configuration
let API_BASE_URL = 'http://172.16.16.149:1000';
const WEB_APP_URL = 'http://172.16.16.149:1200';

// DOM elements
const hsCodeInput = document.getElementById('hsCodeInput');
const searchButton = document.getElementById('searchButton');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const result = document.getElementById('result');
const noResult = document.getElementById('noResult');
const resultHsCode = document.getElementById('resultHsCode');
const resultContent = document.getElementById('resultContent');
const copyButton = document.getElementById('copyButton');
const openWebAppLink = document.getElementById('openWebApp');
const serverUrlInput = document.getElementById('serverUrl');
const testConnectionButton = document.getElementById('testConnection');
const connectionStatus = document.getElementById('connectionStatus');

// State
let currentResult = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Load saved server URL
  loadServerConfig();
  
  // Focus on HS code input
  hsCodeInput.focus();
  
  // Show initial state
  showNoResult();
  
  // Event listeners
  searchButton.addEventListener('click', handleSearch);
  hsCodeInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
  
  hsCodeInput.addEventListener('input', function() {
    if (error.style.display !== 'none') {
      hideError();
    }
  });
  
  copyButton.addEventListener('click', handleCopy);
  openWebAppLink.addEventListener('click', function(e) {
    e.preventDefault();
    chrome.tabs.create({ url: WEB_APP_URL });
  });
  
  // Server configuration listeners
  testConnectionButton.addEventListener('click', handleTestConnection);
  serverUrlInput.addEventListener('input', function() {
    saveServerConfig();
    updateApiBaseUrl();
  });
  
  serverUrlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleTestConnection();
    }
  });
});

// Search functionality
async function handleSearch() {
  const hsCode = hsCodeInput.value.trim();
  
  if (!hsCode) {
    showError('Please enter an HS code');
    return;
  }
  
  // Validate HS code format (basic validation)
  const cleanCode = hsCode.replace(/\./g, '');
  if (!/^\d{6,10}$/.test(cleanCode)) {
    showError('Please enter a valid HS code (6-10 digits)');
    return;
  }
  
  showLoading();
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lookup/${encodeURIComponent(hsCode)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      currentResult = data.data;
      showResult(data.data);
    } else {
      showError(data.message || 'HS code not found');
    }
    
  } catch (err) {
    console.error('Search error:', err);
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      const serverUrl = serverUrlInput.value || 'http://localhost:1000';
      let errorMsg = `Cannot connect to server at ${serverUrl}.\n\n`;
      errorMsg += 'Troubleshooting steps:\n';
      errorMsg += '1. Make sure the server is running (python server.py)\n';
      errorMsg += '2. Check the Server URL is correct\n';
      errorMsg += '3. If on different machine, use the network IP (e.g., http://192.168.x.x:1000)\n';
      errorMsg += '4. Click "Test" button to verify connection';
      showError(errorMsg);
    } else {
      showError('An error occurred while searching. Please try again.');
    }
  } finally {
    hideLoading();
  }
}

// Copy functionality
async function handleCopy() {
  if (!currentResult) return;
  
  const textToCopy = `HS Code: ${currentResult.hsCode}\n\nContent:\n${currentResult.content}`;
  
  try {
    await navigator.clipboard.writeText(textToCopy);
    
    // Visual feedback
    const originalText = copyButton.textContent;
    copyButton.textContent = 'Copied!';
    copyButton.style.background = '#4CAF50';
    copyButton.style.color = 'white';
    
    setTimeout(() => {
      copyButton.textContent = originalText;
      copyButton.style.background = '#f5f5f5';
      copyButton.style.color = '#666';
    }, 1500);
    
  } catch (err) {
    console.error('Failed to copy:', err);
    // Fallback for older browsers
    fallbackCopy(textToCopy);
  }
}

// Fallback copy method
function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  
  // Visual feedback
  const originalText = copyButton.textContent;
  copyButton.textContent = 'Copied!';
  setTimeout(() => {
    copyButton.textContent = originalText;
  }, 1500);
}

// UI State Management
function showLoading() {
  loading.style.display = 'block';
  error.style.display = 'none';
  result.style.display = 'none';
  noResult.style.display = 'none';
  searchButton.disabled = true;
  searchButton.textContent = 'Searching...';
}

function hideLoading() {
  loading.style.display = 'none';
  searchButton.disabled = false;
  searchButton.textContent = 'Search';
}

function showError(message) {
  // Handle multi-line error messages
  error.innerHTML = message.replace(/\n/g, '<br>');
  error.style.display = 'block';
  result.style.display = 'none';
  noResult.style.display = 'none';
}

function hideError() {
  error.style.display = 'none';
}

function showResult(data) {
  resultHsCode.textContent = data.hsCode;
  resultContent.textContent = data.content;
  
  result.style.display = 'block';
  error.style.display = 'none';
  noResult.style.display = 'none';
}

function showNoResult() {
  noResult.style.display = 'block';
  result.style.display = 'none';
  error.style.display = 'none';
}

// Utility function to format HS codes
function formatHsCode(code) {
  const clean = code.replace(/\./g, '');
  if (clean.length >= 8) {
    return `${clean.slice(0, 4)}.${clean.slice(4, 6)}.${clean.slice(6, 8)}`;
  }
  return code;
}

// Server Configuration Functions
function loadServerConfig() {
  const savedUrl = localStorage.getItem('hs_server_url');
  if (savedUrl) {
    serverUrlInput.value = savedUrl;
    updateApiBaseUrl();
  }
}

function saveServerConfig() {
  const url = serverUrlInput.value.trim();
  localStorage.setItem('hs_server_url', url);
}

function updateApiBaseUrl() {
  const url = serverUrlInput.value.trim();
  if (url) {
    API_BASE_URL = url.replace(/\/$/, ''); // Remove trailing slash
  }
}

// Test Connection Function
async function handleTestConnection() {
  const url = serverUrlInput.value.trim();
  
  if (!url) {
    showConnectionStatus('Please enter a server URL', 'error');
    return;
  }
  
  // Validate URL format
  try {
    new URL(url);
  } catch (e) {
    showConnectionStatus('Invalid URL format', 'error');
    return;
  }
  
  showConnectionStatus('Testing connection...', 'testing');
  testConnectionButton.disabled = true;
  
  try {
    updateApiBaseUrl();
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'OK') {
        showConnectionStatus('✅ Connection successful!', 'success');
        saveServerConfig();
      } else {
        showConnectionStatus('❌ Server responded but not healthy', 'error');
      }
    } else {
      showConnectionStatus(`❌ Server error: ${response.status}`, 'error');
    }
    
  } catch (err) {
    console.error('Connection test error:', err);
    if (err.name === 'AbortError') {
      showConnectionStatus('❌ Connection timeout - server may be slow or blocked', 'error');
    } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      showConnectionStatus('❌ Cannot reach server - check URL and firewall', 'error');
    } else {
      showConnectionStatus('❌ Connection failed - check server is running', 'error');
    }
  } finally {
    testConnectionButton.disabled = false;
  }
}

function showConnectionStatus(message, type) {
  connectionStatus.textContent = message;
  connectionStatus.className = `connection-status ${type}`;
  
  // Auto-hide success messages after 3 seconds
  if (type === 'success') {
    setTimeout(() => {
      connectionStatus.textContent = '';
      connectionStatus.className = 'connection-status';
    }, 3000);
  }
}
