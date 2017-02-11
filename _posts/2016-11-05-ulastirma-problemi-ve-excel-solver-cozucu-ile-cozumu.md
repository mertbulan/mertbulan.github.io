---
title: Ulaştırma problemi ve Excel Solver (Çözücü) ile çözümü
---

Elinizde arz ve talep noktalarınız var ve bu noktalar arasında en düşük maliyetle ürününüzü transfer etmek istiyorsunuz. Peki bunu nasıl yaparsınız?

Yöneylem Araştırması (Operation Research), İkinci Dünya Savaşı'yla birlikte ortaya çıkan belirli bir kısıtların olduğu durumda, belirli bir amaca yönelik en uygun çözümü bulma yöntemi. Ulaştırma problemi de yöneylem araştırması içerisinde incelenen bir problem.

Problemin temelinde arz ve talep noktaları arasında belirli kısıtlar dahilinde ürünlerin en düşük maliyetle ulaştırılması yer alıyor. Örnek olarak aşağıda görselleştirilmiş problemi verebiliriz. 3 farklı şehirde buğday üretimi yaptığınızı düşünün ve bu şehirlerden üretilen buğdayları en düşük maliyetle buğday talep eden diğer şehirlere ulaştırmanız gerekiyor. Görselde hangi şehirden ne kadar buğday arz edildiği parantez içerisinde, her bir arz noktasından her bir talep noktasına ulaştırma maliyeti ise yuvarlak kutucuklar içerisinde belirtilmiş. Bu durumda en düşük maliyetle tüm talebi nasıl karşılarsınız? (arz ve talep miktarı eşit olduğundan dengeli bir problem)


![ulastirma-problemi](/uploads/ulastirma-problemi.png)

Bu problemin çözümü için kullanılan en yaygın yöntemlerden bir tanesi Simpleks yöntemi. Ancak bu yazıda Simpleks yönteminin nasıl çalıştığına (özet: oldukça karışık) değinmek yerine Excel aracılığıyla bu yöntemi kullanarak problemi nasıl çözeceğinizden bahsedeceğim.

Problemi çözmeden önce tabii ki problemi matematiksel olarak modellememiz gerekiyor. Problemi matematiksel olarak modellediğimizde şöyle bir şey ortaya çıkıyor:


![matematiksel-model](/uploads/matematiksel-model.png)

Amacımız maliyeti en düşük tutmak olduğundan amaç fonksiyonumuzu da buna göre ayarlıyoruz. Her bir arz noktasından her bir talep noktasına taşınacak buğday miktarını taşıma maliyetiyle çarpıp birbirleriyle toplayarak bu problem için toplam maliyeti buluyoruz. Kısıtlar kısmında ise her bir arz noktasını o noktada üretilen toplam üretilen buğday miktarıyla, her bir talep noktasını da ihtiyacı olduğu buğday miktarıyla sınırlandırıyoruz.

Bu problemi çözmek için kullanılanılan en yaygın yöntemlerden bir tanesi Simpleks yöntemi olduğunu söylemiştim. Excel'in içerisinde gelen ve sizin de Araçlar > Excel Eklentileri menüsünden aktif hale getirebileceğiniz Çözücü (Solver) yardımıyla Simpleks yöntemini kullanarak probleminizi çözebilirsiniz. Yukarıdaki örneği Excel'e aktarıp Çözücü aracılığıyla nasıl çözüleceğini aşağıdaki görselde gösterdim:


![excel-cozucu](/uploads/excel-cozucu.png)

Burada dikkat edilmesi gereken nokta Set Objective yani amaç fonksiyonu kısmına formül eklenmesi. Amaç toplam maliyeti en düşük tutmak olduğundan, toplam maliyet de her bir arz noktasından her bir talep noktasına olan maliyetlerin o noktalar arasındaki taşınacak buğday miktarıyla çarpımıyla bulunduğundan, toplam maliyet hücrecisini Excel'de yer alan TOPLAM.ÇARPIM fonksiyonunu kullanarak maliyet tablosundaki değerler ile çözüm tablosundaki değerlerin çarpımına eşitliyoruz.

Çözücüyü çalıştırdığımızda ise bize Çözüm Tablosu üzerinde hangi noktalar arasında ne kadar buğday taşınacağı bilgisi ve bu problemi toplam maliyeti hesaplanıyor.


![cozum](/uploads/cozum.png)