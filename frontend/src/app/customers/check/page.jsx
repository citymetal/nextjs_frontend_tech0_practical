"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import fetchCustomer from "../fetchCustomers";  // ← パスは必要に応じ修正
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

// ---------------------
// ページ本体（ビルド時に動く）
// ---------------------
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckPageContent />
    </Suspense>
  );
}

// ---------------------
// CSR 専用コンポーネント（ビルド時には実行されない）
// ---------------------
function CheckPageContent() {
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");

  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCustomer(customer_id);
        setCustomer(data);
      } catch (err) {
        setError("顧客情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [customer_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        顧客情報の確認
      </div>
      <OneCustomerInfoCard {...customer} />
    </div>
  );
}
