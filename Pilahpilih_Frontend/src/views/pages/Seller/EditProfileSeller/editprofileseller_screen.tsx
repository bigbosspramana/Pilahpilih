import React, { useState } from 'react';
import MainLayout from '@/views/layouts/MainLayout/main_layout';
import styles from './editprofileseller_screen.module.css';

// Import Icons Lokal
import iconCheckHeader from '@/assets/icons/icon-check-green.svg';
import iconCamera from '@/assets/icons/icon-camera.svg';
import iconLocation from '@/assets/icons/icon-location.svg';

export default function EditProfileSeller() {
  // State untuk form profile supplier
  const [formData, setFormData] = useState({
    supplierName: 'Hartono Palimbungan',
    phone: '812 3456 7890',
    description: 'Petani lokal spesialis sayuran hidroponik dan buah organik segar langsung dari kebun.',
    address: 'Jl. Dirgantara No.100, Paropo, Kec. Panakkukang, Kota Makassar, Sulawesi Selatan 90231'
  });

  // State untuk kategori produk utama toko
  const [categories, setCategories] = useState<string[]>(['Sayur', 'Buah']);

  // Avatar Image (Mock)
  const avatarUrl = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (catId: string) => {
    setCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(c => c !== catId) 
        : [...prev, catId]
    );
  };

  const handleSave = () => {
    console.log("Data Profil Supplier Disimpan:", { ...formData, categories });
    // TODO: Integrasi ke backend
  };

  return (
    <MainLayout
      title="Edit Profile"
      alignLeft={true}
      hideBackButton={false}
      noShadow={false}
    >
      <div className={styles.container}>
        
        {/* 1. Images Section (Hanya Avatar) */}
        <div className={styles.imagesSection}>
          <div className={styles.avatarWrapper}>
            <img src={avatarUrl} alt="Profile" className={styles.avatar} />
            <button className={styles.avatarCameraBtn} aria-label="Ubah Foto">
              <img src={iconCamera} alt="Camera" className={styles.cameraIcon} />
            </button>
          </div>
          <p className={styles.accountType}>SUPPLIER ACCOUNT</p>
        </div>

        {/* 2. Nama Supplier */}
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>NAMA PENJUAL / TOKO</label>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                name="supplierName"
                value={formData.supplierName}
                onChange={handleInputChange}
                className={styles.inputField} 
              />
            </div>
          </div>
        </div>

        {/* 3. Nomor Telepon */}
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>NOMOR TELEPON</label>
            <div className={styles.inputWrapper}>
              <span className={styles.phonePrefix}>+62</span>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.inputField} 
              />
            </div>
          </div>
        </div>

        {/* 4. Deskripsi Singkat Toko */}
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>DESKRIPSI TOKO</label>
            <div className={styles.inputWrapper}>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`${styles.inputField} ${styles.textareaField}`} 
                placeholder="Ceritakan tentang hasil tani Anda..."
              />
            </div>
          </div>
        </div>

        {/* 5. Alamat Toko / Kebun */}
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label className={styles.label}>ALAMAT PENGAMBILAN / KEBUN</label>
              <button type="button" className={styles.pinPointBtn}>
                <img src={iconLocation} alt="Pin" className={styles.pinIcon} />
                Pin Point
              </button>
            </div>
            <div className={styles.inputWrapper}>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`${styles.inputField} ${styles.textareaField}`} 
              />
            </div>
          </div>
        </div>

        {/* 6. Kategori Produk Utama */}
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>KATEGORI PRODUK UTAMA</label>
            <div className={styles.categoryList}>
              {['Sayur', 'Buah', 'Umbi-umbian', 'Rempah', 'Biji-bijian'].map(cat => (
                <button 
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`${styles.catPill} ${categories.includes(cat) ? styles.catPillActive : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Action */}
      <div className={styles.bottomAction}>
        <button onClick={handleSave} className={styles.saveBtn}>
          Simpan Perubahan
        </button>
      </div>
      
    </MainLayout>
  );
}