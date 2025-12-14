export default function OneCustomerInfoCard(props) {
  if (!props) return null;               // ← ガード

  const {
    id,
    customer_id,
    customer_name,
    age,
    gender,
  } = props;

  // 以下は今まで通り
  return (
    <div className="card bordered bg-blue-100 max-w-sm m-4">
      {/* 表示内容 */}
    </div>
  );
}
