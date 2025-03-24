# Project Next.js 14 dengan Zustand, React Query (TanStack), dan ShadCN

## 📌 Pendahuluan
Proyek ini menggunakan **Next.js 14** sebagai kerangka kerja utama, dengan **Zustand** untuk manajemen state, **React Query (TanStack)** untuk pengelolaan data asinkron, dan **ShadCN** untuk komponen UI yang modern dan fleksibel.

## 🛠️ Teknologi yang Digunakan
- [Next.js 14](https://nextjs.org/) - Framework React untuk aplikasi web modern.
- [Zustand](https://zustand-demo.pmnd.rs/) - Manajemen state yang ringan dan fleksibel.
- [React Query (TanStack)](https://tanstack.com/query/latest) - Manajemen data server-side yang efisien.
- [ShadCN](https://ui.shadcn.com/) - Komponen UI berbasis Radix dan Tailwind CSS.

## 🚀 Instalasi
Pastikan Anda sudah menginstal **Node.js** dan **pnpm/npm/yarn** sebelum memulai.

1. Clone repositori ini:
   ```sh
   git clone https://github.com/username/repository.git
   cd repository
   ```

2. Install dependensi:
   ```sh
   pnpm install  # atau npm install / yarn install
   ```

3. Jalankan proyek dalam mode pengembangan:
   ```sh
   pnpm dev  # atau npm run dev / yarn dev
   ```

4. Buka browser dan akses **http://localhost:3000**.

## 🏗️ Penggunaan
### Manajemen State dengan Zustand
Buat file di `store/useExampleStore.ts`:
```ts
import { create } from 'zustand';

type ExampleState = {
  count: number;
  increment: () => void;
};

export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```
Penggunaan dalam komponen:
```tsx
import { useExampleStore } from '@/store/useExampleStore';

export default function Counter() {
  const { count, increment } = useExampleStore();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment} className="btn">Tambah</button>
    </div>
  );
}
```

### Fetching Data dengan React Query (TanStack)
Buat file di `lib/api.ts`:
```ts
export const fetchData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Gagal mengambil data');
  return res.json();
};
```
Penggunaan dalam komponen:
```tsx
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/lib/api';

export default function DataList() {
  const { data, error, isLoading } = useQuery({ queryKey: ['posts'], queryFn: fetchData });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Menggunakan Komponen UI dari ShadCN
Pastikan telah menginstal ShadCN:
```sh
pnpm dlx shadcn-ui@latest init
```
Contoh penggunaan tombol:
```tsx
import { Button } from '@/components/ui/button';

export default function ExampleButton() {
  return <Button variant="outline">Klik Saya</Button>;
}
```

## ✅ TODO
- [x] Setup Next.js 14
- [x] Integrasi Zustand untuk state management
- [x] Implementasi React Query (TanStack) untuk fetching data
- [x] Konfigurasi ShadCN untuk komponen UI
- [ ] Tambahkan autentikasi dengan NextAuth
- [ ] Implementasi dark mode

## 📜 Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

Selamat ngoding! 🚀

