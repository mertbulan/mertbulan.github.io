---
title: 4-bit tam toplayıcı (full adder) devre nasıl yapılır?
---

Bilgisayarın nasıl çalıştığını merak ediyorsanız biraz derinlere inmeniz gerekiyor.

Herkes bilgisayarın 0 ve 1'lerden oluştuğunu bilir. Ancak bunun tam olarak ne anlama geldiği konusunda çoğu kişi bilgi sahibi değildir. Kısaca değinmek gerekirse; bu 0 ve 1'lerin her birine 1 bit denir. 8-bit dediğimiz şey ise 1 byte'a denktir. 0 ve 1'in devredeki karşılığını ise açık-kapalı şeklinde özetleyebiliriz. Açık ve akım geçiyorsa 1, kapalıysa 0'ı temsil ediyor. Bu şekilde makine yaptığımız işi anlayabiliyor. Peki biz bu 0 ve 1'leri nasıl kullanıyoruz? Biz bu 0 ve 1'leri normal sayıları (10'luk tabanda kullandığımız) 2'lik tabanda yazarak kullanıyoruz. Örneğin 5 sayısının 2'lik tabanda yazılımı 101 şeklindedir. Peki biz bu sayıları neyi temsil etmede kullanıyoruz? Biz bu sayıların karşılığına karakterler denk getirerek bilgisayarla normal konuştuğumuz şekilde anlaşmaya çalışıyoruz. Örneğin 65 sayısının karşılığı A harfine denk geliyor ve binary (ikilik tabanda) temsili 1000001 oluyor. Karakterler ve temsili hakkında detaylara 
[ASCII Tablosu](https://upload.wikimedia.org/wikipedia/commons/d/dd/ASCII-Table.svg)'ndan ulaşabilirsiniz.

Temel bilgilerden sonra konumuza dönecek olursak; bilgisayarın işlem diyerek yaptığı şey temelde bu 0 ve 1'leri toplamaktır. Bu işlemi de mantıksal işlemlerle yapar. Örneğin 1 ve 1'in toplamı 2 değil, 10'dır. Çünkü 2'lik tabanda bu işlem gerçekleşir. Bu toplama işlemi de XOR kapısı dediğimiz kapıya denk düşer. Bu durumda;

1 + 1 = 0
1 + 0 = 1
0 + 1 = 1
0 + 0 = 0

şeklindedir. Bunun yanında toplama işlemi sırasında elde tutulan sayının hesabında  AND (ve) kapısı kullanılır. (1 ile 1 toplanıyorken XOR kapısı bunun sonucu 0 bulur, aynı işlemi AND kapısıyla yaparak elde olan 1 hesaplanır) Bu işlemde bir de OR (YA DA) kapısına yer verilir. (Lisede öğrenilen mantık konusunda bunları görmüşsünüzdür) Kısacası bir toplama işlemi yapılıyorken XOR, AND ve OR olmak üzere toplamda 3 farklı kapı kullanılıyor.

Bilgisayar Mimarisi dersinde bana verilen ödevde 4-bit'lik (1111) bir toplama işlemi yapan devre yapmam gerekiyordu. 4-bit'te çalışacağımdan ötürü bu toplama işleminde yapabileceğim en büyük toplama (1000 + 0111) 8 + 7 işlemi oluyor. Çünkü 4-bit'te yazabileceğimiz en büyük sayı 15 oluyor. Benim bu devreyi yapabilmem için önce mantık şemasını çizmem gerekiyordu. Bunun için Logicly uygulamasını kullandım.

![4-bit-tam-toplayici-devre](/uploads/4-bit-tam-toplayici-devre.png)

Şemada görüldüğü gibi örnek olarak A sayısı (0011) ile B sayısını (0011) topluyorum. Bu toplama işlemini yaparken her iki sayının da ilk bitini (A için 1 ve B için 1) alıyorum. İlk bit olduğundan ve ondan önce bir toplama işlemi yapılmadığından elde olarak 0'ı alıyorum. XOR kapısıyla bu iki biti topluyorum. Sonuç 0 oluyor. Daha sonra bu iki bitin toplamında elde var mı diye AND kapısını kullanıyorum. (1 VE 1 = 1) Daha sonra bir önceki işlemde var ise elde ile ilk önce yaptığım XOR kapısındaki işlemden çıkan sonucunu yine XOR kapısıyla topluyorum. Bu iki biti tekrar AND kapısına sokarak yine elde var mı diye bakıyorum. XOR kapısından bu iki bitin toplama işleminin sonucu çıkıyor. Diğer iki AND kapısından çıkanları OR kapısına sokarak oradan bir sonraki toplama işlemine elde olarak yolluyorum. Sonuç olarak 0011 ile 0011 sayılarının (3 + 3) toplamında 0110 sayısı (6) çıkıyor. Daha doğrusu bu 0 ve 1'lere denk gelen ledler yanıyor. (Normalde her bit için 1 led var, en sondaki led ise taşma olup olmadığını kontrol ediyor)

Mantık devresini tamamladıktan sonra sıra devre simülasyonunu yapmaya geldi. Bunun için de iCircuit programından yararlandım.


![4-bit-tam-toplayici-simulasyon](/uploads/4-bit-tam-toplayici-simulasyon].png)

