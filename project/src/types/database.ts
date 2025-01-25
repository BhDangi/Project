export interface Supplier {
  id: string;
  name: string;
  contact_email: string;
  phone: string;
  categories: string[];
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  supplier_id: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  query: string;
  response: string;
  created_at: string;
}