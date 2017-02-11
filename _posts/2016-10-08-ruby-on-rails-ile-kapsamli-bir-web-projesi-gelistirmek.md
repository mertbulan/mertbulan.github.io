---
title: Ruby on Rails ile kapsamlı bir web projesi geliştirmek
---

Mobil uygulamalarla konuşan, CRM yazılımıyla haberleşen, kullanıcılara push mesaj gönderen ve CMS sistemi olan bir Ruby on Rails ile kapsamlı bir web projesi nasıl geliştirilir?

Daha önce Caffè Nero projesi hakkında kısa ve çok fazla teknik detay içermeyen bir blog yazısı 
[yazmıştım.](/2016/10/03/bir-back-end-yenileme-projesi-caffe-nero/) Ancak yazılım dünyasının içinde olan birçok kişiyi bu yazı tatmin etmemiş olsa gerek ki benden proje hakkında daha detaylı bir yazı yazmamı rica ettiler. Başlangıçta çok uzun olacağından ve okunmayacağını düşündüğümden yazmak istememiştim ama artık benden günah gitti :)

## Elimizde ne var? Bizden istenen ne?

Caffè Nero aslında yeni bir uygulama değil. Birkaç yıldır yayında ve hali hazırda birçok aktif kullanıcısı bulunuyor. Uygulamayı kısaca anlatacak olursam: Caffè Nero uygulaması üzerinden kredi kartınızı tanımlayarak QR kod aracılığıyla ödemelerinizi telefonunuz aracılığıyla yapabiliyorsunuz. Bununla birlikte almış olduğunuz her içecekten 1 adet damga kazanıyorsunuz. Damga sayınız 9 olduğunda ise 1 adet ücretsiz kahve kazanıyorsunuz. Bu her içecekte damga kazanma olayı aslında manuel olarak da yapılıyor. İlk kahvenizi aldığınızda size bir kart veriyorlar ve her içecek aldığınızda kaşeyle o karta basıyorlar. Mobil uygulama sayesinde bu iş daha pratik hale gelmiş oluyor. Mobil ödeme ve içecekle damga kazanımının yanında dilerseniz kazandığınız damgayı arkadaşınıza da gönderebiliyorsunuz. Bununla birlikte uygulama içerisinde ürünler ve mağazalar hakkında bilgi edinebiliyor ve ufak bir quiz oyunu oynayabiliyorsunuz.

