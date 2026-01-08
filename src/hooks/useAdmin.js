import { useEffect, useState } from "react";

const USER_API = "https://6957da9df7ea690182d34812.mockapi.io/users";

export const useAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(USER_API);
        const users = await res.json();

        const adminUser = users.find(u => u.role === "admin");
        setAdmin(adminUser || null);
      } catch (err) {
        console.error("Gagal mengambil data admin", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  return { admin, loading };
};