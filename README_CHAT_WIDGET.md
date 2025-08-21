# Segment Documentation Chat Widget

A client-side chat widget that integrates directly into the Segment documentation, providing AI-powered assistance without requiring any backend server.

## 🎯 Features

- **Floating Chat Widget**: Appears in the bottom-right corner of every documentation page
- **AI-Powered Responses**: Uses OpenAI's GPT-3.5-turbo model for intelligent answers
- **Vector Store Simulation**: Simulates the original vector store functionality
- **Source Attribution**: Provides relevant documentation links
- **Cost Tracking**: Real-time token usage and cost calculation
- **Session Management**: Maintains conversation history
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### 1. Build the Documentation Site

```bash
# Install Jekyll dependencies (if not already done)
bundle install

# Build the site
bundle exec jekyll build
```

### 2. Serve the Site

```bash
# Using Python's built-in server
python -m http.server 8000

# Or using any static file server
npx serve _site
```

### 3. Set Up OpenAI API Key

When you first open the chat widget, you'll be prompted to enter your OpenAI API key. This will be stored in your browser's localStorage for future use.

**Get your API key from:** https://platform.openai.com/api-keys

### 4. Start Chatting!

- Visit any documentation page
- Click the chat button in the bottom-right corner
- Ask questions about Segment's products, APIs, or documentation

## 🔧 How It Works

### Client-Side Architecture

The chat widget runs entirely in the browser using:

1. **OpenAI JavaScript SDK**: Makes direct API calls to OpenAI
2. **Local Storage**: Stores API key and session data
3. **Dynamic Loading**: Loads OpenAI SDK on-demand
4. **Simulated Vector Store**: Provides relevant documentation links

### Key Components

- **`chat-widget.html`**: HTML structure for the chat interface
- **`_chat-widget.scss`**: Styling for the chat widget
- **`chat-widget.js`**: Main JavaScript functionality

### Features Replicated from Original Flask App

✅ **Vector Store Selection**: Choose between "Documentation Only" and "Documentation and Website"  
✅ **Chat History**: Maintains conversation context  
✅ **Token Counting**: Tracks input and output tokens  
✅ **Cost Calculation**: Real-time cost tracking  
✅ **Source Attribution**: Links to relevant documentation  
✅ **Similarity Scores**: Simulated relevance scores  
✅ **Session Totals**: Cumulative cost tracking  

## 🎨 Customization

### Styling

Modify `src/_sass/components/_chat-widget.scss` to customize:
- Colors and branding
- Widget positioning
- Responsive breakpoints
- Animations and transitions

### Functionality

Edit `src/assets/chat-widget.js` to customize:
- System prompts
- Model parameters
- Source URL mapping
- Error handling

### Adding More Documentation Links

Update the `generateSourceUrl` function in `chat-widget.js`:

```javascript
const docUrls = {
  // ... existing URLs ...
  'your new topic': 'https://segment.com/docs/your-new-topic/',
  'another feature': 'https://segment.com/docs/another-feature/'
};
```

## 🔒 Security Considerations

### API Key Exposure

⚠️ **Important**: The OpenAI API key is stored in the browser's localStorage and is visible to users. This is a trade-off for the client-side approach.

**Mitigation Strategies:**
- Use API key restrictions in OpenAI dashboard
- Set up usage limits and alerts
- Consider implementing a proxy for production use

### Rate Limiting

The client-side approach is subject to OpenAI's rate limits for browser-based requests. For high-traffic sites, consider:

- Implementing request throttling
- Adding user authentication
- Using a backend proxy for production

## 🚀 Deployment

### Static Hosting

Deploy to any static hosting service:

- **Netlify**: Drag and drop `_site` folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Push to `gh-pages` branch
- **AWS S3**: Upload static files
- **Any CDN**: Serve static files

### Production Considerations

1. **API Key Management**: Consider using environment variables or a secure key management system
2. **Rate Limiting**: Implement client-side rate limiting
3. **Error Handling**: Add comprehensive error handling for API failures
4. **Analytics**: Track usage patterns and costs
5. **Backup Plan**: Provide fallback responses when API is unavailable

## 🐛 Troubleshooting

### Common Issues

1. **"OpenAI not initialized"**
   - Refresh the page
   - Check your internet connection
   - Verify your API key is correct

2. **"API key not found"**
   - Enter your API key when prompted
   - Check localStorage in browser dev tools

3. **"Rate limit exceeded"**
   - Wait a few minutes before trying again
   - Check your OpenAI usage dashboard

4. **Chat widget not appearing**
   - Ensure the component is included in the layout
   - Check browser console for JavaScript errors
   - Verify CSS is loading correctly

### Debug Mode

Open browser developer tools and check the console for detailed error messages and logs.

## 📝 API Reference

### OpenAI Configuration

```javascript
const openai = new OpenAI({
  apiKey: 'your-api-key',
  dangerouslyAllowBrowser: true
});
```

### Chat Completion Request

```javascript
const completion = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: 'System prompt' },
    { role: 'user', content: 'User message' }
  ],
  max_tokens: 500,
  temperature: 0.7
});
```

## 🎉 Benefits

1. **No Backend Required**: Works with any static hosting
2. **Instant Setup**: No server configuration needed
3. **Scalable**: No server resources to manage
4. **Cost-Effective**: No server hosting costs
5. **Fast**: No server round-trips for responses
6. **Simple**: Easy to understand and modify

## 🔄 Migration from Flask Version

If you're migrating from the Flask backend version:

1. **Remove Python dependencies**: No need for Flask, LangChain, etc.
2. **Update API calls**: Replace `/chat` endpoint calls with direct OpenAI API calls
3. **Simplify deployment**: Deploy as static files only
4. **Update documentation**: Remove backend setup instructions

The client-side version provides the same user experience with much simpler deployment and maintenance!