İşte bizim elimizde olan Caffè Nero uygulaması buydu. Hali hazırda ASP.NET ile yazılmış bir back-end'e sahipti. Bizden istenen ise back-end'i sıfırdan Ruby on Rails ile yazmamızdı. Peki neden böyle bir şeye ihtiyaç vardı? Ben daha önceki sistemde yaşanan zorluğu, ASP.NET'i ve Ruby on Rails'e geçiş nedemizi bilmediğimden bu soruyu projede birlikte çalıştığım ekip liderim [Serdar](http://twitter.com/sdogruyol)'a sordum. Onun cevabı şöyle:

> ASP.NET ile kurulan mimarinin ölçeklenebilirliği mümkün değildi. Sürdürülebilirlik ve ölçeklenebilirlik konusunda sorunlar yaşanıyordu. O yüzden Ruby ve Rails ile daha ölçeklenebilir ve modüler bir yapı kurularak baştan yazıldı. Ruby kullanılmasının sebebi hızlı geliştirme süreci ve TDD ile en kısa sürede maksimum verimi almak.


## Uygulamanın işleyişi

![cafe-nero-backend](/uploads/cafe-nero-backend.png)

### 1. iOS ve Android uygulamalarının server'la konuşması (REST API Endpoint)

Başta söylediğim gibi Ruby on Rails ile bir web uygulaması tasarlıyoruz. Ancak bu uygulamada CMS dışında herhangi bir kullanıcı arayüzü bulunmuyor. Bu şu demek oluyor, client'lar bu uygulama ile API endpoint'leri aracılığıyla POST, GET, PATCH ve DELETE metodları kullanarak haberleşecek. Örneğin, mobil uygulama üzerinden mağazaların listelenmesi isteniyorsa mobil uygulama üzerinden 
*"www.sunucu-adresi.com/stores"*  adresine GET isteği gönderilmesi gerekiyor. Bu adrese istek gönderildiğinde eğer ben Rails uygulamasının *config/routes.rb*  dosyasına böyle bir endpoint eklemişsem, bu endpointe bağlamış olduğum ilgili controller'daki fonksiyonu (burada index diye tanımlıyorum, istediğiniz ismi kullanabilirsiniz) çağırıyorum.

```ruby
get '/stores', to: 'stores#index'
```

Client tarafı benden mağazaların listesini istediğinden dolayı bir şeyler dönmem gerekiyor. Genelde API uygulamalarında XML ve JSON formatında veri dönülüyor. Biz JSON tercih ettiğimizden ilgili fonksiyonda dönülmesi gereken yere:

```ruby
render json: store, status: 200
```

şeklinde bir satır eklemem yeterli oluyor. Sondaki *status: 200*  işlemin başarılı olduğunu söylüyor. Burada store değişkenine *Store*  modelindeki tüm mağazaları atamış olmam gerektiğini de hatırlatmam lazım. Kısacası *storescontroller.rb*  dosyasında şöyle bir fonksiyon tanımlamış oluyorum:

```ruby
def index
  stores = Store.all
  render json: store, status: 200
end
```

Bu durumda döndüğümüz JSON verisi içerisindeki mağazalarda 
Store modelinde tanımladığımız tüm özellikler (attribute) yer alıyor. Diyelim ki sadece mağaza isimini ve adresini dönmek istiyorsunuz bu durumda özel bir view oluşturmanız gerekiyor. Burada ise bize 
jbuilder gem'i yardımcı oluyor. Uygulamamızın *view*  klasörü altına *stores*  diye bir klasör oluşturup daha sonra *index.json.jbuilder*  adında bir dosya oluşturuyoruz. Oluşturduğumuz dosyayı aşağıdaki gibi yaptığımızda sadece mağaza isim ve adresinin dönmesini sağlıyoruz.

```ruby
json.stores @stores do |store|
  json.name store.name
  json.address store.address
end
```

Tabii böyle bir değişiklik yapınca ilgili controller'ımızda da değişiklik yapmamız gerekiyor. Çünkü artık doğrudan JSON dönmek yerine view aracılığıyla JSON dönüyoruz. Bu durumda view'in mağazalara erişebilmesi için yukarıdaki kodda yer alan *@stores*  değerine ihtiyaç olunduğunu görüyoruz. Controller'ımızı da şu şekilde tekrar düzenliyoruz:

```ruby
def index
  @stores = Store.all
end
```

İşte bu kadar. Artık mobil uygulamalardan mağazaları listelemek için ilgili endpoint'e bir istek geldiğinde bu şekilde ister kişiselleştirerek istersek de doğrudan tüm mağazaları tüm özellikleriyle dönebiliyoruz.

Buraya kadar olan kısım sadece GET metoduna sahip endpoint'ler için geçerliydi. Yani ön tarafın (client) bize hiçbir bilgi göndermeden bizden direk mağaza listesini istemesi durumunda gerçekleşecek olan senaryo. Bir de en sık kullanılan bir diğer metot POST metodu var. Bu POST metodunda ise ön taraf bize bir şey gönderiyor ve biz cevap olarak istersek sadece gönderdiğiniz istek başarılı diye cevap dönebiliyoruz istersek de ön tarafın istediği bir şey varsa onu dönüyoruz. Mesela ön taraf bizden email adresi *steve@apple.com*  olan kullanıcının tüm bilgilerini dönmemizi istedi. Bu durumda öncelikle tıpkı yukarıdaki gibi *routes.rb* dosyamıza

```ruby
post 'user/:id', to: 'users#show'
```

şeklinde bir satır eklememiz gerekiyor. Burada metodun post olduğunu ilgili endpoint'i ve bu endpoint'e istek geldiğinde hangi controller'ın (users) hangi fonksiyonunun (show) çağrılacağını belirtiyoruz. Daha sonra yine ilgili controller'a gidip gerekli fonksiyon tanımlamasını yapıyoruz:

```ruby
def show
  user = User.find_by(params[:id])

  if user 
    render json: user, status: 200
  else
    render json: "Kullanıcı bulunamadı.", status: 422
  end
end
```

Buradaki if-else kontrolünü eğer verilen *id* 'ye sahip bir kullanıcı yoksa hata mesajı dönmek için ekliyoruz. Normalde bu şekilde kodumuz çalışır. Ancak bu şekilde bir yöntem pek güvenli değil. Çünkü bu haliyle endpoint'e her türlü veri gönderilebilir. O yüzden sadece id değişkenine izin vermemiz gerekiyor. Biz tanımladığımız tüm endpoint'lerde eğer bir parametre istiyorsak *params[:id]*  yazmak yerine *params.permit(:id)*  şeklinde yazıyoruz. (strong parameters) Bu sayede daha güvenli hale getirmiş oluyoruz. (tabii her seferinde *params.permit* yazmak yerine private bir fonksiyonda tanımlıyoruz hepsini)

GET ve POST'un dışında PATCH ve DELETE metodları da var. Onların da yine benzer şekilde bir kullanımı oluyor. Yukarıdaki örnekler az çok fikir vermiştir diye tahmin ediyorum. İşte biz Caffè Nero web uygulamasında iOS ve Android uygulamalarıyla bu şekilde haberleşiyoruz.


### 2. Amazon SQS aracılığıyla CRM ile haberleşme

Caffè Nero uygulamasında bir sadakat sistemi bulunduğundan geliştirdiğimiz web uygulamasının bir şekilde CRM uygulamasıyla haberleşmesi gerekiyor. Yani kullanıcı ile ilgili aksiyonlarda CRM'e "Bak yeni bir kullanıcı kaydoldu bilgileri de bu haberin olsun." ya da "A kullanıcısı şu kadarlık harcama yaptı haberin olsun." şeklinde mesajlar göndermemiz gerekiyor. Bunun için de event-based bir mimari olan kuyruk sistemini kullanıyoruz. Böyle bir mimari kullanmamızın temel nedeni ise CRM uygulamasıyla ilgili herhangi bir bilgiye sahip olmamıza gerek kalmaması. Yani biz event-based mimari sayesinde kuyruğa ilgili mesajı yazıyoruz ve işlem bizim için tamamlanıyor. O mesajı okumak ve başarıyla okuduktan sonra mesajı silmek artık CRM'e kalmış bir iş. Tabii bunun tam tersi de söz konusu. CRM bize bir mesaj göndermek istediğinde bunu kuyruğa yazıyor ve geri kalanıyla ilgilenmiyor. Bizim uygulamamız mesajı okuyup daha sonra da kuyruktan mesajı siliyor. Biz bu kuyruk yapısı için Amazon'un SQS servisinden yararlanıyoruz.

Bizim uygulamada kullandığımız birkaç kuyruk var. Ancak bunlardan en önemli iki tanesi kullanıcıyla ilgili bir güncelleme olduğunda CRM tarafına bizim haber verdiğimiz kuyruk, diğeri ise kullanıcının ödeme yapıp damga kazandığında ya da damga harcayarak ödeme yaptığında, arkadaşı kendisine damga gönderdiğinde yani kısacası damga ile ilgili işlemlerde CRM'in bize kullanıcının yeni damga bilgisiyle ilgili gönderdiği mesajın yer aldığı kuyruk. Bizim sistemde damga ile ilgili işlemleri yani kampanyaları CRM tarafı yönetiyor. Bu nedenden ötürü web uygulaması içerisinde yer alan kullanıcı modelinde biz kullanıcının sadece sahip olduğu damga sayısının izini tutuyoruz.

Amazon SQS servisini kullanmak için Ruby on Rails için geliştirilmiş *shoryuken* isimli gem'den faydalanıyoruz. Öncelikle uygulamanın yer aldığı dizindeki *config* klasörü altında 
shoryuken.yml isimli bir dosya oluşturup, sunucuya erişim bilgilerini giriyoruz. Daha sonra uygulama ana dizininda *workers* isimli bir klasör açıyoruz. Burada *shoryukeninitilalizer.rb* isimli bir dosya oluştururarak config altında oluşturduğumuz dosyadaki bilgileri okuyarak, 
Shoryuken::EnvironmentLoader'ı çağırıyoruz. Bundan sonra yapmamız gereken şey ise 
*worker*'ların oluşturulması. Her kuyruk için bir *worker* oluşturmak gerekiyor. Az önce bahsettiğim iki kuyruğu ele alırsak, öncelikle *userupdateworker.rb* isimli bir *worker* oluşturuyoruz. Bu worker'ı biz CRM'e kullanıcı bilgilerini göndermek için kullanacağız. Dolayısıyla bu dosyada sadece worker'ın çalışması için gerekli olan tanımlamaları yapmamız yeterli oluyor. O da şöyle oluyor:

```ruby
require_relative './shoryuken_initializer'

class UserUpdateWorker
  include Shoryuken::Worker
  shoryuken_options queue: USER_UPDATE_QUEUE

  def perform(sqs, body)
  end
end
```

Yukarıdaki kodda *shoryukenoptions queue:* kısmı kuyruğu belirtiyor. Kuyrukların tanımlamasını 
shoryuken_initializer.rb'de yaptığımızdan burada direk orada tanımladığımız isimle kullanıyoruz. Bundan sonra yapmamız gereken şey ise bu kuyruğu kullanmak istediğimizde çağıracağımız fonksiyonun ve bu fonksiyon içerisinde kuyruğa göndereceğimiz mesajın tanımlanması. Bu fonksiyona birçok yerden erişmemiz gerekebileceğinden fonksiyonu uygulamanın 
helpers klasörü altında yer alan *applicationhelper.rb* dosyası içerisine tanımlıyoruz. Tanımladığımız fonksiyon şu şekilde oluyor:

```ruby
def send_user_to_sqs(user)
  attrs = {
    'first_name': user.first_name
    'last_name': user.last_name
    'email': user.email
  }
  ::UserUpdateWorker.perform_async(attrs)
end
```

Bu işlemden sonra yapmamız gereken şey ise hangi durumlarda CRM'e kullanıcı bilgisi yollacağımızı belirlemek. Örnek vermek gerekirse bir kullanıcı kayıt olduğunda bunu CRM'e söylememiz gerekiyor. Bu yüzden *userscontroller.rb*  dosyası altında tanımladığımız 
create fonksiyonu içerisinde kullanıcıyı kaydettikten sonra bu fonksiyonu çağırarak CRM'e göndermek amacıyla kullanıcı bilgilerini kuyruğa yazıyoruz. Ya da diyelim ki kullanıcı adını değiştirdi, bu durumda bu değişiklikten CRM'in de haberdar olması gerekiyor. Onun için de yine *userscontroller.rb* dosyasında *update*  fonksiyonu içerisine kullanıcı güncelleme işlemi tamamlandıktan sonra bu fonksiyonu çağırıyoruz.

Bir diğer kuyruk olan damga güncelleme kuyruğunda ise mesajı gönderen CRM tarafı olduğundan oluşturacağımız ilgili *worker*  içerisinde gönderilen mesajı okuyup daha sonra o mesajla işimiz bittiğinde mesajı kuyruktan silmemiz gerekiyor. *stampupdateworker.rb*  dosyamız şu şekilde oluyor:

```ruby
require_relative './shoryuken_initializer'

class StampUpdateWorker
  include Shoryuken::Worker
  shoryuken_options queue: STAMP_UPDATE_QUEUE

  def perform(sqs_msg, body)
    data = JSON.parse(body)
    user_id = data['userId']
    stamp_count = data['stamp_count']
    user = User.find_by(id: user_id)
    user.update(stamp_count: stamp_count)

    sqs_msg.delete
  end
end
```

### 3. Amazon SNS aracılığıyla Push mesaj gönderme

Geliştirdiğimiz uygulamalarda bazı durumlarda kullanıcıya push mesaj aracılığıyla bildirim göndermemiz gerekiyor. Caffè Nero'da senaryo şu şekilde işliyor: kasaya gidip ödemeyi mobil ödeme ile yapmak istediğinizi söyledikten sonra size özel QR kodunuzu telefonunuzdan okutturuyorsunuz. Ödeme işlemi başlatıldığında ise biz sizin cihazınıza push mesaj gönderiyoruz. Ve uygulamada ilgili ödeme ekranı açılıyor ve siz ödemeyi gerçekleştiriyorsunuz. Diğer bir durum ise damga kazanımıyla ilgili. Ödeme işlemi başarıyla tamamlandığında size damga kazandığınız hakkında kazandığınız damga tutarının yer aldığı bir push mesaj gönderiyoruz. Ya da arkadaşınız size damga gönderdiğinde bunun haberini vermek amacıyla size push mesaj gönderiyoruz. İşte tüm bu mesajları gönderebilmek için Amazon'un SNS servisinden yararlanıyoruz. Bu servisi kullanabilmek için uygulamamıza 
*aws-sdk-v1* gem'ini yüklüyoruz.

Push mesajın içeriğiyle ilgili ayarlamalardan önce push mesajı gönderecek işi (ActiveJob) tanımlamamız gerekiyor. Bunun için uygulamamızızın *jobs* klasörü altına *pushnotificationjob.rb*  isimli bir dosya oluşturuyoruz. Bu dosyanın içeriği aşağıdaki gibi oluyor:

```ruby
class PushNotificationJob < ActiveJob::Base
  queue_as :default

  def perform(device_id, message)
    push_message = message
    device = Device.find device_id
    SnsPusher.instance.client.publish(message: push_message.to_json, target_arn: device.arn, message_structure: 'json')
  end
end
```

Buradaki işlem öncesinde yapılması gerken bir şey ise Device isimli bir modelin oluşturulması ve bu modelin user modeli ile ilişilendirilmesi. Device modelinde bulunması gereken önemli bir özellik var o da ARN yani Amazon Resource Name bilgisi. Bu ARN bilgisini almak için App Store'dan ve Google Play Store'dan ayrı ayrı sertifika almanız gerekiyor. Bu sertifikalar aracılığıyla Amazon'dan ARN numaraları oluşturup kullanıcının cihazını kaydederken bu bilgiyi de objemizde tutuyoruz.

Yukarıdaki kodda yer alan SnsPusher sınıfı ise aslında push göndermeyle ilgili neredeyse tüm işlemi yaptığımız sınıf. Bu sınıf içerisinde gerekli *config*  bilgileriyle Amazon SNS Client'ını *initiliaze*  ediyor (yukarıdaki kodda initiliaze ettiğimiz SnsPusher'ın publish metodunu çağırarak push mesaj göndermesini sağlıyoruz) ve gönderilecek iOS ve Android mesajları için ayrı ayrı metodlar tanımlıyoruz. Her iki platform da mesajları için farklı bir format kullandığından bu metodların ayrı ayrı tanımlanması gerekiyor. Örnek bir iOS mesajı şöyle oluyorken:

