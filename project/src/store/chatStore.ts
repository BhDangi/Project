import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { ChatMessage, Product, Supplier } from '../types/database';

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  addMessage: (query: string) => Promise<void>;
  fetchHistory: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  addMessage: async (query: string) => {
    set({ isLoading: true, error: null });
    try {
      // Search products and suppliers based on query
      const searchTerm = query.toLowerCase();
      
      const { data: products } = await supabase
        .from('products')
        .select('*, suppliers(*)')
        .or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);

      const { data: suppliers } = await supabase
        .from('suppliers')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,categories.cs.{${searchTerm}}`);

      // Generate response based on search results
      let response = '';
      if (products?.length || suppliers?.length) {
        response = `Here's what I found:\n\n`;
        if (products?.length) {
          response += `Products:\n${products.map(p => `- ${p.name} (${p.brand}) - $${p.price}`).join('\n')}\n\n`;
        }
        if (suppliers?.length) {
          response += `Suppliers:\n${suppliers.map(s => `- ${s.name} (Categories: ${s.categories.join(', ')})`).join('\n')}`;
        }
      } else {
        response = "I couldn't find any matching products or suppliers. Please try a different search term.";
      }

      // Save chat message
      const { data: message } = await supabase
        .from('chat_history')
        .insert({
          query,
          response,
          user_id: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();

      if (message) {
        set(state => ({
          messages: [...state.messages, message],
          isLoading: false
        }));
      }
    } catch (error) {
      set({ error: 'Failed to process your request. Please try again.', isLoading: false });
    }
  },

  fetchHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await supabase
        .from('chat_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        set({ messages: data, isLoading: false });
      }
    } catch (error) {
      set({ error: 'Failed to fetch chat history', isLoading: false });
    }
  }
}));