Bu simülasyonda 4-bit tam toplayıcı işlemini yapmak için üretilmiş 74HC283 entegresini kullanıyorum. Anahtarlara 10K'lık sıra direnç bağlıyorum. Ledlere ise 100'lük direnç bağlıyorum. Devreye de 5 voltluk bir güç veriyorum. Burada dikkat edilmesi gereken nokta hangi kabloların entegrenin hangi ayağına bağlanacağı. VCC ayağına pilden gelen pozitif kabloyu, GND ve C0 ayağına negatif kabloyu bağlıyorum. A1 ayağına toplanılacak sayının ilk bitinin ayağını, B1 ayağına toplanacak diğer sayının ilk bitinin ayağını bağlıyorum. S1 ayağını ise bu iki bitin toplamını gösterecek olan ilk lede bağlıyorum. Bu şekilde A2 ve B2, A3 ve B3, A4 ve B4 ayaklarını anahtarlara (switch), S2, S3, S4 ayaklarını ise ledlere bağlıyorum. Geriye C4 ayağı kalıyor bunu da taşmayı kontrol etmek için eklediğim lede bağlıyorum.

Simülasyonda devrenin çalışıp çalışmadığını kontrol ettikten sonra breadboard üstüne devreyi kurmaya başlıyorum.

![4-bit-tam-toplayici](/uploads/4-bit-tam-toplayici.jpg)

Devre kurulurken dikkat edilmesi gereken bir diğer nokta ise direncin (A103J) de data sheet'ine bakmak. Ben başta dikkat etmediğimden (ilk defa devre kuruyorum) devre istediğim gibi çalışmadı. Bunun nedeni 8+1 direnç kullandığımdan 8 ayak anahtarlara 1 ayak da negatif güce bağlanması gerekiyordu. Ben başlangıçta anahtarlar yan yana sığmadığından ortada kalan direnç ayağına bu negatif kabloyu bağlamıştım. Daha sonra data sheet'ine baktıkta sonra doğru bir şekilde bağladım. (Bu yüzden direncin son dört ayağına bi yana kaydırmak zorunda kaldım. Direncin yanındaki kısa siyah kablolar o yüzden var) Sonuç olarak devrem tam olarak istediğim gibi çalıştı.

Resimde de görüldüğü gibi 0011 ile 0011 sayılarını (3 + 3) anahtarlardan giriyorum. Sonucunda 0110'a denk gelen (6) ledlerin yandığını görüyorum.

Ben bu devreyi yapmadan önce ufak bir araştırma yapmıştım ancak Türkçe bir kaynağa denk gelmemiştim. İngilizce kaynaklara bakıp öğrenip devreyi kurduktan sonra bu şekilde yazarak Türkçe bir kaynak olsun istedim. Umarım birilerinin işine yarar. :)