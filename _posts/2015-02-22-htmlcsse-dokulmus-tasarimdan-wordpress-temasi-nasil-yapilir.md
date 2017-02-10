---
title: HTML/CSS’e dökülmüş tasarımdan WordPress teması nasıl yapılır?
---

Geçtiğimiz günlerde bir site için yeni bir WordPress teması yapmak için kolları sıvamıştım. İlk defa sıfırdan WordPress teması yapacağımdan yabancı kaynaklardan bolca yararlandım ancak bu beni baya uğraştırdı. Bu nedenle başkası uğraşmasın diye nasıl WordPress teması yapılacağını olabildiğince basit haliyle anlatmaya çalışacağım.

Elinizde HTML/CSS’e dökülmüş bir tasarım olduğunu ve WordPress kullanacağınızdan dolayı **index.html** ve **detay.html** olmak üzere en az iki farklı html sayfası olduğunu varsayıyorum. Birazdan anlatacağım yöntemleri uygulayarak elinizdeki bu dosyaları bir WordPress temasını çevireceğiz.

### header.php

Öncelikle header.php dosyasından başlayalım. Header.php dosyasınde head etiketi ve sitenizin üst kısmı bulunuyor. Bu dosya sitenizin her sayfasında gösterileceğinden logo, menü ve benzeri elemanlar da bu dosyada bulunur. En basit haliyle header’da şu kodlar yer alır:

```html
<!DOCTYPE html> 
<html>
<head> 
	<title>Sitenin Başlığı</title> 
	<link rel="stylesheet" type="text/css" href="style.css"> 
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script src="/js/script.js"></script> 
</head> 
<body>
	<div class="logo"></div> 
	<div class="menu">
	<ul> 
		<li>Anasayfa</li>
		<li>Hakkımızda</li> 
		<li>İletişim</li>
	</ul> 
	<div class="arama"> 
		<form method="get" action="/"> 
			<input type="text" value placeholder="Arama yap..." name="s"> 
		</form> 
	</div>
	</div>
```

Yani index.html dosyanızın en başından sitenizin üst kısmının bittiği yere kadar. **index.html** dosyanızdan bu kısımları alıp **header.php** dosyası olarak kaydediyoruz. Şimdi sıra bu dosyayı PHP kodları aracılığıyla WordPress’e entegre etmeye geldi.

İlk olarak title etiketinden başlıyoruz. Sitenizin başlığı sayfaya ve WordPress kurulumunda siz ne yazdıysanız ona göre değişeceğinden ötürü title etiketleri arasına şu kodu ekliyoruz:
```php
<title><?php bloginfo('name'); ?> <?php wp_title('-'); ?></title>
```