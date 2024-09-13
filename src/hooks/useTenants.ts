import { useState, useCallback } from "react";
import { getTenantByEmail } from "@/db/tenants";

interface Tenant {
  id: string;
  name: string;
  subdomain: string;
}

export const useTenantByEmail = () => {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTenantByEmail = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/v1/tenant/get?email=${encodeURIComponent(email)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tenant");
      }
      const fetchedTenant = await response.json();
      setTenant(fetchedTenant);
    } catch (err) {
      setError("Error fetching tenant");
      console.error("Error fetching tenant:", err);
      setTenant(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { tenant, loading, error, fetchTenantByEmail };
};
