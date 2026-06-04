import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/views/layouts/MainLayout/main_layout';
import styles from './ordermanagementseller_screen.module.css';
import BottomNav from '@/views/components/BottomNavbar/bottomnav';

// Tipe Data untuk Struktur Pesanan
interface OrderItem {
  id: string;
  name: string;
  qty: string;
  pricePerUnit: number;
  totalPrice: number;
  imageUrl: string;
}

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  avatarUrl: string;
  status: 'Pesanan' | 'Diantar' | 'Selesai';
  items: OrderItem[];
  totalPayment: number;
}

export default function OrderManagementSeller() {
  const navigate = useNavigate();
  // State untuk Tab Aktif
  const [activeTab, setActiveTab] = useState<'Semua' | 'Pesanan' | 'Diantar' | 'Selesai'>('Pesanan');

  // Helper Format Rupiah
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  // Data Mockup (Sesuai Gambar 1)
  const ordersData: Order[] = [
    {
      id: '1',
      orderId: '#OD1-121201',
      customerName: 'Budi Santoso',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
      status: 'Pesanan',
      totalPayment: 72500,
      items: [
        {
          id: 'i1',
          name: 'Kentang Bandung',
          qty: '5 kg',
          pricePerUnit: 8500,
          totalPrice: 42500,
          imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=200&auto=format&fit=crop'
        },
        {
          id: 'i2',
          name: 'Tomat Cherry Matang',
          qty: '2 kg',
          pricePerUnit: 15000,
          totalPrice: 30000,
          imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=200&auto=format&fit=crop'
        }
      ]
    },
    {
      id: '2',
      orderId: '#OD1-121202',
      customerName: 'Michelle Santoso',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      status: 'Pesanan',
      totalPayment: 75000,
      items: [
        {
          id: 'i3',
          name: 'Tomat Cherry Matang',
          qty: '3 kg',
          pricePerUnit: 25000,
          totalPrice: 75000,
          imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=200&auto=format&fit=crop'
        }
      ]
    },
    {
      id: '3',
      orderId: '#OD1-121202',
      customerName: 'Michelle Santoso',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      status: 'Diantar',
      totalPayment: 75000,
      items: [
        {
          id: 'i3',
          name: 'Tomat Cherry Matang',
          qty: '3 kg',
          pricePerUnit: 25000,
          totalPrice: 75000,
          imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=200&auto=format&fit=crop'
        }
      ]
    },
    {
      id: '4',
      orderId: '#OD1-121202',
      customerName: 'Michelle Santoso',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      status: 'Selesai',
      totalPayment: 75000,
      items: [
        {
          id: 'i3',
          name: 'Tomat Cherry Matang',
          qty: '3 kg',
          pricePerUnit: 25000,
          totalPrice: 75000,
          imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=200&auto=format&fit=crop'
        }
      ]
    }
  ];

  // Logika Filter Tab
  const filteredOrders = activeTab === 'Semua' 
    ? ordersData 
    : ordersData.filter(order => order.status === activeTab);

  // Menghitung jumlah badge per status (opsional untuk UI Tab)
  const countPesanan = ordersData.filter(o => o.status === 'Pesanan').length;

  return (
    <MainLayout
      title="Pilahpilih" // Kosongkan title karena kita buat custom header di bawah
      alignLeft={true}
      hideBackButton={true}
      noShadow={false}
      rightProfile="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
    >
      <div className={styles.container}>
        
        {/* Header & Judul */}
        <div className={styles.headerSection}>
          <p className={styles.portalLabel}>SUPPLIER PORTAL</p>
          <h1 className={styles.pageTitle}>Manajemen<br/>Pesanan</h1>
        </div>

        {/* Tab Navigasi */}
        <div className={styles.tabContainer}>
          {['Semua', 'Pesanan', 'Diantar', 'Selesai'].map((tab) => (
            <button 
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab}
              {/* Hanya tampilkan badge angka untuk 'Pesanan' sebagai contoh */}
              {tab === 'Pesanan' && (
                <span className={`${styles.tabBadge} ${activeTab !== 'Pesanan' ? styles.tabBadgeInactive : ''}`}>
                  {countPesanan}
                </span>
              )}
              {tab === 'Diantar' && (
                <span className={`${styles.tabBadge} ${activeTab !== 'Diantar' ? styles.tabBadgeInactive : ''}`}>
                  {ordersData.filter(o => o.status === 'Diantar').length}
                </span>
              )}
              {tab === 'Selesai' && (
                <span className={`${styles.tabBadge} ${activeTab !== 'Selesai' ? styles.tabBadgeInactive : ''}`}>
                  {ordersData.filter(o => o.status === 'Selesai').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Daftar Pesanan */}
        {filteredOrders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            
            {/* Customer Info */}
            <div className={styles.customerHeader}>
              <div className={styles.customerInfo}>
                <img src={order.avatarUrl} alt={order.customerName} className={styles.avatar} />
                <div>
                  <h2 className={styles.name}>{order.customerName}</h2>
                  <p className={styles.orderId}>ID Pesanan: {order.orderId}</p>
                </div>
              </div>
              <span className={styles.statusBadge}>{order.status}</span>
            </div>

            {/* Item List */}
            <div className={styles.itemList}>
              {order.items.map(item => (
                <div key={item.id} className={styles.itemRow}>
                  <img src={item.imageUrl} alt={item.name} className={styles.itemImg} />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemQty}>{item.qty} x {formatRupiah(item.pricePerUnit)}</p>
                  </div>
                  <p className={styles.itemPrice}>{formatRupiah(item.totalPrice)}</p>
                </div>
              ))}
            </div>

            {/* Divider Dashed */}
            <div className={styles.divider}></div>

            {/* Total Pembayaran */}
            <div className={styles.totalSection}>
              <p className={styles.totalLabel}>Total Pembayaran</p>
              <h3 className={styles.totalValue}>{formatRupiah(order.totalPayment)}</h3>
            </div>

            {/* Action Button */}
            <button 
              className={styles.detailBtn}
              onClick={() => navigate(`/supplier/order/${order.id}`)} // Route ke halaman detail
            >
              Lihat Detail
            </button>

          </div>
        ))}

        <BottomNav activeTab="order" role='seller'/>
      </div>
    </MainLayout>
  );
}