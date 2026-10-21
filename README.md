# antefilm.com — kullanım kılavuzu

El yazımı statik site. GitHub deposu (`brahimefe/antefilm`, dal `main`) Hostinger'da
**antefilm.com** sitesine bağlıdır; `main`'e yapılan her push sitenin `public_html`
klasörüne otomatik dağıtılır.

> Dikkat: Bu depo yalnızca antefilm.com'a bağlı olmalı. webdipnot deposu
> webdipnot.com'a bağlıdır; ikisini karıştırmayın.

## Nasıl çalışır

Sayfalar elle yazılmaz; `tools/build.js` hepsini veri dosyalarından üretir.

```
data/records.js           — tam kayıtlar (yakın okumalar). TEK DOĞRULUK KAYNAĞI.
data/corpus-source.tsv    — 2001–2025 yıllık dünya ilk 10 listesi (250 film)
data/coding-beckert.tsv   — her filmin Beckert kodlaması (imaginaryType, payoffStructure)
tools/content/*.html      — method, about ve submit sayfalarının metni
assets/                   — stil ve betikler
```

Üretilen dosyalar (elle düzenlemeyin, build yeniden yazar):

```
index.html                — atlas (ana sayfa)
records/<slug>/index.html — her kayıt için ayrı sayfa
records/index.html, compare.html, data.html, method.html, about.html, submit.html
data/corpus.csv, data/corpus.json, data/records.json, sitemap.xml, robots.txt
cases.html                — eski bağlantıları (cases.html#argo) yeni sayfalara yönlendirir
```

## Bir değişiklik yapmak

1. İlgili veri dosyasını düzenleyin (örneğin `data/records.js`).
2. Depo klasöründe çalıştırın: `node tools/build.js`
3. Commit edip `main`'e push edin — site birkaç saniye içinde güncellenir.

## Yeni kayıt eklemek

- `tools/new-record.html` dosyasını tarayıcıda açın, formu doldurun, **Show the entry for records.js** düğmesine basın.
- Çıkan girdiyi `data/records.js` içindeki `RECORDS` listesine yapıştırın; `recNum` verin.
- `beckert` alanını ve `threshold.rank` değerini doldurun; inceleme bitene kadar `draft: true` kalsın.
- `node tools/build.js` çalıştırın, commit edip push edin.

## Kayıt kontrol listesi

- [ ] Film yılın dünya ilk 10'unda mı (`threshold.inCorpus`)
- [ ] Dört dikkatin her birinde kamera kaydı, zemin kaydı, kaynak ve seçim notu var mı
- [ ] Her zemin kaydı yöntem §6'daki dört koşulu karşılıyor mu (aynı terim, aynı fail, aynı dönem, kurumsal kaynak)
- [ ] Her kaynakta yazar/kurum, yıl, başlık, yayıncı ve mümkünse bağlantı var mı
- [ ] Named imagination kısa ve anlaşılır mı; gloss 2–4 cümle mi
- [ ] Beckert kodlaması korpus dosyasıyla (`coding-beckert.tsv`) aynı mı

## Erişim

`.htaccess`, `tools/` klasörünü, bu README'yi ve kaynak TSV dosyalarını sitede kapatır.
