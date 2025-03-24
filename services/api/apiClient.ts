export const apiClient = async <T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any
  ): Promise<T> => {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Terjadi kesalahan');
    }
  
    return res.json();
  };
  