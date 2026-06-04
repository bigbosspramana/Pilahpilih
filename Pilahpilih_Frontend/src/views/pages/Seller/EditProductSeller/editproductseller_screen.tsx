import React, { useState } from 'react';
import MainLayout from '@/views/layouts/MainLayout/main_layout';
import styles from './editproductseller_screen.module.css';

// Import Icons Lokal
import iconCamera from '@/assets/icons/icon-camera.svg';
import iconBulb from '@/assets/icons/icon-tips-black.svg';
import iconBox from '@/assets/icons/icon-inventory-off.svg';
import iconStarAI from '@/assets/icons/icon-sparkle-white.svg';
import iconSend from '@/assets/icons/icon-send-white.svg'; 

type AIState = 'idle' | 'prompting' | 'generating' | 'generated';

export default function EditProductSeller() {
  // INITIAL STATE SUDAH TERISI (MOCK DATA UNTUK EDIT)
  const [productName, setProductName] = useState('Tomat Cherry Matang (Rescued)');
  const [stock, setStock] = useState('24');
  const [price, setPrice] = useState('15000');
  const [description, setDescription] = useState('Tomat cherry hasil panen hari ini. Ukurannya sedikit lebih kecil dari standar supermarket, namun kematangannya sangat sempurna. Sangat cocok untuk dibuat saus atau pelengkap salad.');
  const [category, setCategory] = useState('Buah');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400&auto=format&fit=crop');

  // State untuk Fitur AI
  const [aiState, setAiState] = useState<AIState>('idle');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');

  // Fungsi Mensimulasikan AI Generating Text
  const handleGenerateAI = () => {
    if (!aiPrompt.trim()) return;
    setAiState('generating');
    setTimeout(() => {
      const fakeAiText = `Tomat cherry pilihan yang sangat segar! ${aiPrompt} - Pastikan hidangan restoran Anda selalu menggunakan bahan terbaik dari petani lokal kami.`;
      setAiResult(fakeAiText);
      setAiState('generated');
    }, 2000);
  };

  const applyAiText = () => {
    setDescription(aiResult);
    setAiState('idle');
    setAiPrompt('');
  };

  const cancelAiText = () => {
    setAiState('idle');
  };

  return (
    <MainLayout
      title="Pilahpilih" 
      alignLeft={true}
      hideBackButton={false}
      noShadow={false}
    >
      <div className={styles.container}>
        
        {/* Header */}
        <div>
          <h1 className={styles.headerTitle}>Edit Produk</h1>
          <p className={styles.headerDesc}>Perbarui informasi produk hasil panen Anda agar pembeli mendapat data terbaru.</p>
        </div>

        {/* 1. Upload Section (Menampilkan gambar existing) */}
        <div 
          className={styles.uploadBox}
          style={{ 
            backgroundImage: `url(${imageUrl})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        >
          {/* Overlay agar teks ganti foto tetap terlihat di atas gambar */}
          <div className={styles.uploadOverlay}></div>
          
          <div className={styles.uploadContent}>
            <div className={styles.cameraIconBox}>
              <img src={iconCamera} alt="Camera" className={styles.cameraIcon} />
            </div>
            <h2 className={styles.uploadTitle}>Ganti Foto Produk</h2>
            <p className={styles.uploadDesc}>Klik di sini untuk mengganti foto</p>
            <button className={styles.uploadBtn}>Pilih Berkas Baru</button>
          </div>
        </div>

        {/* 2. Tips Section */}
        <div className={styles.tipsBox}>
          <img src={iconBulb} alt="Tips" className={styles.bulbIcon} />
          <div className={styles.tipsContent}>
            <h3 className={styles.tipsTitle}>Tips Fotografi:</h3>
            <p className={styles.tipsText}>
              Gunakan cahaya alami dan latar belakang bersih untuk meningkatkan minat pembeli hingga 40%.
            </p>
          </div>
        </div>

        {/* 3. Form Input Data */}
        <div className={styles.formGroup}>
          <label className={styles.label}>NAMA PRODUK</label>
          <input 
            type="text" 
            className={styles.inputField}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>STOK (KG)</label>
            <div className={styles.inputWrapper}>
              <img src={iconBox} alt="Stock" className={styles.inputIcon} />
              <input 
                type="number" 
                className={`${styles.inputField} ${styles.inputWithIcon}`}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>HARGA PER KG</label>
            <div className={styles.inputWrapper}>
              <span className={styles.prefix}>Rp</span>
              <input 
                type="number" 
                className={`${styles.inputField} ${styles.inputWithIcon}`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 4. Deskripsi dengan Fitur AI */}
        <div className={styles.formGroup}>
          <label className={styles.label}>DESKRIPSI PRODUK</label>
          
          <div className={styles.textareaContainer}>
            <textarea 
              className={`${styles.inputField} ${styles.textareaField}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            
            {aiState === 'idle' && (
              <>
                <button 
                  type="button" 
                  className={styles.aiTriggerBtn}
                  onClick={() => setAiState('prompting')}
                >
                  <img src={iconStarAI} alt="AI" className={styles.aiStarIcon} />
                  Buat Ulang dengan AI
                </button>
                <span className={styles.charCount}>{description.length} / 1000</span>
              </>
            )}

            {/* Bubble Overlay AI System */}
            {aiState !== 'idle' && (
              <div className={styles.aiBubbleOverlay}>
                <div className={styles.aiPromptHeader}>
                  <span>Asisten AI PilahPilih</span>
                  <button className={styles.closeAiBtn} onClick={cancelAiText}>✕</button>
                </div>

                {(aiState === 'prompting' || aiState === 'generating') && (
                  <div className={styles.aiInputRow}>
                    <input 
                      type="text" 
                      placeholder={aiState === 'generating' ? "Sedang memikirkan..." : "Ketik instruksi tambahan untuk deskripsi..."}
                      className={styles.aiInput}
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      disabled={aiState === 'generating'}
                    />
                    <button 
                      className={styles.aiSendBtn} 
                      onClick={handleGenerateAI}
                      disabled={aiState === 'generating'}
                    >
                      <img src={iconSend} alt="Send" className={styles.sendIcon} />
                    </button>
                  </div>
                )}

                {aiState === 'generated' && (
                  <>
                    <div className={styles.aiResultText}>{aiResult}</div>
                    <div className={styles.aiActionRow}>
                      <button className={`${styles.aiActionBtn} ${styles.btnReject}`} onClick={cancelAiText}>
                        Batal
                      </button>
                      <button className={`${styles.aiActionBtn} ${styles.btnAccept}`} onClick={applyAiText}>
                        Ganti Deskripsi
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 5. Kategori */}
        <div className={styles.formGroup}>
          <label className={styles.label}>KATEGORI</label>
          <div className={styles.categoryList}>
            {['Sayur', 'Buah', 'Umbi-umbian', 'Rempah'].map(cat => (
              <button
                key={cat}
                type="button"
                className={`${styles.catPill} ${category === cat ? styles.catPillActive : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Action */}
      <div className={styles.bottomAction}>
        <button className={styles.saveBtn}>
          Simpan Perubahan
        </button>
      </div>

    </MainLayout>
  );
}