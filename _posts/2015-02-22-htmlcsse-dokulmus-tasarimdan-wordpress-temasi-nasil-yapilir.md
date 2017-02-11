---
title: HTML/CSS’e dökülmüş tasarımdan WordPress teması nasıl yapılır?
---

Geçtiğimiz günlerde bir site için yeni bir Wordpress teması yapmak için kolları sıvamıştım. İlk defa sıfırdan Wordpress teması yapacağımdan yabancı kaynaklardan bolca yararlandım ancak bu beni baya uğraştırdı. Bu nedenle başkası uğraşmasın diye nasıl Wordpress teması yapılacağını olabildiğince basit haliyle anlatmaya çalışacağım. 

Elinizde HTML/CSS'e dökülmüş bir tasarım olduğunu ve Wordpress kullanacağınızdan dolayı **index.html** ve **detay.html** olmak üzere en az iki farklı html sayfası olduğunu varsayıyorum. Birazdan anlatacağım yöntemleri uygulayarak elinizdeki bu dosyaları bir Wordpress temasını çevireceğiz.

### header.php

Öncelikle header.php dosyasından başlayalım. Header.php dosyasınde *head* etiketi ve sitenizin üst kısmı bulunuyor. Bu dosya sitenizin her sayfasında gösterileceğinden logo, menü ve benzeri elemanlar da bu dosyada bulunur. En basit haliyle header'da şu kodlar yer alır:

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

Yani index.html dosyanızın en başından sitenizin üst kısmının bittiği yere kadar. **index.html** dosyanızdan bu kısımları alıp **header.php** dosyası olarak kaydediyoruz. Şimdi sıra bu dosyayı PHP kodları aracılığıyla Wordpress'e entegre etmeye geldi.

İlk olarak *title* etiketinden başlıyoruz. Sitenizin başlığı sayfaya ve Wordpress kurulumunda siz ne yazdıysanız ona göre değişeceğinden ötürü *title* etiketleri arasına şu kodu ekliyoruz:

```php
<title><?php bloginfo('name'); ?> <?php wp_title('-'); ?></title>
```