```json
"APNS": "{\"aps\":{\"alert\": \"Check out these awesome deals!\",\"url\":\"www.amazon.com\"} }"
```

Android mesajı şöyle oluyor:

```json
"GCM":"{\"data\":{\"message\":\"Check out these awesome deals!\",\"url\":\"www.amazon.com\"}}"
```

Bundan sonra yapmamız gereken şey daha önce kaydettiğimiz kullanıcının cihazının Android ya da iOS olup olmadığına göre ilgili mesajları belirleyip, kullanıcının hangi aksiyonları sonrasında push mesaj göndermek istiyorsak orada *PushNotificationJob* 'ı çağırmak.

 
### 4. İçerik yönetimi için Active Admin aracılığıyla CMS oluşturma

Uygulamanın mağazalar, quiz, kullanıcı sözleşme gibi daha sonra değişebilecek alanları olduğundan içerik yönetim sistemine ihtiyacımız vardı. Bunun için de Ruby on Rails ile çok yaygın bir şekilde kullanılan *active-admin*  gem'ini kullanmayı tercih ettik. AcitveAdmin'in kullanımıyla ilgili kendi 
[sitesinde](http://activeadmin.info) ayrıntılı bilgi olduğundan burada uzun uzun anlatmayacağım. CMS sistemiyle ilgili bahsetmek istediğim birkaç gem daha var. Bunlardan ilk *tinymce-rails*  isimli gem. Bu gem'i kullanıcı sözleşmesi düzenleme sayfası için kullanıyoruz. Gem'i kurup gerekli ayarları yaparak belirlediğimiz bir modelin ilgili özelliğine Wordpress'in metin editörü gibi bir editör eklenmesini sağlıyoruz. Bu sayede yazı fontu seçimi, kalın yapma ve benzeri şeyleri kolaylıkla yapabiliyoruz. Bir diğer gem ise *cancancan*  isimli gem. Eğer içerik yönetim sistemini admin, editör vb. şekilde birden fazla farklı yetkilere sahip kullanıcılar kullanacaksa bu gem aracılığıyla bu yetkilerin izinlerini dilediğiniz gibi ayarlayabiliyorsunuz.


### 5. Eski verileri içeri alma

Caffè Nero uygulaması hali hazırda kullanıldığından yeni uygulamaya eski uygulamadaki kullanıcıları, ürünleri, quiz sorularını ve ürünleri içeri almamız gerekiyordu. Bunun için de 
lib/tasks klasörü altında 
rake task'leri oluşturduk. Tabii bunun öncesinde varolan veritabanından verileri CSV ya da JSON olarak dışarı aktardık. Daha sonra da oluşturduğumuz task içerisine bir adet 
parser yazarak ilgili verileri okuyup yeni database kaydettik. Örnek bir 
rake task'ı şöyle:

```ruby
namespace :users do
  desc "Import users from csv"
  task import: :environment do

    puts "Starting fetching imports"

    file = File.open("#{Rails.root}/old_users.csv", 'r:UTF-8')

    CSV.foreach(file, headers: true, encoding: 'utf-8', quote_char: "\x00") do |row|
      first_name = row['first_name']
      last_name = row['last_name']
      email = row['email']

      begin
User.create!(first_name: first_name, last_name: last_name, email: email)
      rescue => e
puts "----"
puts "Email: #{email} | Error: #{e}"
puts "----"
      end
    end
  end
end
```

Burada begin/rescue içerisine almamızın nedeni kayıt sırasında bir hata olursa işlemin yarıda kesilmemesi için. Kodda 7. satırda yer alan dosya açma işlemindeki *r:UTF-8dosyanın UTF-8*  enconding edildiğini gösteriyor. Normalde başında r olmasına gerek yok ancak Ubuntu makinalarda bu encoding'i çalıştırabilmek için r'yi eklemek gerekiyor. 9. satırdaki CSV okuma kodunda yer alan quote_char ise CSV'de en sık karşılaşılan "Illegal quoting in line x" hatasını engellemek için gerekiyor. Bu ekleme alıntılama karakterinin olmadığını gösteriyor. ("\x00" karakteri ASCII tablosunda NULL'a denk düşüyor) Bu şekilde birkaç tane rake task'i yazdıktan sonra terminalde ilgili uygulama dizinindeyken *rake users:import*  komutuna benzer komutlarla tek tek ilgili task'leri çalıştırıp eski verileri içeri alabiliyorsunuz.


