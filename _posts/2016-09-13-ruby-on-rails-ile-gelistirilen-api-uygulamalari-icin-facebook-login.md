---
title: Ruby on Rails ile geliştirilen API uygulamaları için Facebook Login
---

Ruby on Rails ile geliştirdiğiniz API uygulamasına Facebook Login özelliği eklemek istiyorsanız bu yazı oldukça işinize yarayacak.

Protel'de üzerinde çalıştığım API uygulamasında Facebook ile giriş yapma özelliğinin eklenmesi gerekiyordu. Bunun için biraz araştırma yapınca çoğunlukla İngilizce kaynaklara denk geldim. Denk geldiğim kaynaklar ise çoğunlukla Devise gem'i üzerinden anlatılmıştı ancak biz bu projede Devise'ı sadece Active Admin için kullanıyorduk. Bununla birlikte biz geliştirdiğimiz projelerde eklediğimiz özelliklerinin birçoğu için Rspec testi yazıyorduk. Yine araştırdığım örneklerde testin nasıl yapılacağına dair net bir açıklama göremedim. Örnekler daha çok View'leri olan sayfalar için yapılmıştı, API uygulamaları için değil. Biraz uğraş sonucunda hem Facebook ile giriş yapma özelliğini hem de bu özelliği test etmenin bir yolunu buldum. Türkçe'de bu konuda yeterli bir kaynak olmadığından blogumda paylaşmak istedim.

### Facebook ile giriş yap özelliğinin projeye eklenmesi

Öncelikle Gemfile dosyamıza koala ve omniauth-facebook gemlerini ekliyoruz.

```ruby
gem 'omniauth-facebook', '~> 4.0'
gem 'koala'
```

