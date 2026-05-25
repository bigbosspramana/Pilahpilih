import Button from "@/views/components/Button/button";

interface BuyerProps {
  userName: string | null;
  products: any[];
  onLogout: () => void;
}

export default function BuyerDashboard({ userName, products, onLogout }: BuyerProps) {
  const addToCart = (productId: number) => {
    // Sesuai endpoint POST api/cart di dokumentasi
    alert(`Produk ID ${productId} berhasil ditambahkan ke keranjang!`);
  };

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h2>Halo, {userName}! 👋</h2>
          <p style={{ color: "#666" }}>Mau belanja bahan pangan organik apa hari ini?</p>
        </div>
        <Button variant="ghost" onClick={onLogout}>Keluar</Button>
      </div>

      {/* Kategori Pilihan */}
      <h3 style={{ marginBottom: "16px" }}>Kategori Pilihan</h3>
      <div style={{ display: "flex", gap: "12px", marginBottom: "40px", overflowX: "auto", paddingBottom: "8px" }}>
        {["Sayuran", "Buah-buahan", "Telur", "Daging", "Rempah"].map((kat) => (
          <div key={kat} style={{ padding: "12px 24px", background: "#e8f5e9", color: "#2e7d32", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" }}>
            {kat}
          </div>
        ))}
      </div>

      {/* Katalog Produk */}
      <h3>Katalog Produk Segar</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px", marginTop: "16px" }}>
        {products.length === 0 ? (
          <p style={{ color: "#999" }}>Belum ada produk di etalase.</p>
        ) : (
          products.map((prod) => (
            <div key={prod.id} style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "140px", background: "#f5f5f5", borderRadius: "8px", marginBottom: "12px" }}></div>
              <h4 style={{ margin: "0 0 8px 0" }}>{prod.name}</h4>
              <p style={{ margin: "0 0 12px 0", color: "#e65100", fontWeight: "bold" }}>Rp {prod.price_per_kg}/kg</p>
              <Button variant="primary" onClick={() => addToCart(prod.id)}>
                + Keranjang
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}