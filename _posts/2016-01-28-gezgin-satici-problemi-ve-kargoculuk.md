---
title: Gezgin satıcı problemi ve kargoculuk
---

Yurtiçi Kargo sizi yine mi evinizde bulamadı? Eğer bilimi ve teknolojiyi biraz kullansalardı böyle olmazdı.

Önceden insanlar çok fazla kargoyla haşır neşir olmadığından kargoculukta (nedense lojistik demek istemiyorum) ne gibi sorunlar olduğunu bilmiyordu. E-ticaret sitelerinin artmasıyla birlikte kargoculuğun ne kadar geride kaldığı ve sorunlu olduğu gün yüzüne çıktı. Eğer aktif bir şekilde internetten alışveriş yapıyorsanız şu problemlerden en az biriyle %100 karşılaşmışsınızdır:

* Kargocunun sizi evde bulamaması
* Kargo geldiğine dair size haber gelmediğinden kargonuzun gönderene geri gitmesi
* Kargonuzun yanlış adrese teslim edilmesi
* Kargonuzun kaybolması
* Kargonuzun hasar görmesi

Bu sorunların temelinde bana göre kargoculuğun çok eski usül olarak çalışması yatıyor. Eğer bir kargo şubesine gittiyseniz ortamdaki kaosun hemen farkına varabilirsiniz. Etrafa saçılmış onlarca kargo, teslim edilememiş tekrar şubeye gelmiş bir sürü kargo, kargosunu şubeden teslim almak için gelen onlarca insan vs. Eğer kargo firmaları bilimi ve teknolojiyi olması gerektiği gibi kullansalardı bu kaos da ortadan kalkardı diye düşünüyorum. Öncelikle yukarıdaki sorunlardan önce kargo firmasının verimliliğine odaklanalım. Çünkü yukarıdaki sorunlar sizin sorunlarınız. Kargo firması bu sorunları pek de takmıyor. O yüzden önce kargo firmasının işleyişini verimli hale getirmeliyiz ki dolaylı olarak sizin de sorunlarınız çözülmeli. Yani bi kazan-kazan durumu olmalı ki kargo firması yatırım yapıp teknolojiyi entegre ederek bu sorunları ortadan kaldırsın.

Kargoculuğun temelinde dağıtım yer alıyor. Bu dağıtım işlemi ise tamamen eski usül, mahalleyi bilen bir şoförün hangi kargoyu nereye ne zaman vermesi gerektiğine kendi başına karar vermesiyle işliyor. Ben bunu ilk duyduğumda çok şaşırmıştım. Çünkü bu problem yıllar önce keşfedilmiş ve 1930 yıllarında formüle edilmiş. Daha çok Gezgin Satıcı Problemi olarak biliniyor. Çizgeye (ya da grafa) uyarlanmış haliyle (her tepe bir teslimat noktası, her ayrıt da yolu temsil ediyor) bir tepeden başlayıp tüm tepeleri gezdikten sonra başladığın noktaya dönüyorsun. Bu problemin şuanda kolay yoldan kesin bir çözümü yok. Bu nedenle tüm ihtimalleri hesaplamak gerekiyor. Dolayısıyla karşımıza (n-1)!/2 şeklinde bir formül çıkıyor. (n gezilecek tepe sayısı) Haliyle de iş bilgisayarlara düşüyor. Başlangıç noktası (aynı zamanda bitiş noktası da oluyor) belirlendikten sonra (n-1)!/2 farklı şekilde çizge geziliyor ve en kısa yol bu problemimizin çözümü oluyor. Tabii noktaların sayısı artınca gerekli olan bilgisayar gücü de artıyor. Aksi takdir hesaplama çok uzun sürebilir. Ancak bir kargo aracının gün içerisinde yapacağı teslimatların sayısının bulut sunucular sağolsun çok fazla sürede hesaplanacağını sanmıyorum.

![Bruteforce](/uploads/Bruteforce.gif)

7 tepeli bir çizgede en kısa yolun bulunması. Deneme sayısı: (7-1)!/2 = 360

Problemi ve çözümünü tanımladıktan sonra geriye uygulamaya koymak kalıyor. Bunun için de tabii ki harita ve GPS teknolojisinden yararlanmak gerekiyor. Bu sayede kargo firması yukarıda bahsettiğim çözümle bir aracın bir gün içerisinde dağıtacağı tüm kargolar için en kısa rotayı belirleyerek yakıt ve zaman konusunda oldukça tasarruf edebilir. Bununla birlikte kargo dağıtımını yapan kişi GPS cihazıyla teslimat yapacağı noktalara yol tarifi alacağından kargonun yanlış adrese teslim edilmesi ya da adresin bulunamaması gibi sorunlar da ortadan kalkar. Ben bu çözümü net olarak göstermek için Google Maps'i kullanarak bir algoritma yazmayı düşünmüştüm. Ancak Google mühendisleri sağolsun bu problemi sistemlerine entegre etmişler.

