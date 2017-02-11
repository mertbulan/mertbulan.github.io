---
title: 'Bir back-end yenileme projesi: Caffè Nero'
---

Sadece 1 aydır Ruby yazan birine büyük bir projenin back-end yenileme işini teslim eder miydiniz?

Her şey 13 Haziran'da Protel'de stajımın ilk günüyle birlikte başladı. O zamana kadar daha önce hiç Ruby kodu yazmamıştım. Sadece gelmeden önce okuduğum Ruby kitabı sayesinde Ruby syntax'ına aşina olmuştum. Stajın ilk birkaç haftasında hızlandırılmış bir Rails kursu gördüm. Ardından ufak birkaç iş yaptıktan sonra kendimi bana göre büyük bir proje diyebileceğim bir projenin ortasında buldum.

Caffè Nero, 50'ye yakın şubeye sahip bir kahve zinciri. iOS ve Android uygulama mağazalarında yer alan uygulamaları aracılığıyla mobil ödeme yaparak kahve satın alabiliyor ve aldığınız kahvelerden damga kazanıp daha sonra damga sayınız 9'a ulaştığında ücretsiz bir kahve içebiliyorsunuz. Bizim üzerinde çalıştığımız şey ise bu mobil uygulamalarının arkaplanında yer alan yazılımı yeniden yazmaktı. Daha önce ASP.NET ile yazılmış back-end'i sıfırdan Ruby on Rails ile yazacaktık.

Ben Ruby on Rails öğrenene kadar back-end ekibinin lideri 
[Serdar](https://twitter.com/sdogruyol), projeye kendi başına başlamış yarısına kadar gelmişti. Ancak daha yapılması gereken işler vardı. Kendisinin sürekli başının etini yememden sonra sonunda pes etti ve Caffè Nero'da yapılacak işlerin birkaçını bana vermeye başladı. Daha önce Caffè Nero için yapacağımız işe benzer bir iş yaptığımızdan dolayı elimde bir örnek proje vardı. O örnek sayesinde verilen işleri yapmaya başladım. Verilen işleri tamamladıkça Serdar bana daha fazla iş veriyordu. Bir süre sonra artık projeye tamamen dahil olduğumu ve geriye kalan neredeyse tüm işlerin bana verileceğini fark ettim. Tabii ki bu ilk başta biraz korkmama sebep oldu. Çünkü daha birkaç aydır Ruby yazıyordum ve hata yapma olasılığım yüksekti. Neyseki yaptığımız işlerde sürekli test yazdığımızdan bu hataları baya azaltıyorduk.

Ben projeye dahil olduktan yaklaşık 1,5 - 2 ay sonra uygulamaların tüm testlerini de yapıp bitirdik. Yaptığımız şey aslında bir Ruby on Rails API uygulamasıydı. Bir taraftan hem Android hem de iOS uygulamasıyla konuşuyor, bir taraftan Amazon'un SQS servisi aracılığıyla CRM tarafıyla konuşuyor (çünkü uygulamada bir sadakat sistemi var), bir taraftan Amazon'un SNS servisi aracılığıyla kullanıcının yaptığı ödeme işlerimleri ve damga kazanımları sonucunda telefonlarına push mesaj gönderiyor, bir taraftan Masterpass aracılığıyla mobil ödeme alıyor ve bir taraftan CMS kısmı aracılığıyla Caffè Nero yetkililerinin uygulamanın ilgili kısımlarındaki içerikleri istedikleri gibi değiştirebilmelerini sağlıyorduk. Görünüşte basit görünse de aslında biraz karmaşık bir sistemi var. (daha karmaşıklarını da gördüğüm için biraz dedim)

![cafe-nero-backend.png](/uploads/cafe-nero-backend.png)

Açıkça söylemem gerekirse Protel'de çalışmaya başlamadan önce bu tarz uygulamalarda tüm işi telefondaki mobil uygulamanın yaptığını sanıyordum. Ancak gördüm ki meğer tüm iş arkaplanda yer alan API uygulaması aracılığıyla yapılıyormuş. Uygulamalar sadece endpointler aracılığıyla bu API ile konuşuyormuş. Her neyse, sonuç olarak yaptığımız uygulamayı bugün yayına aldık ve şuan sorunsuz bir şekilde çalışıyor :)

>It just works.

Benim bu yazıda değinmek istediğim bir diğer şey ise güven meselesi. Başta da söylediğim gibi sadece birkaç aydır Ruby yazıyordum ve daha önce hiç büyük bir projede görev almadım ancak buna rağmen Serdar bana güvenerek beni projeye dahil etti. Türkiye'deki hiçbir şirkette hiçkimse böyle bir inisiyatif alıp daha birkaç aydır Ruby yazan birisini böyle büyük bir projeye dahil etmezdi diye düşünüyorum. Dahil etse bile tecrübe kazanması için projenin yarısını yazdırmazdı. O yüzden buradan Serdar'a, bana güvenip beni bu projeye dahil ettiği için teşekkür etmek istiyorum. Tabii takıldığım noktalarda bana her zaman yardımcı olan 
[Aşkın](https://twitter.com/askngdk)'a da teşekkür etmezsem olmaz. :)

Çok uzun zamandır bol bol çalışmak ve insanların kullanabileceği ürünler üretmek istiyordum. Serdar'ın bana tanıdığı fırsat sayesinde bu yaz bu isteklerimi gerçekleştirme şansı buldum. Şu hayatta beni en çok tatmin eden şeyi yaptım: her gün binlerce insanın kullanacağı bir uygulamanın arkaplanının yazılmasına katkıda bulundum. Tabii bu daha başlangıç :)