### 6. Facebook login

Uygulamaya email adresiyle kayıt olmanın yanında Facebook aracılığıyla giriş yapma özelliği eklememiz gerekiyordu. Bunun için 
koala gem'inden yararlandık. Facebook ile giriş yapma özelliğinin uygulamaya entegre edilmesini daha önce detaylı olarak 
[şuradaki](/2016/09/13/ruby-on-rails-ile-gelistirilen-api-uygulamalari-icin-facebook-login/) blog yazımda anlatmıştım.


## Hangi gem'leri kullandık?

Yukarıda saydığım gem'lerin yanında başka gem'ler de kullandık. Bunlardan bazıları şöyle:

* **bcrypt:** Kullanıcı şifresini veritabanında şifreli olarak saklamak için.
* **rails-i18n:** Uygulamaya birden fazla dil seçeneği ekleyebilmek için. (Şuan uygulamada diğer diller aktif değil ama ileride olabilir)
* **whenever:** Masterpass ile entegrasyon için periyodik olarak belli saatlerde çalıştırmamız gereken arka plan işleri için kullandık. (Masterpass'ten söz açılmışken, uygulamadaki Masterpass servisini Serdar yazdığından o tarafa çok fazla hakim değilim. Yoksa onu da detaylı olarak burada anlatmak isterdim. Belki Serdar kendi [blogunda](http://serdardogruyol.com) Caffè Nero'daki Masterpass servisi hakkında detaylı bilgi verir.)
* **email_validator:**  Kullanıcının girdiği email gerçekten doğru bir email mi kontrol etmek için kullandığımız bir gem. (Buna ek olarak kendimiz kullanıcının girdiği email fake mail üretmeye izin veren servis sağlayıcılardan mı diye kontrol etmek için kendimiz bir validator yazdık)
* **paperclip:** Kullanıcının avatar yükleyebilmesi ve ürünlerin görsellerini ekleyebilmek için kullandığımız gem.
* **semantic:** Mobil uygulamaların versiyonlamalarında bize yardımcı olması için kullandığımız gem.
* **rspec-rails:** Uygulamayı sorunsuz bir şekilde çıkarmamızı ve çok hızlı bir şekilde özellik eklememizi sağlayan uygulamanın bel kemiği olan testler için kullandığımız gem. 
* **factory_girl_rails:** Testlerde kullanılacak hazır verileri saklamak için kullandığımız gem.
* **faker:** Hazır dataları manuel oluşturmak yerine rastgele ve anlamlı bir şekilde oluşturmak için kullandığımız bir gem.
* **capybara:** Uygulamanın ön yüzünde gerçek kullancı gibi test yapmak için kullandığımız gem. Bizim uygulamada kullanıcılar için tek arayüz CMS tarafında olduğundan sadece orada kullandık.

