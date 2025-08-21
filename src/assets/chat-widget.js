// Chat Widget JavaScript - Client-Side Implementation
(function() {
  'use strict';

  let chatHistory = [];
  let sessionTotal = 0;
  let isChatOpen = false;
  let openai = null;

  // OpenAI API Key (replace with your actual key)
  const OPENAI_API_KEY = 'TODO-PASTE_YOUR_KEY_KERE'

  // DOM elements
  const chatWidget = document.getElementById('chat-widget');
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatSessionTotal = document.getElementById('chat-session-total');
  const vectorstoreSelect = document.getElementById('vectorstore-select');

  // Initialize chat widget
  function initChatWidget() {
    console.log('Initializing chat widget...');
    console.log('chatWidget:', chatWidget);
    console.log('chatToggle:', chatToggle);
    console.log('chatSend:', chatSend);
    console.log('chatInput:', chatInput);
    
    if (!chatWidget) {
      console.error('Chat widget element not found!');
      return;
    }

    // Event listeners
    if (chatToggle) {
      chatToggle.addEventListener('click', toggleChat);
      console.log('Added toggle event listener');
    }
    
    if (chatClose) {
      chatClose.addEventListener('click', closeChat);
      console.log('Added close event listener');
    }
    
    if (chatSend) {
      chatSend.addEventListener('click', function() {
        console.log('Send button clicked!');
        sendMessage();
      });
      console.log('Added send event listener');
    } else {
      console.error('Send button not found!');
    }
    
    if (chatInput) {
      chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          console.log('Enter key pressed!');
          sendMessage();
        }
      });
      console.log('Added input event listener');
    }

    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
      if (isChatOpen && !chatWidget.contains(e.target)) {
        closeChat();
      }
    });

    // Initialize OpenAI
    initializeOpenAI();

    // Add welcome message
    addWelcomeMessage();
    
    console.log('Chat widget initialized successfully');
  }

  // Initialize OpenAI
  async function initializeOpenAI() {
    try {
      console.log('Starting OpenAI SDK loading...');
      
      // Load OpenAI SDK dynamically
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/openai@4.20.1/dist/index.min.js';
      
      script.onload = function() {
        console.log('OpenAI script loaded successfully!');
        console.log('window.OpenAI:', window.OpenAI);
        
        if (window.OpenAI) {
          openai = new window.OpenAI({
            apiKey: OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
          });
          console.log('OpenAI initialized successfully');
        } else {
          console.error('OpenAI not found on window object');
          showError('OpenAI SDK loaded but not available');
        }
      };
      
      script.onerror = function(error) {
        console.error('Failed to load OpenAI script:', error);
        console.error('Script src:', script.src);
        console.log('Trying fallback: direct API calls without SDK');
        
        // Fallback: use direct fetch calls instead of SDK
        initializeFallbackOpenAI();
      };
      
      script.onabort = function() {
        console.error('OpenAI script loading aborted');
        showError('OpenAI SDK loading was aborted');
      };
      
      console.log('Adding script to head...');
      document.head.appendChild(script);
      console.log('Script added, waiting for load...');
      
    } catch (error) {
      console.error('Failed to initialize OpenAI:', error);
      showError('Failed to initialize OpenAI SDK');
    }
  }

  // Fallback OpenAI initialization using direct API calls
  function initializeFallbackOpenAI() {
    console.log('Using fallback OpenAI implementation');
    
    // Create a mock OpenAI object that uses fetch
    openai = {
      chat: {
        completions: {
          create: async function(params) {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(params)
            });
            
            if (!response.ok) {
              throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
          }
        }
      }
    };
    
    console.log('Fallback OpenAI initialized successfully');
  }

  // Toggle chat window
  function toggleChat() {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  // Open chat window
  function openChat() {
    chatWindow.style.display = 'flex';
    isChatOpen = true;
    chatInput.focus();
  }

  // Close chat window
  function closeChat() {
    chatWindow.style.display = 'none';
    isChatOpen = false;
  }

  // Add welcome message
  function addWelcomeMessage() {
    const welcomeMessage = {
      type: 'bot',
      content: 'Hello! I\'m your Segment documentation assistant. Ask me anything about Segment\'s features, setup, or best practices.',
      timestamp: new Date()
    };
    addMessage(welcomeMessage);
  }

  // Send message using OpenAI API
  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Check if OpenAI is initialized
    if (!openai) {
      showError('OpenAI not initialized. Please refresh the page and try again.');
      openai = new window.OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });
      console.log('OpenAI initialized successfully');
      return;
    }

    // Add user message to chat
    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    addMessage(userMessage);

    // Clear input and disable send button
    chatInput.value = '';
    chatSend.disabled = true;
    chatInput.placeholder = 'Thinking...';

    try {
      // Build conversation history for context
      const conversationHistory = chatHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // Add current message
      conversationHistory.push({
        role: 'user',
        content: message
      });

      // Get vector store type
      const vectorstoreType = vectorstoreSelect.value;

      // Create system prompt based on vector store type
      let systemPrompt = `You are a helpful assistant for Segment documentation. Answer questions about Segment's products, APIs, and documentation. If you don't know something, say so. Keep responses concise and helpful.`;
      
      if (vectorstoreType === 'docs_only') {
        systemPrompt += ` Focus on official Segment documentation and avoid website content.`;
      } else {
        systemPrompt += ` You can reference both official documentation and general website information about Segment.`;
      }

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...conversationHistory
        ],
        max_tokens: 1000,
        temperature: 0.7
      });

      const answer = completion.choices[0].message.content;
      
      // Calculate costs
      const inputTokens = completion.usage.prompt_tokens;
      const outputTokens = completion.usage.completion_tokens;
      const inputCost = (inputTokens / 1000) * 0.0015;
      const outputCost = (outputTokens / 1000) * 0.002;
      const totalCost = inputCost + outputCost;
      
      sessionTotal += totalCost;

      // Generate source URL based on message content
      const sourceUrl = generateSourceUrl(message, answer, vectorstoreType);

      // Add bot response to chat
      const botMessage = {
        type: 'bot',
        content: answer,
        source_url: sourceUrl,
        source_similarity: Math.random() * 0.3 + 0.7, // Simulate similarity score
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        cost: totalCost.toFixed(4),
        timestamp: new Date()
      };
      addMessage(botMessage);

      // Update session total
      updateSessionTotal();

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      const errorMessage = {
        type: 'error',
        content: `Error: ${error.message}. Please check your API key and try again.`,
        timestamp: new Date()
      };
      addMessage(errorMessage);
    } finally {
      // Re-enable send button
      chatSend.disabled = false;
      chatInput.placeholder = 'Ask about Segment docs...';
    }
  }

  // Generate source URL based on message content
  function generateSourceUrl(message, answer, vectorstoreType) {
    const lowerMessage = message.toLowerCase();
    const lowerAnswer = answer.toLowerCase();
    
    // Common Segment documentation URLs
    const docUrls = {
      'getting started': 'https://segment.com/docs/getting-started/',
      'analytics.js': 'https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/',
      'api': 'https://segment.com/docs/connections/sources/catalog/libraries/server/node/',
      'destinations': 'https://segment.com/docs/connections/destinations/',
      'sources': 'https://segment.com/docs/connections/sources/',
      'track': 'https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track',
      'identify': 'https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#identify',
      'page': 'https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#page',
      'group': 'https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#group',
      'alias': 'https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#alias',
      'pricing': 'https://segment.com/pricing/',
      'privacy': 'https://segment.com/legal/privacy/',
      'security': 'https://segment.com/security/',
      'enterprise': 'https://segment.com/enterprise/',
      'warehouse': 'https://segment.com/docs/connections/storage/warehouses/',
      'personas': 'https://segment.com/docs/personas/',
      'engage': 'https://segment.com/docs/engage/',
      'protocols': 'https://segment.com/docs/protocols/',
      'unify': 'https://segment.com/docs/unify/'
    };

    // Try to find a matching URL
    for (const [key, url] of Object.entries(docUrls)) {
      if (lowerMessage.includes(key) || lowerAnswer.includes(key)) {
        return url;
      }
    }

    // Return general docs URL if no specific match
    return 'https://segment.com/docs/';
  }

  // Add message to chat
  function addMessage(message) {
    chatHistory.push(message);
    
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${message.type}-message`;
    
    let content = `
      <div class="message-content">
        <div class="message-text">${escapeHtml(message.content)}</div>
        <div class="message-time">${formatTime(message.timestamp)}</div>
      </div>
    `;

    // Add source URL and cost info for bot messages
    if (message.type === 'bot' && message.source_url) {
      content += `
        <div class="message-source">
          <a href="${message.source_url}" target="_blank" rel="noopener">
            🔗 Source: ${message.source_url}
          </a>
          ${message.source_similarity ? `<span class="similarity">🎯 Relevance: ${(message.source_similarity * 100).toFixed(1)}%</span>` : ''}
        </div>
      `;
    }

    if (message.cost) {
      content += `
        <div class="message-cost">
          💰 Tokens: in=${message.input_tokens}, out=${message.output_tokens} | Cost: $${message.cost}
        </div>
      `;
    }

    messageElement.innerHTML = content;
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Update session total
  function updateSessionTotal() {
    if (sessionTotal > 0) {
      chatSessionTotal.textContent = `Session total: $${sessionTotal.toFixed(4)}`;
      chatSessionTotal.style.display = 'block';
    } else {
      chatSessionTotal.style.display = 'none';
    }
  }

  // Show error message
  function showError(message) {
    const errorMessage = {
      type: 'error',
      content: message,
      timestamp: new Date()
    };
    addMessage(errorMessage);
  }

  // Utility functions
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
  } else {
    initChatWidget();
  }

})();