Bu kod otomatik olarka Wordpress sitenizin başlığını çekiyor ve eğer herhangi bir yazıdaysanız da Site Başlığı - Yazı Başlğı şeklinde gösterilmesini sağlıyor. Tabii siz dilerseniz çeşitli SEO eklentileri (
[All in SEO Pack](https://wordpress.org/plugins/all-in-one-seo-pack/) ya da 
[Yoast](https://wordpress.org/plugins/wordpress-seo/)) aracılığıyla bu görünümü daha sonra değiştirebilirsiniz. Ancak şimdilik böyle kalması iyi olacaktır.

*title* etiketinden sonra sıra CSS dosyasının yolunu düzeltmeye geliyor. Eğer CSS dosyanızın adını **style.css** yaptıysanız Wordpress'te bunun için oldukça kullanışlı bir kod yer alıyor. Aşağıdaki kod değişikliğini yaparsanız ve **header.php** dosyasının bulunduğu dizine **style.css** dosyasını koyarsanız WordPress otomatik olarak **style.css** dosyanızı yükleyecektir.

```php
<!--Eski-->
<link rel="stylesheet" type="text/css" href="style.css">
<!--Yeni-->
<link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url'); ?>">
```

Stil dosyasını da tanımladıktan sonra sıra JavaScript dosyalarının yolunu tanımlamaya geliyor. Eğer başka bir siteden (yukarıda kaba haliyle Google'dan) JavaScript dosyası çağırdıysanız bunda herhangi bir değişiklik yapmanıza gerek yok. Ancak kendiniz js adında bir klasör oluşturup buraya da kendi yazdığınız ya da başka kaynaklardan edindiğiniz JavaScript dosyasını çağırdıysanız bunun için şu değişikliği yapmanız gerekiyor.

```php
<!--Eski-->
<script src="/js/script.js"></script>
<!--Yeni-->
<script src="<?php echo get_bloginfo('template_directory');?>/js/script.js"></script>
```

Burada yer alan *get_bloginfo('template_directory')* fonksiyonu temanızın bulunduğu klasöre erişiyor. Yani *site-adi.com/wp-content/themes/tema-adi/* yolunu çağırıyor. Eğer bu dizin altında yer alan başka dosyalarınızı da çağırmak istiyorsanız bu PHP kodunu kullanabilirsiniz.

Bu işlemi de tamamladıktan sonra *head* etiketi arasında son bir işlem daha yapacağız. Bu işlem WordPress'e head etiketinin nerede olduğunu gösterecek. Aşağıdaki kodu head etiketleri arasına eklediğinizde WordPress olur da bir CSS dosyası ya da JavaScript dosyası çağırması gerekirse sizin bu kodu eklediğiniz yerde gerekli kodları otomatik olarak ekleyerek bu dosyaları çağıracaktır. Örneğin bir eklenti yüklediniz ve o eklenti bazı dosyaları çağırması gerekiyor. Siz head etiketinin nerede olduğunu bu kod aracılığıyla gösterdiğiniz için eklenti otomatik olarak çağırması gereken dosyaları bu kodun olduğu yerde çağıracaktır. head etiketleri arasına ekleyeceğiniz kod:

```php
<?php wp_head(); ?>
```

Şimdi head etiketini kapatıyor ve body etiketinin içerisine geçiş yapıyoruz. Burada yapacağımız değişiklik ise menü kısmında olacak. Bu değişilik ile Wordpress'te oluşturduğunuz sayfalar otomatik olarak sizin oluşturduğunuz menü alanında gözükecek. (Bu arada sizin de menüdeki sayfaları unorder list yani ul etiketi aracılığıyla eklediğinizi varsayıyorum) Öncelikle Anasayfa'dan başlıyoruz. Çünkü anasayfa birazdan kullanacağımız sayfaları çekecek olan PHP kodunda yer almıyor. O kod sadece sayfaları çekiyor bu nedenle Anasayfa'yı farklı bir kodla ekleyeceğiz:

```php
<li><a href="<?= get_bloginfo("home") ?>">Anasayfa</a></li>
```

Burada *a* etiketinin *href* kısmına eklediğimiz PHP kodu sizin anasayfanıza işaret ediyor. Eğer anasayfanızın linkini başka yerde çağırmak isterseniz (arama formunun *action* kısmı gibi) yine bu PHP kodunu kullanabilirsiniz.

Şimdi sıra sayfalara geldi, bunun için yapmanız gereken şey bu anasayfa kodunun hemen altına ve ul etiketi arasına aşağıdaki kodu eklemek:

```php
<?php wp_list_pages('title_li&orderby=ID&exclude=10,11'); ?>
```

Bu kodu biraz açıklayacak olursam; *wp_list_pages* fonksiyonun aldığı verilerden ilki *title_li*. Bu veri sayesinde sayfalar li etiketleri arasında çağrılıyor. Bu yüzden kodu *ul* etiketleri arasına ekledik. *orderby* kısmı ise çağrılan sayfaların ne şekilde sıralanacağını söylüyor. Eğer siz de buradaki gibi *ID* yaparsanız sayfaların *ID* değerlerine göre sayfalar küçükten büyüğe şeklinde sıralanacaktır. Bu değeri değiştirerek dilerseniz sayfaları alfabetik olarak ya da yaratılış tarihine göre sıralayabilirsiniz. *exlude* değeri ise hangi sayfaların gösterilmeyeceğini belirtiyor. Eğer bir sayfa oluşturduysanız ve o sayfanın menüde gözükmesini istemiyorsanız bu değerin karşısına o sayfanın ID'sini yazarsanız o sayfa menüde gözükmez. (Bu örnekte 10 ve 11 ID'sine sahip sayfalar gösterilmiyor.) Diğer verilere 
[şu adresten](http://codex.wordpress.org/Function_Reference/wp_list_pages) ulaşabilirsiniz.

Bu arada ben menüde oluşturduğunuz sayfaları göstereceğinizi varsayarak bu kodu kullandım. Eğer siz menüde kategorileri göstermek istiyorsanız kodda *wp_list_pages* yazan kısmı *wp_list_categories* şeklinde değiştirseniz kategorileriniz gösterilecektir. (Bu arada kategoriler hemen gözükmez kodu ekledikten sonra kategorilerim neden gözükmüyor diye düşünmeyin. Kategorilerin gözükmesi için o kategoride bir yazı olması gerekiyor. Test etmek amaçı bir yazı oluşturup tüm kategorileri seçebilirsiniz.)

Bu adımı da yaptıktan sonra **header.php**'deki işimiz tamamlanıyor. Tabii sizin başka verileriniz varsa onları da WordPress'e entegre etmeniz gerekiyor. Çünkü ben burada temayı en basit haliyle ele alıyorum. Entegre işleminden sonra **header.php** şu şekilde görünüyor;

```php
<!DOCTYPE html>
<html>
<head>
<title><?php bloginfo('name'); ?> <?php wp_title('-'); ?></title>
<link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url'); ?>">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="<?php echo get_bloginfo('template_directory');?>/js/script.js"></script>
<?php wp_head(); ?>
</head>
<body>
    <div class="logo"></div>
    <div class="menu">
     <ul>
      <li><a href="<?= get_bloginfo("home") ?>">Anasayfa</a></li>
      <?php wp_list_pages('title_li&orderby=ID&exclude=10,11'); ?>
     </ul>
     <div class="arama">
       <form method="get" action="<?= get_bloginfo("home") ?>/">
       <input type="text" value placeholder="Arama yap..." name="s">
       </form>
     </div>
    </div>
```

Buradaki önemli kısım *body* etiketini kapatmıyor olmamız. *body* ve *html* etiketlerini en sonda yani **footer.php** dosyasında kapatacağız.

### sidebar.php

Şimdi sırada **sidebar.php** dosyası var. Eğer siteniz iki sütündan oluşuyorsa **sidebar.php** dosyasına ihtiyacınız var. Sadece tek bir sütundan oluşuyorsa (bu site gibi) **sidebar.php** dosyasını oluşturmasanız da olur. Sidebar dediğimiz şey yan menü olduğundan ve Wordpress de bize bu yan menüyü çok kolay bir şekilde düzenleyebilmemiz için bileşen özelliğini sunduğundan yan menüde bulunan her şeyi çeşitli eklentiler ve bileşenler özelliğiyle ekleyebiliriz. Bunun için **sidebar.php** dosyasına sadece bileşen özelliğini eklesek aslında yeter. Ancak ben biraz daha farklı olması açısından **sidebar.php**'ye "Teknoloji kategorisinden son yazılar" şeklinde bir alan da eklemek istiyorum. Bu dosyanın Wordpress'e uyarlanmamış hali şu şekilde oluyor:

```html
<div class="son-yazilar">
<h2>Teknoloji Kategorisinden Son Yazılar</h2>
<ul>
   <li>Apple'ın arabaları 2020 yılında geliyor</li>
   <li>GM eski CEO'su araba üretmemesi konusunda Apple'ı uyardı</li>
   <li>iPhone 7 tasarımı yine sızdı...</li>
   <li>Apple güneş enerjisine yaklaşık 1 milyar dolar yatırım yaptı</li>
</ul>
</div>
<!--diğer bileşenler burada-->

```

İstediğimiz kategoriden son yazıları çekmek için yapmamız gereken tek şey *ul* etiketi arasındaki her şeyi silip aşağıdaki kodu eklemek. 

```php
<?php $recentPosts = new WP_Query();
      $recentPosts->query('showposts=4&cat=8'); ?>
      <?php while ($recentPosts->have_posts()) : $recentPosts->the_post(); ?>
      <li><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></li>
      <?php endwhile; ?> 
```

Bu kodda dikkat çekmek istediğim kısım query fonksiyonun aldığı veriler. Bunlardan ilki olan *showposts* o kategoriden kaç tane yazının çekileceğini belirtiyor. *cat* kısmı ise hangi kategoriden yazıların çekileceğini belirtiyor. Bu örnekte Teknoloji kategorisinden yazıları çektiğimiz için Teknoloji kategorisinin *ID*'sini yazıyoruz. 

Sidebar'da yer alacak diğer kısımları bileşenler aracılığıyla ekleyeceğimiz için **sidebar.php**'yi bileşenleri destekleyecek hale getiriyoruz. Bunun için de aşağıdaki kodu ekliyoruz:

```php
<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : ?>
<?php endif; ?>
```

Bu kodu ekledikten sonra işimiz bitmiyor. **Sidebar.php**'yi bileşenleri destekleyecek hale gelmesi için bir de **functions.php** isimli bir dosya oluşturuyor ve aşağıdaki kodu ekliyoruz:

```php
<?php
 if ( function_exists('register_sidebar') )
 register_sidebar(array(
 'before_widget' => '<div class="oge">',
 'after_widget' => '</div>',
 'before_title' => '<div class="ogebaslik">',
 'after_title' => '</div>',
 ));
 ?>
 ```

Bu koddaki *oge* class'ı aracılığıyla eklenecek her bileşen için varsayılan bir şablon oluşturabilir, *ogebaslik* aracılığıyla da o bileşenin başlık stillerini dilediğiniz gibi CSS dosyasınızdan belirleyebiliriz. (isterseniz bu isimleri değiştirebilirsiniz) Bu kodu ekledikten sonra **functions.php** dosyasını kaydediyoruz ve **header.php**, **sidebar.php** dosyalarının bulunduğu dizine atıyoruz. Yaptığımız değişiklikler sonucunda **sidebar.php** dosyası şu şekilde görünüyor:

```php
<div class="son-yazilar">
<h2>Teknoloji Kategorisinden Son Yazılar</h2>
<ul>
   <?php
    $recentPosts = new WP_Query();
    $recentPosts->query('showposts=4&cat=8'); ?>
    <?php while ($recentPosts->have_posts()) : $recentPosts->the_post(); ?>
    <li><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></li>
    <?php endwhile; ?> 
</ul>

<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : ?>
<?php endif; ?>
```

### index.php

Sırada **index.php** var. Bu kısım sitemizin ana kısmını oluşturuyor. Burada blogumuza eklediğimiz yazılar yer alıyor. index dosyasını en basit haliyle şu şekilde gösterebiliriz:

```html
    <div class="yazi">
  <h1>Bilgisayar Bilimi Nedir?</h1>
        <span class="yazar"><b>Yazar:</b> Mert Bulan</span><span class="tarih"><b>Tarih:</b> 15 Nisan 2015</span><span class="kategori"><b>Kategori:</b> Teknoloji</span><span class="etiket"><b>Etiketler:</b> bilim, teknoloji, bilgisayar</span>
        <p class="yazi-icerik">Bilgisayar bilimi, bilgi ve hesaplamanın kuramsal temellerini ve bunların bilgisayar sistemlerinde uygulanabilmeleri sağlayan pratik teknikleri araştıran bir bilim dalıdır. Bilgisayar bilimcileri bilgi oluşturan, tanımlayan ve dönüştüren algoritmik süreçler icat edip, kompleks sistemleri tasarlamak ve modellemek için uygun soyutlamalar formüle ederler.</p>
     </div>
     <div class="yazi">
  <h1>Bilgisayar Bilimi Nedir?</h1>
        <span class="yazar"><b>Yazar:</b> Mert Bulan</span><span class="tarih"><b>Tarih:</b> 15 Nisan 2015</span><span class="kategori"><b>Kategori:</b> Teknoloji</span><span class="etiket"><b>Etiketler:</b> bilim, teknoloji, bilgisayar</span>
        <p class="yazi-icerik">Bilgisayar bilimi, bilgi ve hesaplamanın kuramsal temellerini ve bunların bilgisayar sistemlerinde uygulanabilmeleri sağlayan pratik teknikleri araştıran bir bilim dalıdır. Bilgisayar bilimcileri bilgi oluşturan, tanımlayan ve dönüştüren algoritmik süreçler icat edip, kompleks sistemleri tasarlamak ve modellemek için uygun soyutlamalar formüle ederler.</p>
     </div>
     <div class="yazi">
  <h1>Bilgisayar Bilimi Nedir?</h1>
        <span class="yazar"><b>Yazar:</b> Mert Bulan</span><span class="tarih"><b>Tarih:</b> 15 Nisan 2015</span><span class="kategori"><b>Kategori:</b> Teknoloji</span><span class="etiket"><b>Etiketler:</b> bilim, teknoloji, bilgisayar</span>
        <p class="yazi-icerik">Bilgisayar bilimi, bilgi ve hesaplamanın kuramsal temellerini ve bunların bilgisayar sistemlerinde uygulanabilmeleri sağlayan pratik teknikleri araştıran bir bilim dalıdır. Bilgisayar bilimcileri bilgi oluşturan, tanımlayan ve dönüştüren algoritmik süreçler icat edip, kompleks sistemleri tasarlamak ve modellemek için uygun soyutlamalar formüle ederler.</p>
     </div>
```

WordPress tüm yazıları döngü halinde kendisi çağırdığı için bizim sadece bir yazı şablonunu WordPress'e uygun hale getirip diğer yazıları da bu şablon aracılığıyla çağırmamız gerekiyor. Bunun için öncelikle uygun hale getireceğimiz *yazi* şablonunun üstüne döngünün burada başladığını belirmek için şu kodları ekliyoruz:

```php
<?php if( have_posts() ) : ?> 
<?php while( have_posts() ) : the_post(); ?>
```

Şimdi ise sırayla yazi şablonun içerisindeki bilgileri WordPress'e uygun hale getireceğiz. İlk olarak *h1* etiketini içerisindekilerle birlikte silip aşağıdaki kodu ekliyoruz:

```php
<!--Eski-->
<h1>Bilgisayar Bilimi Nedir?</h1>
<!--Yeni-->
<h1><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h1>
```

Bu kod hem yazının başlığını hem de linkini çekiyor. Bu sayede başlığa tıklayan ziyaretçiler yazının detayına inebiliyor. Bu işlemden sonra yazar kısmında yazar adını, tarih kısmında tarih kısmını, etiketler kısmında etiketleri, kategori kısmında kategoriyi silip aşağıdaki kodları ekliyoruz:

```php
<!--Yazar adı-->
<?php the_author(); ?>
<!--Tarih-->
<?php the_time('d F Y') ?>
<!--Kategori-->
<?php the_category('') ?>
<!--Etiketler-->
<?php the_tags('',', ',''); ?>
```

Bu işlemi de yaptıktan sonra *yazi-icerik* içerisinde yer alan yazıları silip aşağıdaki kodu ekliyoruz. Buradaki "devamını oku..." kısmı siz yazıyı yazarken tamamının anasayfada görünmesini istemediğiniz zaman kullandığınız *more* etiketi kullanıldığında yazının bölünen kısmında çıkacak yazıyı temsil ediyor. Burayı "tamamını oku..." ve benzeri şekilde dilediğiniz gibi değiştirebilirsiniz.

```php
<?php the_content('devamını oku...'); ?>
```

Bu kodu da ekledikten sonra *yazi* div'ini kapadığımız yere aşağıdaki kodu ekliyoruz. Böylece Wordpress döngünün nerede bittiğini anlıyor.

```php
<?php endwhile; endif;  ?>
```

Bu işlemden sonra anasayfanın alt kısmına sayfalar arasında geçiş yapmak için navigasyon kısmını ekleyeceğiz. Bu sayede örneğin anasayfanızda 5 yazı varsa bu navigasyon aracılığıyla kullanıcılar 2. sayfaya geçip diğer yazılarınıza ulaşabilecek. Bu navigasyon için eklememiz gereken kod:

```php
<?php posts_nav_link(); ?>
```

Tüm bu işlemleri yaptıktan sonra yapmamız gereken bir diğer şey ise **header.php**, **sidebar.php** ve **footer.php** dosyalarını **index.php** dosyası içerisinde çağırmak. Çünkü anasayfada sitenin üst kısmı, yan menü ve alt kısım yer alıyor. (**footer.php** dosyasını henüz oluşturmadık ama şu aşamada önemli değil) Bu çağırma işlemleri için **header.php**'yi çağıracak kodu en üste, **sidebar.php**'yi çağıracak kodu onun altına (tasarımınızda neredeye uygun düşüyorsa oraya) ve son olarak **footer.php**'yi çağıracak olan kodu en alta ekliyoruz. Kodlar:

```php
<!--header.php için-->
<?php get_header(); ?>
<!--sidebar.php için-->
<?php get_sidebar(); ?>
<!--footer.php için-->
<?php get_footer(); ?>
```

Tüm bu işlemleri yaptıktan sonra **index.php** dosyamız şu şekilde görünüyor:

```php
<?php get_header(); ?>

    <?php get_sidebar(); ?>

    <?php if( have_posts() ) : ?> 
    <?php while( have_posts() ) : the_post(); ?>
    <div class="yazi">
  <a href="<?php the_permalink() ?>"><?php the_title() ?></a></h1>
        <span class="yazar"><b>Yazar:</b> <?php the_author(); ?></span><span class="tarih"><b>Tarih:</b> <?php the_time('d F Y') ?></span><span class="kategori"><b>Kategori:</b> <?php the_category('') ?></span><span class="etiket"><b>Etiketler:</b> <?php the_tags('',', ',''); ?></span>
        <p class="yazi-icerik"><?php the_content('devamını oku...'); ?></p>
     </div>
     <?php endwhile; endif;  ?>
      
     <?php posts_nav_link(); ?>

<?php get_footer(); ?>
```

Şuana kadar sitemizin **header.php**, **sidebar.php**, **functions.php** ve **index.php** dosyalarını oluşturduk. Sırada **single.php**, **page.php**, **search.php**, **404.php** ve **footer.php** dosyaları var. Aslında **footer.php** hariç diğer kalan dosyaların içerikleri neredeyse birbirine benzer olacaklarından bu sayfaları oluşturmak daha kolay olacaktır. (Tabii siz page ve search için özel tasarım yaptıysanız farklı olacaktır. Ancak genel olarak düşündüğümüzde bu sayfalardaki içerikler benzerdir)

### single.php

**single.php** dosyasından başlayalım. Öncelikle şunu söyleyeyim ki son zamanlarda [Disqus](https://wordpress.org/plugins/disqus-comment-system/) eklentisinin kullanımı arttığından ve Disqus aracılığıyla yorum yazmak kolaylaştığından yorum alanını es geçeceğim. Çünkü Disqus aracılığıyla gerçekten kullanışlı bir yorum sistemini sitenize kolaylıkla entegre edebilirsiniz. Bu yüzden **single.php** sayfası **index.php**'ye oldukça benzeyecek. (Tabii siz **index.php**'ye farklı şeyler eklemişseniz çok fazla benzerlik olmayacaktır. Ancak benim yukarıda anlattığım şekilde bir **index.php** dosyanız varsa neredeyse birebir aynısı olacaktır. **detay.html** dosyasınızda yer alan ve **index.html**'de yer almayan elementleri bu kısma ekleyeceksiniz)

**single.php** dosyasımızı oluşturuyorken **index.php** dosyasındakileri aynen kopyalıyoruz. Daha sonra *the_content* fonksiyonu içerisinde yer alan 'devamını oku...' kısmını siliyoruz. Çünkü **single.php** sayfası zaten yazının tamamının gösterileceği sayfa olduğundan devamını oku gibi bir şeye ihtiyacımız kalmıyor. Daha sonra eklediğimiz navigasyon kodunu da siliyoruz. Disqus eklentisini kullanacağımız için eklentiye yorum alanını belirtmek için son olarak aşağıdaki kodu ekliyoruz:

```php
<?php comments_template(); ?>
```

Tüm bu işlemlerin sonunda **single.php** dosyamız şu şekilde görünüyor:

```php
<?php get_header(); ?>

    <?php get_sidebar(); ?>

    <?php if( have_posts() ) : ?> 
    <?php while( have_posts() ) : the_post(); ?>
    <div class="yazi">
  <a href="<?php the_permalink() ?>"><?php the_title() ?></a></h1>
        <span class="yazar"><b>Yazar:</b> <?php the_author(); ?></span><span class="tarih"><b>Tarih:</b> <?php the_time('d F Y') ?></span><span class="kategori"><b>Kategori:</b> <?php the_category('') ?></span><span class="etiket"><b>Etiketler:</b> <?php the_tags('',', ',''); ?></span>
        <p class="yazi-icerik"><?php the_content(); ?></p>
     </div>
     <?php endwhile; endif;  ?>
      
     <?php comments_template(); ?>

<?php get_footer(); ?>
```

### page.php

**page.php** kısmen **single.php**'ye benziyor. Sadece single.php'de bulunan bir takım şeyler burada bulunmuyor. Örneğin tarih, kategori, etiketler, yazar bilgisi genel olarak sayfa şablonlarında yer almıyor. Bununla birlikte yorum kısmı da sayfalarda yer almayan bir diğer elemanlardan. Tüm bu bilgileri silip page.php dosyamızı oluşturduğumuzda karşımıza şu şekilde bir kod yığını çıkıyor:

```php
<?php get_header(); ?>
    <?php get_sidebar(); ?>

    <?php if( have_posts() ) : ?> 
    <?php while( have_posts() ) : the_post(); ?>
    <div class="yazi">
  <a href="<?php the_permalink() ?>"><?php the_title() ?></a></h1>
        <p class="yazi-icerik"><?php the_content(); ?></p>
     </div>
     <?php endwhile; endif;  ?>

<?php get_footer(); ?>
```

### search.php

**search.php** ise daha çok **index.php**'ye benziyor. Farkı ise aranılan kelimeyi ve arama sonucunda bir şey bulunamadıysa bunu bildiren mesajı içermesi. Bunun için öncelikle aşağıdaki kodu *if( have_posts() )* fonksiyonun bulunduğu PHP kodunun hemen altına ekliyoruz:

```php
<span>Arama Sonuçları: "<?php echo $s ?>"</span>
```

Daha sonra döngüyü bitiren *endwhile* ile başlayan kodun içerisinde yer alan *endif;* kısmını siliyoruz. Bunu yapma nedenimiz eğer aradığımız kelime bulunamadıysa başka bir şey göstermek için *else* ifadesi tanımlayarak *else* ifadesinde mesajımızı göstermek. Bunun için de endwhile içeren PHP kodunun altına aşağıdaki kodu ekliyoruz:

```php
<?php else : ?>
<span class="bulunamadi">Aradığınız kelime bulunamadı.</span>
<?php endif; ?>
```

Bu kodu ekledikten sonra **search.php** dosyamızın son hali şu şekilde oluyor:

```php
<?php get_header(); ?>
    <?php get_sidebar(); ?>

    <?php if( have_posts() ) : ?> 
    <p>Arama Sonuçları: "<?php echo $s ?>"</p>
    <?php while( have_posts() ) : the_post(); ?>
    <div class="yazi">
  <a href="<?php the_permalink() ?>"><?php the_title() ?></a></h1>
        <span class="yazar"><b>Yazar:</b> <?php the_author(); ?></span><span class="tarih"><b>Tarih:</b> <?php the_time('d F Y') ?></span><span class="kategori"><b>Kategori:</b> <?php the_category('') ?></span><span class="etiket"><b>Etiketler:</b> <?php the_tags('',', ',''); ?></span>
        <p class="yazi-icerik"><?php the_content('devamını oku...'); ?></p>
     </div>
     <?php endwhile; ?>

     <?php else : ?>
     <span class="bulunamadi">Aradığınız kelime bulunamadı.</span>
     <?php endif; ?>
      
     <?php posts_nav_link(); ?>
<?php get_footer(); ?>
```

### footer.php

Sizin tasarımınızda footer kısmı var mı bilmiyorum ama yeni yapılan tarımlarda infite-scroll olayı olduğundan dolayı footer kısmı bulunmuyor. (tasarımsal anlamda element içermiyor) Ben de yaptığım tasarımlarda genelde footer kısmını tasarlamıyorum. Zaten WordPress'e entegre etme işleminde footer'a özgü pek bir şey bulunmuyor. Yapmamız gereken tek şey aslında WordPress'e tıpkı **header.php** dosyasında yaptığımız gibi footer'ın nerede olduğunu belirtmek. Bunun için footer.php dosyamızın en üstüne aşağıdaki kodu ekliyoruz:

```php
<?php wp_footer(); ?>
```

Daha sonra **header.php**'de açmış olduğumuz *body* ve *html* etiketlerini kapatıyoruz. **footer.php**'nin son hali şu şekilde oluyor:

```php
<?php wp_footer(); ?>
</body>
</html>
```

### 404.php

404.php dosyası hata sayfasıdır. Eğer sitenizde olmayan bir linke ziyaretçi girerse, örneğin [http://mertbulan.com/deneme](http://mertbulan.com/deneme ) gibi, ziyaretçi bu sayfayla karşılaşır. Onu da aşağıdaki kodla en basit haliyle oluşturabiliriz:

```php
<?php get_header(); ?>
 <?php get_sidebar(); ?>
    <h2>Hata 404 - Aradığınız Sayfa Bulunamadı.</h2> 
<?php get_footer(); ?>
```

404.php'yi de tamamladığımıza göre artık bir adet WordPress temasına sahibiz demektir. Bu arada yukarıdaki dosyaların bulunduğu tema klasörünün içerisine *screenshoot.png* isimli temanın görüntüsünü içeren bir dosya atarsanız WordPress panelinin Görünüm kısmında temanızın görselini de görebilirsiniz. Ayrıca **style.css** dosyanızın en üstüne aşağıdaki bilgileri girerseniz yine WordPress panelinin Görünüm kısmında temanızın detaylarının yer aldığı kısımda bu bilgilerin görünmesini sağlayabilsiniz:

```css
/*
Theme Name: Mert Bulan
Theme URI: http://mertbulan.com
Description: Bu tema örnek olarak tasarlanmıştır.
Version: 1.0
Author: Mert Bulan
Author URI: http://mertbulan.com
*/
```

Eminim bazıları archieve.php dosyasını neden oluşturmadığımı merak edecektir. Şöyle ki; archive.php dosyasında sitede yer alan tüm yazılar yer alıyor. Onu oluşturmak yerine [Clean My Archives](https://wordpress.org/plugins/clean-my-archives/) isimli eklentinin kullanılmasını tavsiye ediyorum. Eklentiyi yükleyip WordPress panelinden sayfa oluştur dedikten sonra oluşturduğunuz sayfaya aşağıdaki kodu eklerseniz arşiv sayfanız hazır olur:

```php
[clean-my-archives]
```

Yazının başında da söylediğim gibi ben burada anlattığım tüm bilgilere farklı farklı yabancı kaynaklardan ulaştım. Bu yazıyı yazma nedenim ise benim gibi WordPress teması yapmak isteyen kişilere olabildiğince basit haliyle bunu anlatmak. Çünkü internetteki yazılar çok karışık ve göz korkutucu.  Nereden başlamanız gerektiğinizi anlayamıyorsunuz. (En azından ben anlayamadım) Ben WordPress ya da PHP uzmanı değilim. Yukarıdaki yöntemler aracılığıyla sorunsuz bir şekilde çalışan ve ihtiyaçlarımı karşılayan 2 WordPress teması yaptım. Üzerlerinde çalışmaya devam da ediyorum. Umarım yukarıdaki anlatım sizin de kolay bir şekilde HTML/CSS'e dökülmüş olan tasarımınızı WordPress teması haline getirmenizde yardımcı olur.

Sorularınızı yorum kısmından sorabilirsiniz. Elimden geldiğince bilgim dahilinde yardımcı olmaya çalışırım.