## Versiyonlamayı nasıl yaptık?

Uygulama versiyonlamasında git ve Github'tan yararlandık. Sıkı bir 
code review sürecimiz de oldu. *Develop*  ve *master*  olmak üzere iki *branch*'te geliştirme yaptık. Ben yazdığım kodları hiçbir şekilde doğrudan *commit* 'lemedim. Yeteri kadar tecrübeye sahip olmadığımdan ve hata yapma şansım olduğundan yaptığım tüm geliştirmeler için farklı 
branch'ler açıp *pull request*  ile Aşkın ya da Serdar'ın incelemesi sonucunda yazdığım kodlar ana repoya *merge*'lendi.

## Kod kalitesini nasıl ölçtük? Hatalardan nasıl uzak durduk?

Github'a entegre olan CircleCI ve CodeClimate olmak üzere iki servisten yararlandık. CodeClimate kodun kalitesine ölçen bir servis. Aynı kodun birden fazla yazılması, fonksiyonun çok kompleks ya da uzun olması gibi denetimler yaparak eğer bir hata görürse sizi uyarıyor. Bu sayede siz de gerekli değişikliği yaparak kodun okunabilirliğini ve kalitesini arttırabiliyorsunuz. CodeClimate, 4 üzerinden yazılan koda puan veriyor. Caffè Nero web uygulamasının reposunun puanı ise 3.84. Her ne kadar kod tekrarından kaçınsak da bazı durumlarda tanımladığımız fonksiyonların kompleks olması puanın bu seviyede olmasına neden oldu. Diğer yandan puanın oldukça iyi olduğunu düşünüyorum.

