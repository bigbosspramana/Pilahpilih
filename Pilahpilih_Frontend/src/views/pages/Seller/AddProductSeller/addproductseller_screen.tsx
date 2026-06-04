import React, { useState } from 'react';
import MainLayout from '@/views/layouts/MainLayout/main_layout';
import styles from './addproductseller_screen.module.css';

// Import Icons Lokal
import iconCamera from '@/assets/icons/icon-add-photo.svg';
import iconBulb from '@/assets/icons/icon-tips-black.svg'; // Lampu untuk tips
import iconBox from '@/assets/icons/icon-inventory-off.svg'; // Box untuk stok
import iconStarAI from '@/assets/icons/icon-sparkle-white.svg'; // Bintang untuk AI
import iconSend from '@/assets/icons/icon-send-white.svg'; 

type AIState = 'idle' | 'prompting' | 'generating' | 'generated';

export default function AddProductSeller() {
  const [productName, setProductName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Sayur');

  // State untuk Fitur AI
  const [aiState, setAiState] = useState<AIState>('idle');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');

  // Fungsi Mensimulasikan AI Generating Text
  const handleGenerateAI = () => {
    if (!aiPrompt.trim()) return;
    
    setAiState('generating');
    
    // Simulasi delay API AI (2 detik)
    setTimeout(() => {
      const fakeAiText = `Sayuran segar yang dipanen langsung dari petani lokal. Menggunakan metode penanaman organik tanpa pestisida kimia. ${aiPrompt} - sangat cocok untuk hidangan sehat keluarga Anda.`;
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
          <h1 className={styles.headerTitle}>Tambah Produk Baru</h1>
          <p className={styles.headerDesc}>Lengkapi detail produk hasil panen pilihan Anda.</p>
        </div>

        {/* 1. Upload Section */}
        <div className={styles.uploadBox}>
          <div className={styles.uploadContent}>
            <div className={styles.cameraIconBox}>
              <img src={iconCamera} alt="Camera" className={styles.cameraIcon} />
            </div>
            <h2 className={styles.uploadTitle}>Unggah Foto Produk</h2>
            <p className={styles.uploadDesc}>Rekomendasi format 1:1, ukuran maksimal 5MB</p>
            <button className={styles.uploadBtn}>Pilih Berkas</button>
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
            placeholder="Contoh: Apel Malang Grade B (Rescued)"
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
                placeholder="0"
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
                placeholder="15.000"
                className={`${styles.inputField} ${styles.inputWithIcon}`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 4. Deskripsi dengan Fitur AI di Dalam Container */}
        <div className={styles.formGroup}>
          <label className={styles.label}>DESKRIPSI PRODUK</label>
          
          <div className={styles.textareaContainer}>
            <textarea 
              placeholder="Ceritakan keistimewaan produk Anda di sini..."
              className={`${styles.inputField} ${styles.textareaField}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            
            {/* Hanya tampilkan tombol AI dan karakter count jika AI sedang tidak aktif */}
            {aiState === 'idle' && (
              <>
                <button 
                  type="button" 
                  className={styles.aiTriggerBtn}
                  onClick={() => setAiState('prompting')}
                >
                  <img src={iconStarAI} alt="AI" className={styles.aiStarIcon} />
                  Buat dengan AI
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

                {/* State: Prompting */}
                {(aiState === 'prompting' || aiState === 'generating') && (
                  <div className={styles.aiInputRow}>
                    <input 
                      type="text" 
                      placeholder={aiState === 'generating' ? "Sedang membuat..." : "Ketik keunggulan produk (misal: manis, segar)..."}
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

                {/* State: Generated */}
                {aiState === 'generated' && (
                  <>
                    <div className={styles.aiResultText}>{aiResult}</div>
                    <div className={styles.aiActionRow}>
                      <button className={`${styles.aiActionBtn} ${styles.btnReject}`} onClick={cancelAiText}>
                        Batal
                      </button>
                      <button className={`${styles.aiActionBtn} ${styles.btnAccept}`} onClick={applyAiText}>
                        Gunakan
                      </button>
                    </div>
                  </>
                )}

              </div>
            )}
          </div>
        </div>

        {/* 5. Kategori (Pills) */}
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
          Simpan Produk
        </button>
      </div>

    </MainLayout>
  );
}