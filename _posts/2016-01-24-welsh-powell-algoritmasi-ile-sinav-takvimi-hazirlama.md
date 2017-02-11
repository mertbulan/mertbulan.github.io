---
title: Welsh-Powell algoritması ile sınav takvimi hazırlama
---

Sınav takvimi hazırlamanız gerekiyor ancak öğrencilerin sınavlarının çakışmamasını mı istiyorsunuz? İşte bu algoritma ve uygulama tam size göre.

Çizge Kuramı dersinde Welsh-Powell isimli bir algoritma görmüştük. Bu algoritma ile çizge (graf) boyama işlemi yapılıyor. İşlem sırasında komşu tepelerin farklı renkte olması sağlanıyor. Algoritmanın çalışma mantığı şu şekilde;

1. Tepeleri tepe derecelerine göre büyükten küçüğe sırala
2. İlk rengi ilk sıradaki tepeye ve onun komşusu olmayan diğer tepelere ver
3. Bir sonraki renge geç, sıralamada boyanmamış olan ilk tepeye ve bu tepeye komşu olmayan tepelere bu rengi ver
4. Tüm tepelere renk verene kadar 3. adımı tekrarla

Algoritmanın kullanım alanlarından bir tanesinin ders programı ve sınav takvimi hazırlama aşaması olduğunu öğrenmiştim. Ben biraz daha kolay olduğunu düşünerek sınav takvimi hazırlama konusuna el atmak istedim. Bu sayede üniversitelerde sınav zamanı öğrencilerin dersleri çakışmayacak şekilde sınav takvimi hazırlanabilecek. Bunun için gerekli olan şey her öğrencinin aldığı derslerin bir listesiydi. Örnek olarak 
[şuradaki](https://docs.google.com/spreadsheets/d/1N9nDBLFEn0Ifk2BzcNs1mbqrwW51MA0-cAeNFuGeZG0/pub) gibi kendime çok basit bir tablo oluşturdum. Bu tabloda her satır bir öğrenciyi, her sütün da o öğrencinin aldığı dersleri temsil ediyor.


~~Projeyi olabildiğince çabuk bitirmek istediğimden programlama dili olarak Javascript kullanmayı tercih ettim. Bunun yanında jQuery, Bootstrap ve 
[Tabletop.js](https://github.com/jsoma/tabletop)'den yararlandım. Basit bir arayüz hazırladıktan sonra Welsh-Powell algoritmasıyla programlama işlemlerini yaptım. Proje tamamen açık kaynaklı olduğundan dolayı sayfanın kaynak kodlarını inceleyerek neler yaptığıma bakabilirsiniz. Kodlar biraz karışık gibi görünse de anlaşılabilir olduğunu düşünüyorum. Aklınıza takılan kısımlar varsa çekinmeden yorum kısmından sorabilirsiniz~~

Uygulamanın kısaca nasıl kullanıldığından bahsedecek olursam; hazırda elinizde bulunan her öğrencinin aldığı derslerin listesini Google Spreadsheets'e yüklüyorsunuz. Daha sonra uygulama sayfasında yer alan dosya yükle kısmına, yüklediğiniz Excel dosyasını Web'de yayınladıktan sonra elde ettiğiniz benzersiz anahtarı yazıp verileri uygulamaya çekiyorsunuz.  Uygulama gerekli işlemleri yaptıktan sonra size derslerin listesini ve gerekli olan minimum oturum sayısını söylüyor. Siz de bu dersleri sürükle bırak yöntemiyle ders programına istediğiniz gibi ekliyorsunuz. Eğer aynı oturuma eklediğiniz derslerde herhangi bir çakışma varsa program size uyarı vererek bunu söylüyor. Programda yer alan saatleri ben kendi okulumdaki programa göre belirledim ama siz isterseniz bu saatlerin üzerine tıklayarak kendinize uygun şekilde düzenleyebilirsiniz.

Belki bazı kişiler neden direk dosya yükle işlemiyle dosyayı almadığımı merak edebilir. Google Spreadsheets kullandım çünkü belki programı kullanmak isteyenler öğrencilerin aldığı derslerin listesini paylaşmak istemez diye düşündüm. Kısacası kullanmama nedenim gizlilik. Bu sayede kullananlar hakkında hiçbir bilgi tutmamış oluyorum.

Bu arada Welsh-Powell algoritmasının sezgisel olarak çözdüğü graf boyama problemi bir NP problem (hesaplama karmaşıklığı konusu hakkında 
[şu yazıya](http://e-bergi.com/y/Hesaplama-Karmasikligi) göz atabilirsiniz) olduğundan algoritmanın hatalı sonuç bulabileceğini unutmayın.

Welsh-Powell algoritmasıyla ilgili daha fazla detay ve örnekler için Rifat Çölkesen'in Algoritmalar ve Veri Yapıları kitabından yararlanabilirsiniz.


~~Sınav takvimi hazırlama sayfasına 
[buradan](/sinav-takvimi-hazirlama.htm) ulaşabilirsiniz. Karşılaştığınız sorunlar
[iletişim sayfasından](/iletisim) bana bildirebilirsiniz.~~


**Güncelleme: **
Uygulamayı yaptıktan sonra nedense içime pek sinmedi. Çünkü kod kısmı daha çok spagetti kod diye tabir edilen bir şekilde yazılmıştı. Ben de daha çok nesneye yönelik bir şekilde yazmak için kolları sıvadım. Bunun için yeni ve öğrenmek istediğim Crystal programlama dilinden yararlanmak istedim. Ahmet Emre Aladağ'ın 
[Chizge](https://github.com/aladagemre/chizge) isimli kütüphanesini de görünce bir hevesle işe giriştim. Kütüphane oldukça iyi hazırlanmış ancak ihtiyacım olan algoritma ve tam graf ekleme gibi fonksiyonlar tanımlanmamıştı. Öncelikle Chizge kütüphanesine bu fonksiyonları tanımladım. Daha sonra Serdar Doğruyol'un 
[Kemal](https://github.com/sdogruyol/kemal) isimli kütüphanesi ile çok kolay bir şekilde uygulamanın webde çalışmasını sağladım. Geriye bir tek, kullanıcıdan aldığım anahtarı arka tarafa gönderip işlemek ve çıktı olarak aldığım JSON dosyasını tekrar kullanıcıya göstermek kaldı. Bunu da AJAX'ın get ve post metodları aracılığıyla yaptım.

Sonuç olarak uygulama nesneye yönelik olarak çok temiz bir şekilde programlanmış oldu. Uygulamanın kaynak kodlarını da 
[Github](https://github.com/mertbulan/exam-schedule) üzerinden paylaştım. Dilerseniz kendi makinenize kurup, uygulamayı çalıştırabilirsiniz.

Uygulamayı kullanmak isterseniz 
[şu adresten](http://exam-schedule.herokuapp.com) erişerek sınav takvimi oluşturmaya başlayabilirsiniz. Uygulamada gördüğünüz hataları ya da önerileri Github üzerinden 
[issue açarak](https://github.com/mertbulan/exam-schedule/issues) bildirebilirsiniz.