CircleCI servisi ise tam olarak elimiz kolumuz ayağımız oldu desek yeridir. Daha çok 
deploy işlemi için tercih edilse de test özelliği bize en çok yardımcı olan özelliği oldu. Gerek 
pull request sırasında gerekse de *deploy* aşamasından önce tüm testleri çalıştırıp her test başarılı olduktan sonra deploy'un gerçekleşmesini sağlayarak bizi birçok yükten kurtardı. Bununla birlikte gerekli ayarları yaptıktan sonra deploy'ların da Github'tan sunucuya otomatik olarak deploy olmasını CircleCI aracılığıyla sağladık.

## Son söz

Caffè Nero uygulaması benim geliştirdiğim ilk büyük çaplı uygulama oldu. Tabii bu fırsatı bana verdiği için Serdar'a tekrar tekrar teşekkür etmem lazım. Kendi başıma bir Ruby on Rails web uygulaması yapsaydım herhalde bu kadar detayları olan bir proje olmazdı herhalde. O yüzden bu uygulamayı geliştirirken öğrendiğim tecrübelerin çok değerli olduğunu düşündüğümden blogumda olabildiğince paylaşmak istedim.

Her gün onbinlerce kişinin kullanacağı bir uygulamanın back-end'ini yazmak benim için inanılmaz bir duyguydu. Buraya kadar okuduysanız eminim siz de back-end geliştirmeye ilgi duyuyorsunuzdur diye düşünüyorum. Umarım anlattıklarımın size bir faydası olmuştur.