Başlangıç noktasından başlayıp 8 nokta gezdikten sonra tekrar başladığı noktaya gelen bir rota belirledim ve bu rotaları da kendi belirlediğim sırada dolaştım. Ortaya 
[şöyle](/uploads/gezgin-satici.html) bir görüntü çıktı:

![gezgin-satici-1](/uploads/gezgin-satici-1.png)

Bu rotada toplam kat edilen mesafe 7.41 km olarak görünüyor. Daha sonra Google Maps'in API'nda yer alan optimize etme özelliğini aktif edince ortaya 
[şöyle](/uploads/gezgin-satici-2.html) bir görüntü çıktı:

![gezgin-satici-2](/uploads/gezgin-satici-2.png)

Gördüğünüz gibi noktalar aynıyken gidilen yollar farklılık gösteriyor. Burada kat edilen toplam mesafe ise sadece 5.42 km. Bu mesafe aynı zamanda bu noktaları gezebilmeniz için gereken en kısa mesafe olma özelliğini de taşıyor. Bir öncekiyle arasında neredeyse 2 km fark var. Şimdi her gün buna benzer bir rotanızın olduğunu ve bunu en iyi şekilde optimize ettiğinizi düşünün. Teknoloji ve bilim sayesinde binlerce TL yakıttan tasarruf edebilir dolayısıyla daha az karbondioksit salınımı yapmış olur ve en kısa yolu gittiğinizden binlerce saat tasarruf edebilir dolayısıyla da gün içerisinde daha fazla teslimat yapabilirsiniz.

Yukarıda anlattığım örnek kargo firması için büyük bir sorunu çözüyor ve bu sayede müşteriler de kargosunu daha erken alabiliyor. Dolayısıyla kargonuz şubede daha az bekliyor, daha az indir-bindir yapılıyor ve hasar görme şansı azalıyor. Kargocunun yanlış adrese gitme olasılığı da ortadan kalkıyor. Geriye kaldı en önemli sorun: kargocunun sizi evde bulamaması. Bu sorun benim defalarca başıma geldi ve her seferinde gidip şubeden kargomu almam gerekti. İki taraf için de büyük sorun. Zira kargo firması da evde olmadığım zamanda gelerek boş yere yakıt ve zaman harcamış oluyor. Bu sorunun çözümü ise diğeri kadar basit: GPS takip aparatı.

Bildiğim kadarıyla bu aparatı şimdilik sadece UPS kullanıyor. Eğer UPS sitesinden kargonuzu takip ederseniz birkaç dakika gecikme ile kargonuzun bulunduğu aracı harita üzerinden görebilirsiniz. Ancak UPS bunu bana göre olması gerektiği şekilde kullanmıyor. Çünkü benim dediğim şekilde kullanabilmesi için önce Gezgin Satıcı Problemi'yle rota oluşturması gerekiyor. Bu rotayı oluşturduktan sonra sistem aracın ne zaman hangi kargoyu teslim edeceğini tahmini olarak verebilir. Örneğin sizin kargonuz 4. sıradaki kargoysa kargo aracı şuanda 3. sıradaki kargoyu teslim ediyorsa. Yüksek ihtimal sizin evinizle 3. sıradaki kargonun teslim edildiği ev arasındaki mesafeyi katetme süresi sonra kargonuz size teslim edilecektir. İşte tam burada olması gereken şey size bir mesaj gönderilmesi.>Kargonuz yolda. Yaklaşık 15 dakika sonra kargonuz size teslim edilecektir. Eğer evde değilseniz bu mesajı 'Hayır' yazarak cevaplayınız.

şeklinde size gelecek bir mesaj ile müthiş verimli bir sistem tasarlanabilir. Eğer siz evde değilseniz Hayır yazar cevaplarsınız. Böylece kargo aracının rotası otomatik olarak yenilenerek direk 5. sıradaki kargoya geçer. Böylece kargo aracı başka bir gün gelip kargonuzu teslim edebilir ve siz de şubeye gitmek zorunda kalmayabilirsiniz. İki taraf için de bir kazan-kazan durumu.

Sonuç olarak görüldüğü gibi teknoloji ve bilim sayesinde her gün binlerce kişinin yaşadığı yukarıdaki sorunlar çok kolay bir şekilde çözülüyor ve kargoculuk sistemi verimli hale getiriliyor. Ancak işin kötü yanı bunu uygulayan bir şirket yok.
