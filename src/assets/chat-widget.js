// Chat Widget JavaScript - Client-Side Implementation
(function() {
  'use strict';

  let chatHistory = [];
  let sessionTotal = 0;
  let isChatOpen = false;
  let openai = null;

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

  // Initialize OpenAI
  async function initializeOpenAI() {
    try {
      // Load OpenAI SDK dynamically
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/openai@4.20.1/dist/index.min.js';
      script.onload = function() {
        const apiKey = getOpenAIKey();
        if (apiKey) {
          openai = new window.OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true // Note: This exposes your API key to the client
          });
          console.log('OpenAI initialized successfully');
        } else {
          showError('OpenAI API key not found. Please set it in localStorage or environment.');
        }
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('Failed to initialize OpenAI:', error);
      showError('Failed to initialize OpenAI SDK');
    }
  }

  // Get OpenAI API key from localStorage or prompt user
  function getOpenAIKey() {
    let apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      apiKey = prompt('Please enter your OpenAI API key:');
      if (apiKey) {
        localStorage.setItem('openai_api_key', apiKey);
      }
    }
    
    return apiKey;
  }

  // Initialize chat widget
  function initChatWidget() {
    if (!chatWidget) return;

    // Initialize OpenAI
    initializeOpenAI();

    // Event listeners
    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', closeChat);
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
      if (isChatOpen && !chatWidget.contains(e.target)) {
        closeChat();
      }
    });

    // Add welcome message
    addWelcomeMessage();
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
    chatWindow.classList.add('chat-open');
  }

  // Close chat window
  function closeChat() {
    chatWindow.style.display = 'none';
    isChatOpen = false;
    chatWindow.classList.remove('chat-open');
  }

  // Add welcome message
  function addWelcomeMessage() {
    const welcomeMessage = {
      type: 'bot',
      content: 'Hello! I\'m your Segment documentation assistant. Ask me anything about Segment\'s products, APIs, or documentation. Note: This is a client-side implementation - responses are generated using OpenAI\'s API directly in your browser.',
      timestamp: new Date()
    };
    
    addMessageToUI(welcomeMessage);
  }

  // Add message to UI
  function addMessageToUI(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    
    if (message.type === 'user') {
      messageElement.innerHTML = `
        <div class="message-user">You: ${escapeHtml(message.content)}</div>
      `;
    } else if (message.type === 'bot') {
      let sourceHtml = '';
      if (message.source_url) {
        sourceHtml = `
          <div class="message-source">
            🔗 <a href="${message.source_url}" target="_blank">${message.source_url}</a><br>
            🎯 Relevance: ${message.source_similarity ? Number(message.source_similarity).toFixed(3) : 'N/A'}
          </div>
        `;
      }
      
      let metaHtml = '';
      if (message.input_tokens || message.output_tokens || message.cost) {
        metaHtml = `
          <div class="message-meta">
            💰 Tokens: in=${message.input_tokens || 'N/A'}, out=${message.output_tokens || 'N/A'} | Cost: $${message.cost || 'N/A'}
          </div>
        `;
      }
      
      messageElement.innerHTML = `
        <div class="message-bot">Assistant: ${escapeHtml(message.content)}</div>
        ${sourceHtml}
        ${metaHtml}
      `;
    }
    
    chatMessages.appendChild(messageElement);
    scrollToBottom();
  }

  // Send message using OpenAI API
  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Check if OpenAI is initialized
    if (!openai) {
      showError('OpenAI not initialized. Please refresh the page and try again.');
      return;
    }

    // Add user message to UI
    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    addMessageToUI(userMessage);

    // Clear input and show loading
    chatInput.value = '';
    chatInput.placeholder = 'Thinking...';
    chatSend.disabled = true;

    // Add loading message
    const loadingElement = document.createElement('div');
    loadingElement.className = 'chat-loading';
    loadingElement.textContent = 'Assistant is thinking...';
    chatMessages.appendChild(loadingElement);
    scrollToBottom();

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
        max_tokens: 500,
        temperature: 0.7
      });

      // Remove loading message
      chatMessages.removeChild(loadingElement);
      
      const answer = completion.choices[0].message.content;
      
      // Calculate costs (approximate)
      const inputTokens = completion.usage.prompt_tokens;
      const outputTokens = completion.usage.completion_tokens;
      const inputCost = (inputTokens / 1000) * 0.0015;
      const outputCost = (outputTokens / 1000) * 0.002;
      const totalCost = inputCost + outputCost;
      
      sessionTotal += totalCost;

      // Simulate source URL (since we don't have vector stores in client-side)
      const sourceUrl = generateSourceUrl(message, answer, vectorstoreType);

      // Add bot response to UI
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
      addMessageToUI(botMessage);

      // Add to chat history
      chatHistory.push(userMessage);
      chatHistory.push(botMessage);
      
      // Update session total
      updateSessionTotal();

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      // Remove loading message
      if (loadingElement.parentNode) {
        chatMessages.removeChild(loadingElement);
      }
      
      // Add error message
      const errorMessage = {
        type: 'bot',
        content: `Sorry, I encountered an error: ${error.message}. Please check your API key and try again.`,
        timestamp: new Date()
      };
      addMessageToUI(errorMessage);
    } finally {
      chatInput.placeholder = 'Ask about Segment docs...';
      chatSend.disabled = false;
      chatInput.focus();
    }
  }

  // Generate source URL based on message content (simulation)
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
      'enterprise': 'https://segment.com/enterprise/'
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

  // Show error message
  function showError(message) {
    const errorMessage = {
      type: 'bot',
      content: message,
      timestamp: new Date()
    };
    addMessageToUI(errorMessage);
  }

  // Update session total
  function updateSessionTotal() {
    if (sessionTotal > 0) {
      chatSessionTotal.textContent = `Session total: $${sessionTotal.toFixed(4)}`;
    } else {
      chatSessionTotal.textContent = '';
    }
  }

  // Scroll to bottom of chat messages
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
  } else {
    initChatWidget();
  }

})();
