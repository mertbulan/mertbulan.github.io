---
title: Ruby on Rails ile harikalar diyarı…
---

İnternet üzerinden yaptığınız işlerin büyük bir kısmı PHP ya da Java dilleri ile yazılmış programlar aracılığıyla gerçekleştiriliyor olabilir, ancak farkında olmasanız da her gün Ruby ve Ruby on Rails ile geliştirilmiş sistemler kullanıyorsunuz. Hem de Türkiye'de!

Bundan yaklaşık 1 ay kadar önce Ruby maceram başladı. Okulların tatile girmesinin ardından 
[Protel](http://www.protel.com.tr)'de stajyer olarak çalışmaya başladım. Back-end ekibi Ruby on Rails üzerinde yazılım geliştiriyordu ve benim daha önce Ruby on Rails ile bir tecrübem bulunmuyordu. Sadece temel programlama bilgisine sahiptim.

>Ruby çok güzel.

Stajdan önce back-end ekibinin lideri olan 
[Serdar Doğruyol](https://twitter.com/sdogruyol)'un (Serdar abi) tavsiyesi üzerine Ruby syntax'ına yabancılık çekmemek için Sıtkı Bağdat'ın Ruby kitabını okudum. Staja başladıktan sonraki ilk 1-2 hafta boyunca ise gerek CodeSchool (zombilerden nefret ediyorum!) gerekse de yine Sıtkı Bağdat'ın kitabı olan Ruby on Rails üzerinden Rails çalışmaya başladım. Bu zamana kadar Pascal, C, C++, C#, PHP ve Java dillerinde kod yazma şansım olmuştu (büyük çaplı bir proje yapmadım) ama fark ettim ki Ruby bunlar arasında sözdizimi açısından en basiti. Yazdığın kodda tekrar eden neredeyse hiçbir şey olmuyor, sadece işini yapan kod parçacağını görüyorsunuz ve kodun tamamına baktığınızda çok rahat bir şekilde bütünü anlayabiliyorsunuz. (Ruby övmeye başka yazılarda devam edeceğim) Rails kısmı ise tam bir derya denizmiş. Ama en çok ilgimi çeken şey Rspec aracılığıyla yapılan testler oldu. Bu zamana kadar programlamlamada test nedir, neden teste ihtiyaç vardır bilmiyordum. Kimse de yazdığın programı test et demiyordu. Ama Rails sayesinde fark ettim ki test olmadan herhangi bir iş yapmak mümkün değil. (Rails'e de yine başka yazılarda detaylı olarak değineceğim)

### Ruby on Rails projesine giriş

Ruby on Rails'e hızlı bir giriş yaptıktan sonra, Serdar abi'nin bana fırsat tanıması sayesinde Protel'de yapılan projelere daldım. Gördüğüm şey ise karmaşıklıktan çok birer sanat eserisiydi. O andan itibaren (abartmıyorum) yazılımcıların gerçekten birer sanatçı olduğunu düşünmeye başladım. Öncelikle girdiğim projelerden bir tanesi Fortune 500 şirketlerinden birinin projesiydi. İçerisinde çeşitli ödeme sistemlerinin entegresi, içerik yönetim sistemi, mobil uygulaması, web sayfası ve kasayla olan bağlantısından dolayı sanırım görebileceğim en kapsamlı Ruby on Rails uygulamalarından biriydi. İşin bana göre ilginç yanı ise bu derece kapsamlı bir sistemin hiç sorun çıkarmadan çalışmasıydı. Tabii bunda az önce bahsettiğim testlerin büyük bir önemi var. Bir diğer kısmı ise bu projenin back-end ayağını sadece iki kişi (Serdar abi ve 
[Aşkın Gedik](https://twitter.com/askngdk)) tarafından yazılmış olmasıydı. Şöyle bir adım geriye çekilip projenin büyüklüğüne bakıp, daha sonra sonra bu projenin iki kişinin elinden çıkmış olması, projenin sorunsuz bir şekilde çalışıyor olması, projenin dosyalarını baktığım an neyin ne işe yaradığını çok çabuk bir şekilde görebiliyor olmam ve yazılan neredeyse her kodun testinin olması bana sanki harikalar diyarındaymışım gibi hissettirdi. Ve bana göre işin en ilginç yanı ise benim bu projeye commit atmam oldu. Çünkü testler sayesinde (projenin yaklaşık 600 testi var) benim gibi henüz daha bir aydır Ruby yazan birinin projede bir şeyi bozması mümkün olmadığından, kodun yapılan işi çok net bir şekilde açıklıyor olmasından direk projeye dahil olabildim. İşte size Ruby on Rails'in güzelliği.

![mutlulugun-resmi](/uploads/mutlulugun-resmi.png)

Bu zamana kadar programlamayı karmaşık, gerçeketen yorucu ve öğrenmesi zor (temel şeyleri değil, bir projeye dahil olabilecek kadar şeyi bilmeyi) sanırdım. Ancak Ruby on Rails'i gördükten sonra gerçekten kod okurken bile zevk alarak programalama yapılabileceğini gördüm. Bununla birlikte çok fazla kod yazmaktansa daha az kod yazmanın, mümkün olduğu kadar projeyi parçalara bölerek ilgisiz şeyleri farklı dosyalarda tutmanın ne kadar önemli olduğunu gördüm.

### Neden bu yazıyı yazdım?

Benim bu yazıyı yazma nedenim hem Ruby on Rails maceramdan ve Ruby on Rails'in güzelliklerinden kısaca bahsetmek hem de gördüğüm en mütevazi iki kişi (Serdar abi ve Aşkın) tarafından bir Fortune 500 şirketi için yapılan bu projeye kısa da olsa değinmekti. Bu projeye özellikle değinmek istedim çünkü çoğu kişi Ruby on Rails'in sadece Github ya da Shopify tarafından kullanıldığını çok yaygın olmadığını ve Türkiye'de neredeyse hiç tercih edilmediğini düşünmesiydi. Aslında Türkiye'de tercih ediliyor, biz Protel'de yaptığımız işlerde Ruby on Rails kullanıyoruz ve yapılan bu işler her gün yüzbinlerce kişiye hizmet ediyor. Sadece siz farkında olmuyorsunuz. Steve Jobs'ın da Apple ürünleri için sık sık söylediği sözü sanırım Ruby on Rails için de söylebiliriz: "It just works."
