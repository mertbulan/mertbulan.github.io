---
title: OS X’de yaptığım bazı kişiselleştirmeler
---

Siz de benim gibi varsayılan olarak gelen ayarları kullanmak yerine kendinize göre OS X'i düzenliyorsanız bu yazı faydalı olabilir.

Adem İlter'in 
[BasitleşMac](https://medium.com/@ademilter/basitleşmac-1b4bb9599825#.8oq7teu8l) yazısını görünce ben de OS X'de kendi yaptığım kişiselleştirmeleri paylaşmak istedim. Bu kişiselleştirmeler benim için öyle önemli ki birkaç dakika da olsa başka birinin bilgisayarını kullandığımda bu değişiklikler yapılmamışsa o makineyi kullanırken biraz asabi olabiliyorum. Özellikle Apple Store'da yeni MacBook'ları incelerken gerçekten zorluk yaşıyorum bu nedenle incelediğim makinede öncelikle hemen bu değişikliklerin bir kaçını yapıyorum.

İlk olarak MacBook kullandığımdan ve fare yerine Trackpad'i tercih ettiğimi söyleyeyim. Trackpad'i kullanıyorken asla ama asla tıklama işlemi yapmıyorum. Ne sağ tık ne de sol tık. Hepsini dokunma işlemiyle hallediyorum. Bu yüzden OS X'i kurduktan hemen sonra Sistem Tercihleri'nden İzleme Dörtgeni ayarlarına gidip Tıklamak İçin Vurma kutucuğunu işaretliyorum.

![os-x-kisisellestirme-1](/uploads/os-x-kisisellestirme-1.png)

Bu ayardan hemen sonra normalde üç parmakla sürükle-bırak özelliğini yine buradan aktif hale getirirdim. Ancak Apple bu özelliği El Capitan ile birlikte buradan kaldırıp Erişebilirlik kısmını koymuş. Bu yüzden ben de yine Sistem Tercihleri'nden Erişebilirlik'e gidip oradan da Fare/İzle. Dörtgeni menüsünden İzleme Dörtgeni Seçenekleri butonuna tıklayıp açılan yerde "Sürüklemeyi etkinleşti" seçeneğini işaretleyip karşısındaki kutucuktan da "üç parmakla sürükle" seçeneğini seçerek bu özelliği aktif hale getiriyorum. Böylece dosya ya da pencereleri taşırken yine Trackpad üzerinden tıklama yapmadan üç parmakla bu işlemi gerçekleştirebiliyorum.

![os-x-kisisellestirme-2](/uploads/os-x-kisisellestirme-2.png)

Bir diğer yaptığım kişiselleştirme ise Dock ile ilgili. 13 inç ve 1280 x 800 piksel çözünürlüğüne sahip bir MacBook kullanıyorum. Dock varsayılan olarak aşağıda sabit olarak geldiğinden ekranın altından 70 piksel yüksekliğinde bir alan gidiyor. Dock sürekli kullandığım bir araç değil. Bana açık olan uygulamaları gösteriyor, bunu sürekli görmeme gerek yok. Bunun yanında sık kullandığım uygulamaları da gösteriyor. Bu sayede onları bir tıkla açabiliyorum. Ancak ben uygulamaları genelde Cmd + Space yaparak ekranın ortasında beliren Spotlight aracılığıyla açıyorum. Örneğin Google Chrome'u açmak istediğimde hemen Cmd + Space'e basıp 'Ch' yazdıktan sonra hemen Enter'a basıyorum ve Google Chrome açılıyor. Bence oldukça pratik. Bu yüzden Dock ayarlarından "Dock'ı otomatik olarak gizle ve göster seçeneğini" seçiyorum. Böylece ekranda Dock yerine daha fazla içerik görüyorum. Dock'ı gizlemişken bir de üzerine Büyütme efektini ekliyorum. Bu sayede mouse imleci ile ekranın altına geldiğimde Dock ortaya çıkıyor ve büyütme efektiyle Dock üzerinde dolaşıyorum.

![os-x-kisisellestirme-3](/uploads/os-x-kisisellestirme-3.png)

Dock'tan söz açılmışken ben de tıpkı Adem abi gibi Dock'ta uygulamaları boşluk aracılığıyla gruplandırıyorum. (bu özelliği ilk defa kendisinde görmüştüm) Bu sayede Dock biraz daha düzgün görünüyor. Dock'a boşluk eklemek için yapmanız gereken şey Terminal'i açıp şu satırı yazmak:

```bash
defaults write com.apple.dock persistent-apps -array-add '{"tile-type"="spacer-tile";}'
```

Ardından aşağıdaki satırı yazarak Dock'ı aç-kapa yapıyorsunuz ve eklediğiniz boşluk Dock'ta görünüyor:

```bash
killall Dock
```

Boşluğu sürükleyerek istediğiniz yere ekleyebilirsiniz. Aynı işlemi tekrar yaparak birkaç tane daha boşluk yerleştirebilirsiniz. Ben bu boşluk aracılığıyla günlük işlemlerde kullandığım ve iş için kullandığım uygulamaları ve normalde Dock'ta sabit olmayan ve şuanda aktif olan uygulamaları ayırmak için kullanıyorum. Bu arada en sağda fark ettiyseniz İndirilenler klasörünün yanına ek olarak Uygulamalar klasörünü de eklediğimi görebilirsiniz. Nedense iOS arayüzünden gelen Launchpad'e ben bir türlü alışamadım. Onun yerine buradaki Uygulamalar klasöründen tüm uygulamalara erişiyorum. (Hatta bu nedenle Launchpad'in, Trackpad'te başparmak ile üç parmağı kıstırarak açılmasını sağlayan kısayolunu da devredışı bıraktım)

![os-x-kisisellestirme-4](/uploads/os-x-kisisellestirme-4.png)

Bir diğer yaptığım ayar ise biraz pratik biraz da performansla ilgili. Finder'ı açtığınızda varsayılan olarak Tüm Dosyalarım penceresi açılıyor. Bunun biraz sisteme yük bindireceğini düşünüyorum. Zira bilgisayarınızdaki tüm dosyaları tarayarak size gösteriyor. Bu nedenle ben Finder'ın Tercihler kısmından Tüm Dosyalarım yerine Belgeler'i seçiyorum.


![os-x-kisisellestirme-5](/uploads/os-x-kisisellestirme-5.png)


Yaptığım bir diğer kişiselleştirme ise güvenlikle ilgili. Varsayılan olarak bilgisayar uyuduğunda ekranın kilitlenme süresi 5 dakika olarak geliyor. Ben tedbiri elden bırakmamak adına bunu hemen yapıyorum. Bu sayede ekran uyuduğu an bilgisayarım kilitlenmiş oluyor.


![os-x-kisisellestirme-6](/uploads/os-x-kisisellestirme-6.png)


OS X'de yaptığım kişileştirmeler bu şekilde. Sizin de kendi yaptığınız ve pratik olduğunu düşündüğünüz kişiselleştirmeler varsa yorum yazarak paylaşabilirsiniz.
