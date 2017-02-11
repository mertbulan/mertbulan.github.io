---
title: Google Analytics raporundan Rusya kaynaklı SPAM trafiği filtreleme
---

Sizin de Google Analytics raporunuzda Rusya kaynaklı anlamsız trafikler yer alıyorsa bu çözüm işinize yarayabilir.

Arada sırada blogumu kaç kişi ziyaret etmiş diye Google Analytics raporlarına göz atıyorum. Son zamanlarda düşük ziyaret süresi ve yüksek hemen çıkma oranı gibi olması gerekenden farklı sonuçlar görmeye başlayınca işin kaynağına inmem gerektiğinin farkına vardım. Daha sonra Edinme sayfasında yönlendirmeler (referrals) kısmına baktığımda Rusya kaynaklı 
simple-share-buttons.com şeklinde bir siteyle karşılaştım. Tahmin ettiğim gibi bu site benim bloguma SPAM ziyaretler yapıyordu. Raporun olmasın gerekenden farklı olmasının nedeni bu sitenin gönderdiği ziyaretçilerdi. (muhtemelen botlar)

Daha sonra kısa bir araştırma sonucunda bu ziyaretçileri Google Analytics raporundan nasıl uzak tutabileceğimi öğrendim ve paylaşmaya karar verdim. Öncelikle yapmanız gereken şey Google Analytics sayfasında üst kısımda yer alan Yönetici sayfasını açtıktan sonra Filtreler kısmını tıklamak. Daha sonra buradan Yeni Filtre butonuna tıklayıp açılan sayfada Filtre Adı'na dilediğiniz şeyi yazıp, Filtre Türü kısmından Özel'i seçip, Hariç Tut bölümünde yer alan Filtre Alanı kısmından da Yönlendirme seçeneğini seçtikten sonra Filtre Modeli kısmına site adresini (resimde görüldüğü biçimde) yazmak.

![analytics-filtre](/uploads/analytics-filtre.png)

Bu işlem sayesinde yazdığınız siteden gelen trafiklerin raporunuzda görünmesini engelleyebilirsiniz. Ancak bu filtre hali hazırdaki raporunuzdaki verilerde yer alan SPAM istatistikleri etkilemediğinden onun için de ayrıca bir ayar yapmak gerekiyor. Bunun için de Google Analytics'in Raporlama sayfasında yer alan +Segment Ekle butona tıklayıp daha sonra Yeni Segment butonuna tıkladıktan sonra açılan kısımda sol tarafta Gelişmiş başlığı altında yer alan Koşullar kısmını seçmek.  Açılan kısımdaki ilk bölümden Aracı - şununla tam olarak eşleşir - referral bilgilerini girdikten sonra sağ altta yer alan VE butonuna tıklayıp resimdeki gibi sırasıyla Kaynak - şunu içerir - siteadresi.com şeklinde ekledikten sonra hali hazırdaki raporunuza bu siteye ait istatistikler dahil edilmemesini sağlayabilirsiniz. Eğer benim yaptığım gibi birden fazla site eklemek isterseniz ilk siteyi ekledikten sonra onun sağ altında yer alan VEYA butona basarak seri şekilde birden fazla site ekleyebilirsiniz. Ekleme işleminiz bittikten sonra Kaydet butona basarak segmentinizi kaydetmeyi unutmayın.


![analytics-filtre-2](/uploads/analytics-filtre-2.png)

Ben bu işlemleri yaptıktan sonra raporum olması gerektiği şekle büründü. Umarım bu işlemler sizin de işinize yarar.
