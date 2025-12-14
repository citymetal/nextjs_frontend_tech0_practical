"use client";
export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import { fetchCustomer } from "../../fetchCustomers";

// 外側：ページ本体（ここではフックを使わない）
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmPageContent />
    </Suspense>
  );
}

// 内側：実際の画面ロジック（ここでフックを使う）
function ConfirmPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      try {
        const customerData = await fetchCustomer(customer_id);
        setCustomer(customerData);
      } catch (e) {
        console.error(e);
        setError("顧客情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    if (customer_id) {
      fetchAndSetCustomer();
    } else {
      setError("customer_id が指定されていません");
      setLoading(false);
    }
  }, [customer_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="card bordered bg-white border-red-200 border-2 max-w-sm m-4">
        <div className="alert alert-error p-4 text-center">{error}</div>
        <button onClick={() => router.push("/customers")}>
          <div className="btn btn-primary m-4 text-2xl">戻る</div>
        </button>
      </div>
    );
  }

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        正常に作成しました
      </div>
      {customer && <OneCustomerInfoCard {...customer} />}
      <button onClick={() => router.push("/customers")}>
        <div className="btn btn-primary m-4 text-2xl">戻る</div>
      </button>
    </div>
  );
}
