import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { useChatStore } from './store/chatStore';

function App() {
  const { messages, isLoading, error, addMessage, fetchHistory } = useChatStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-xl bg-white shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Product & Supplier Assistant</h1>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500">
                  <p>No messages yet. Start by asking about products or suppliers!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    query={message.query}
                    response={message.response}
                    timestamp={message.created_at}
                  />
                ))
              )}
              {error && (
                <div className="rounded-lg bg-red-50 p-4 text-red-800">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-6 py-4">
            <ChatInput onSend={addMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;