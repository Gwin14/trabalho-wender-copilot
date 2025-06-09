// Serviços para chamadas à API REST do backend2025-pizzademo
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "/api"; // Ajuste para proxy

// Dados mockados para fallback
const mockMenu = [
  {
    id: 1,
    nome: "Margherita",
    preco: 30,
    descricao: "Molho de tomate, mussarela e manjericão.",
  },
  {
    id: 2,
    nome: "Calabresa",
    preco: 35,
    descricao: "Calabresa, cebola e mussarela.",
  },
  {
    id: 3,
    nome: "Quatro Queijos",
    preco: 40,
    descricao: "Mussarela, parmesão, gorgonzola e catupiry.",
  },
];

let mockId = 4;

const withFallback = (apiCall, fallback) => {
  return new Promise((resolve, reject) => {
    apiCall()
      .then(resolve)
      .catch(() => resolve(fallback()));
  });
};

export const getMenu = async () => {
  return withFallback(
    () => axios.get(`${API_BASE_URL}/menu`),
    () => ({ data: mockMenu })
  );
};

export const getMenuItem = async (id) => {
  return withFallback(
    () => axios.get(`${API_BASE_URL}/menu/${id}`),
    () => {
      const item = mockMenu.find((i) => i.id === Number(id));
      return { data: item || null };
    }
  );
};

export const addMenuItem = async (item) => {
  return withFallback(
    () => axios.post(`${API_BASE_URL}/menu`, item),
    () => {
      const newItem = { ...item, id: mockId++ };
      mockMenu.push(newItem);
      return { data: newItem };
    }
  );
};

export const updateMenuItem = async (id, item) => {
  return withFallback(
    () => axios.put(`${API_BASE_URL}/menu/${id}`, item),
    () => {
      const idx = mockMenu.findIndex((i) => i.id === Number(id));
      if (idx !== -1) {
        mockMenu[idx] = { ...mockMenu[idx], ...item };
        return { data: mockMenu[idx] };
      }
      return { data: null };
    }
  );
};

export const deleteMenuItem = async (id) => {
  return withFallback(
    () => axios.delete(`${API_BASE_URL}/menu/${id}`),
    () => {
      const idx = mockMenu.findIndex((i) => i.id === Number(id));
      if (idx !== -1) mockMenu.splice(idx, 1);
      return { data: true };
    }
  );
};