Daha sonra */config/initializers*  klasörünün altına omniauth.rb isimli bir dosya oluşturup aşağıdaki bilgileri ekliyoruz. Aşağıdaki kodda yer alan API_KEY ve API_SECRET yerine 
[https://developers.facebook.com](https://developers.facebook.com) adresinden oluşturduğumuz uygulamanın API_KEY ve API_SECRET bilgilerini yazıyoruz.

```ruby
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, API_KEY, API_SECRET, {scope: 'user_about_me, email', callback_path: '/auth/facebook/callback'}
end
```

Eğer API uygulamanızda sadece mobil taraf olacaksa *omniauth-facebook*  gem'ini eklemenize ve *omniauth.rb* dosyasını oluşturmanıza gerek yok. Çünkü ilgili uygulamanın tanımlanma işlevi ön tarafta yani mobil uygulamalar üzerinden yapılıyor.

Biz geliştirdiğimiz uygulamada giriş - çıkış (login - logout) işlemlerinin yönetimi için sessions controller'ı oluşturmuştuk. Facebook login işleminin gerçekleştirilmesi için gerekli olan endpoint'i de yine bu controller içerisine ekleyeceğiz. Ancak Facebook login işlemi aslında sadece bir login işlemi değil. Çünkü kullanıcı ilk defa giriş yapıyorsa bu durumda kullanıcıyı User modelimize kaydetmemiz gerekiyor. Dolayısıylıa controller'da olmaması gereken bazı işlemler yapacağız. Bu işlemler için 
*lib*  klasörü altında *facebookhandler.rb*  isimli bir dosya ve sınıf oluşturuyoruz. Bu sınıf içerisinde öncelikle Facebook ile giriş yapmak isteyen kullanıcının access_token'ını alıyoruz. Aldığımız access_token ile Koala::Facebook::API nesnesini oluşturuyoruz. Bu nesneyi oluşturduktan sonra get_objects metodu ile kullanıcının istediğimiz bilgilerini Facebook'tan alıyoruz. Daha sonra bu bilgiler aracılığıyla kullanıcı daha önce kayıt olmamış ise kayıt ediyor ve kullanıcıyı dönüyoruz, daha önce kayıt olmuş ise User modelinden kullanıcının Facebook ID'si aracılığıyla o kullanıcıyı bulup dönüyoruz.


*/lib/facebookhandler.rb*  dosyamız şu şekilde görünüyor:

```ruby
class FacebookHandler
  FIELDS = "me?fields=first_name,last_name,picture,email,verified,id"

  def initialize(access_token)
    @client = Koala::Facebook::API.new(access_token)
  end

  def login_or_create
    fb_user = @client.get_object(FIELDS)
    User.where(facebook_id: fb_user['id']).first_or_create do |user|
      user.first_name = fb_user['first_name']
      user.last_name = fb_user['last_name']
      user.avatar = fb_user['picture']['data']['url']
      user.email = fb_user['email']
      user.facebook_id = fb_user['id']
    end
  end
end
```

*sessionscontroller.rb*  dosyamız ise şu şekilde görünüyor:

```ruby
def facebook_login
  user = FacebookHandler.new(params.permit(:access_token)).login_or_create
  if user.valid?
    render json: { user: user.as_json }, status: 200
  else
    render json: { errors: model_errors_json(user) }, status: 422
  end
end
```

Buradaki model_errors_json nedir diye merak edebilirsiniz. Hataların daha düzgün görüntülenebilmesi için *helpers/applicationhelper.rb*  içerisine biz böyle bir metod tanımlıyoruz. Böylece tüm controller'larda modellerle ilgili bir hata olduğunda bunu düzgün bir json olarak dönüp hatanın nerede olduğunu kolay bir şekilde tespit edebiliyoruz.

*applicationhelper.rb*  dosyamız şu şekilde görünüyor:

```ruby
module ApplicationHelper
  def model_errors_json(model)
    model.errors.messages.map do |k, v|
      v.map do |message|
{ code: 111, message: "#{k.to_s.humanize} #{message}", key: k }
      end
    end.flatten
  end
end
```

Son olarak da Facebook login için gerekli olan endpoint'i *config/routes.rb*  dosyamıza ekliyoruz:

```ruby
post '/facebook_login', to: 'sessions#facebook_login'
```

Buraya kadar her şey tamam. Ruby on Rails ile geliştirdiğimiz API uygulamamıza Facebook ile giriş yapma özelliğini ekledik. Peki eklediğimiz bu özellik doğru çalışıyor mu? Bunun için de Rspec testleri yazmamız gerekiyor. Hem oluşturduğumuz FacebookHandler'ın hem de sessions_controller içerisine eklediğimiz facebook_login'i ayrı ayrı test etmeliyiz.

### Test

Eklediğimiz Facebook ile giriş yapma özelliğini test edebilmek için öncellikle VCR gem'ini 
*Gemfile* 'a eklememiz gerekiyor. VCR gem'i sayesinde testi her çalıştırdığımızda Facebook'a istek atmak yerine, sadece testi ilk çalıştırdığımızda istek atılıp daha sonra o isteğe gelen cevap kaydedilerek bir sonraki testlerde kullanılıyor.

```ruby
group :test do
  gem 'vcr'
end
```

Gemfile'a ekleme yaptıktan sonra *spec/lib* klasörü altına *facebookhandler.rb* dosyası yaratıyoruz. Bu dosyanın içeriği de aşağıdaki gibi oluyor:

```ruby
RSpec.describe FacebookHandler, :type => :lib do
  context '#facebook_login' do
    it 'facebook login' do
      VCR.use_cassette 'facebook_handler_login' do
token = "buraya geçerli bir Facebook kullanıcısının token'ı gelecek"
expect { FacebookHandler.new(token).login_or_create }.to change{ User.count }.by(1)
      end
    end
  end
end
```

Test içerisinde yer alan token kısmına geçerli bir Facebook kullanıcısının token'ını yazarak testinizi çalıştırabilirsiniz. Kendi Facebook hesabınızın access_token'ına 
[şuradan](https://developers.facebook.com/tools/explorer) erişebilirsiniz. Testte token'la Facebook aracılığıyla giriş yapmış bir kullanıcı oluşturup daha sonra User modelinde kayıtlı kullanıcı sayısının bir artıp artmadığını kontrol ediyoruz.

Testi çalıştırdıktan sonra *spec*  klasörü altında yer alan *vcrcasettes*  klasörünün ve o klasörün altında da *facebookhandlerlogin.yml*  adında bir dosya oluştuğunu göreceksiniz. Testi tekrar çalıştırdığımuzda Facebook'a tekrar istek göndermek yerine bu dosyadaki cevap kullanılacak.

Sırada Sessions Controller'ın testi var. Bunun için de *spec/requests*  klasörü altına 
*sessionsrequestsspec.rb*  isimli bir dosya oluşturuyoruz. Dosyanın içeriği aşağıdaki gibi oluyor:

```ruby
RSpec.describe 'SessionsRequest', :type => :request do
  context '#facebook_login' do
    before do
      @token = 'access_token'
      body = {"first_name": "isim", "last_name": "soyisim", "picture": {"data": {"is_silhouette": false, "url": "avatar_url"}}, "email": "email", "verified": true, "id": "facebook_user_id"}
      allow_any_instance_of(Koala::Facebook::API).to receive(:new).and_return(Koala::Facebook::API.new())
      allow_any_instance_of(Koala::Facebook::API).to receive(:get_object).and_return(body)
    end

    it 'facebook_login' do
      VCR.use_cassette 'sessions_controller_facebook_login' do
post '/facebook_login', { access_token: @token }.to_json
      end
      expect(response.code).to eq '200'
      expect(User.count).to eq 1
      expect(json['user']['first_name']).to eq 'isim'
    end
  end
end
```

Burada öncelikle *accesstoken*  ve *body*  tanımlıyoruz. body kısmı aslında *facebookhandlerlogin.yml* dosyası içerisinde yer alan body/string kısmındaki login sonrası bize dönene hash. *allowanyinstanceof*  kullanarak FacebookHandler'da yapılan işlemi maskeliyoruz. Çünkü onu az önce test ettik. Burada sadece sessions_controller'daki facebook_login endpointini test ediyoruz. VCR'ı kullanma nedenimiz ise avatar_url'inin bulunması. Testi çalışırınca post isteğini attıktan sonra gelen cevabın 200 dönüp dönmediğini, User modeline kullanıcının kayıt edilip edilmediğini ve son olarak başta bizim gönderdiğimiz kullanıcının giriş yaptıktan/kayıt olduktan sonra bize doğru bir şekilde dönüp dönmediğini kontrol ediyoruz.
