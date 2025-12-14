"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState } from "react";
import fetchCustomers from "./fetchCustomers";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCustomers();
        console.log("Fetched customers:", data);
        setCustomers(data);
      } catch (e) {
        console.error(e);
        setError("顧客情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div className="p-4">読み込み中です…</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div>
      {/* 上部バー */}
      <div className="navbar bg-blue-100">
        <div className="flex-1 px-4 text-2xl font-bold">Create</div>
        <div className="flex-none px-4">
          <Link href="/customers/create">
            <button className="btn btn-primary">Create</button>
          </Link>
        </div>
      </div>

      {/* 顧客カード一覧 */}
      <div className="flex flex-wrap gap-10 p-10">
        {customers.map((customer) => (
          <div
            key={customer.customer_id}
            className="card bg-white border-blue-200 border-2 p-6 flex flex-row gap-6 items-start max-w-xl shadow-sm rounded-xl"
          >
            {/* 左：水色の顧客情報エリア（縦長＋ボタンと同色） */}
            <div className="flex-1 bg-blue-100 rounded-lg p-4 min-h-[160px]">
              <h2 className="card-title">{customer.customer_name} </h2>
              <p>Customer ID: {customer.customer_id}</p>
              <p>Age: {customer.age}</p>
              <p>Gender: {customer.gender}</p>
            </div>

            {/* 右：ボタン（背景色を情報エリアと統一） */}
            <div className="flex flex-col gap-3">
              <Link href={`/customers/read/${customer.customer_id}`}>
                <button className="btn w-20 border-0 bg-blue-100 text-black hover:bg-blue-300">
                  Read
                </button>
              </Link>

              <Link href={`/customers/update/${customer.customer_id}`}>
                <button className="btn w-20 border-0 bg-blue-100 text-black hover:bg-blue-300">
                  Update
                </button>
              </Link>

              <Link href={`/customers/delete/${customer.customer_id}`}>
                <button className="btn w-20 border-0 bg-blue-100 text-black hover:bg-blue-300">
                  Delete
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


