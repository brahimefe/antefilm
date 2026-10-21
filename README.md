# antefilm.com — kullanım kılavuzu

El yazımı statik site. GitHub deposu (`brahimefe/antefilm`, dal `main`) Hostinger'da
**antefilm.com** sitesine bağlıdır; `main`'e yapılan her push sitenin `public_html`
klasörüne otomatik dağıtılır. Dosyaları artık File Manager ile elle yüklemeye gerek yok.

> Dikkat: Bu depo yalnızca antefilm.com'a bağlı olmalı. webdipnot deposu
> webdipnot.com'a bağlıdır; ikisini karıştırmayın.

## Dosya yapısı

**Sitede yayımlananlar:**
```
index.html        — ana sayfa
cases.html        — vakaların tamamı, filtreli liste + vaka detayı
method.html       — kriter + protokol açıklaması
about.html        — proje, yazar, atıf bilgisi
submit.html       — dışarıdan vaka önerisi formu (e-posta ile)
antefilm.css      — ortak stil
cases.js          — TÜM vaka içeriği (tek doğruluk kaynağı)
schema.json       — vaka veri modeli (JSON Schema)
```

**Depoda duran ama sitede açılmayanlar** (`.htaccess` erişimi engeller):
```
_new-case.html    — yeni vaka ekleme aracı (yerel form; bilgisayarında aç)
README.md         — bu dosya
```

## Yeni vaka eklemek — en kolay yol

1. Bilgisayarında `_new-case.html` dosyasını çift tıkla, tarayıcıda açılır
2. Formu doldur (başlık, yönetmen, beş dikkat, kaynaklar, gloss)
3. **▸ generate code** butonuna bas
4. Çıkan kod kutusunda **▸ copy to clipboard** butonuna bas
5. `cases.js` dosyasını text editöründe aç
6. `const CASES = [` satırının altında, son açık vakanın `},` 'sından sonra yapıştır
7. `cases.js`'i kaydet
8. Değişikliği commit edip `main`'e push et — site birkaç saniye içinde güncellenir

Site otomatik tanır:
- Ana sayfada yeni kart belirir (recNum en yüksek olduğu için en üstte)
- cases.html'de yeni vaka listede görünür
- Yıl filtresine yeni yıl otomatik düşer
- Imagination filtresine yeni named imagination otomatik düşer

## Yayımlama

Hostinger panelinde antefilm.com → Git bölümünde bu depo bağlıdır (kök dizin: `public_html`).
`main`'e push = yayın. Bir şey ters giderse önceki commit'e dönüp yeniden push etmek
siteyi eski hâline getirir.

## Pending kayıt

Henüz tam doldurmadığın bir vakayı listeye eklemek için:
- `_new-case.html`'de **pending** seçeneğini işaretle
- Sadece başlık, slug, yıl, yönetmen, gişe alanlarını doldur
- Generate → kopyala → yapıştır

Pending vakalar arşivde görünür ama tıklanmaz (gri görünür).

## Tipografi

- Anahtar sözcükleri vurgulamak için: `<em>kelime</em>` — kırmızı görünür
- HTML escape: `&amp;` (ve işareti için)
- Form alanlarına doğrudan yazabilirsin — kod üretirken otomatik escape edilir

## Vaka eklerken kontrol listesi

- [ ] Film yıllık global top 10'da mı (eşik kuralı)
- [ ] Beş dikkat alanı dolu mu
- [ ] Her ground record için kaynak yazıldı mı
- [ ] Named imagination kısa ve anlaşılır mı
- [ ] Gloss 2-4 cümle, "two registers of one imagination" formülünü taşıyor mu
- [ ] recNum doğru mu (mevcut en yüksek + 1, şu an son recNum: 3)
- [ ] grossNum int mi (milyon USD cinsinden)

## Dönem bantları

`cases.js` içinde PERIODS dizisi tanımlı:
- I (2001-2008) — invasion grammar
- II (2009-2016) — exit imperialism, drone grammar
- III (2017-2020) — withdrawal grammar
- IV (2021-) — post-withdrawal grammar

Sen analizini geliştirdikçe `cases.js`'i editörde açıp PERIODS dizisini değiştirebilirsin.
