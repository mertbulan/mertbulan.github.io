---
title: 'Hosting firmalarından kurtulmanın formülü: DigitalOcean + ServerPilot'
---

Hosting firmaları (özellikle Türkiye'deki) sık sık sorun çıkaran ve bu sorunlara da çözümler üretemeyen firmalar. Bu firmalardan kurtulmanın artık çok basit bir yolu var.

DigitalOcean bir bulut sunucu hizmeti. Seçeceğiniz herhangi bir paket kapsamında size belirli işlemci gücüne, belirli trafik alanına, belirli RAM'e ve belirli depolama alanına sahip sunucu veriyor. Tamamen boş olan bu sunucuyu idare etmek birçok kişi için zor olsa da ServePilot hizmeti sayesinde bu zorluktan kurtulabiliyorsunuz.

Nedir bu 
[ServerPilot](http://serverpilot.io)? ServerPilot, sizin DigitalOcean'dan almış olduğunuz sunucunun yönetimini oldukça kolaylaştıran bir servis. Özellikle Wordpress ve benzer şekilde PHP tabanlı sitelere odaklanmış olan bu servis sunucunuza birkaç tıkla Wordpress sitenizi çalıştırmak içni gerekli olan PHP, Apache, MySQL gibi servislerin kurulumunu kendisi otomatik olarak yapıyor. Paneli sayesinde dilediğiniz kadar siteniz için alanlar oluşturup ve bu siteleriniz için de yine dilediğiniz kadar veritabanı oluşturabiliyorusunuz. Tüm bu işlemleri de yine herhangi bir teknik bilgi gerekmeden birkaç tıkla tıpkı Cpanel'deki gibi halledebiliyorsunuz.

Ben kendim uzun bir süredir bu blog dahil tüm sitelerimi ServerPilot aracılığıyla DigitalOcean'da barındırıyorum ve şuana kadar hiçbir sorun yaşamadım. DigitalOcean'ın Türkiye'ye en yakın sunucusu Frankfurt'ta bulunuyor ve ortalama 70 ms gibi bir ping süresine sahip.

ServerPilot'un 
[kurulumu](https://serverpilot.io/community/articles/how-to-connect-a-server-to-serverpilot.html) ise oldukça basit. Sadece ilk başta DigitalOcean'dan droplet oluştururken 64 bit Ubuntu 14.04 kuruyorsunuz ve daha sonra Terminal aracılığıyla sunucuya erişip birkaç satır komutu yazdıktan sonra bir daha da Terminal aracılığıyla sunucuya erişmeniz gerekmiyor. Geriye kalan her şeyi ServerPilot'un panelinden halledebiliyorsunuz.

Hem DigitalOcean'ın uygun fiyatı, hem teknik desteği, hem ServerPilot'un kolay kullanımı sizi hosting firmalarından kurtarıyor. Özellikle birden fazla siteye sahipseniz kesinlikle birçok artısı oluyor. Mesela normalde hosting firmaları cpu limiti, hosting paketlerinin esnek olmayışı, domain limiti, trafik limiti gibi sizin karşınıza bir sürü sorun çıkartıyorken kendi sunucunuza sahip olduğunuzda bu tarz limitler ya ortadan kalkıyor ya da çok geniş oluyor. Eğer kullandığınızdan daha yüksek bir trafiğe ihtiyaç duyarsanız birkaç tıkla DigitalOcean'dan bir üst pakete geçebiliyorsunuz.

Bu zamana kadar herhalde Türkiye'deki hemen hemen birçok hosting firmasını denemişimdir ve her seferinde çeşitli problemler yaşamışımdır. Artık kendi sunucuma geçmiş olmanın verdiği rahatlıkla birlikte web sitelerimi dilediğim gibi yönetiyor ve dilersem birkaç dakika içerisinde kendime yeni bir site kurabiliyorum. DigitalOcean ve ServerPilot ikilisini şiddetle tavsiye ederim.

Bu arada eğer 
[şu link](https://www.digitalocean.com/?refcode=dd0bf8811a78) aracılığıyla DigitalOcean'a üye olursanız 10$'lık kredi kazanabilirsiniz. Bu sayede 1 aylık sunucu masrafınızı da bedavaya getirmiş olursunuz. :) Eğer 
[bu linkten](https://www.serverpilot.io/?refcode=b8344697e301) de Serverpilot'a kayıt olursanız 10$ kredi kazanıp 1 ay boyunca Serverpilot'un ekstra özelliklerinden yararlanabilirsiniz.

[alert type="warn"]Hatırlatmakta yarar var; okulların başladığı zamanlarda GitHub, Student Developer Pack adında bir paket dağıtıyor ve bu pakette 100$'lık DigitalOcean kredisi yer alıyor. Okuduğunuz üniversiteden aldığınız mail adresiniz aracılığıyla bu paketten yararlanabilir ve 1 yıllık sunucu masrafınızı bedavaya getirebilirsiniz. [/alert]
