var quotes = ["Mezardaki en zengin adam olmak değil, yatağa yattığımda harika işler yaptık diyebilmektir benim için önemli olan. - Steve Jobs",
              "Farklı olun, farklı düşünün: Sıradan işler yapmaktansa aykırı işler ortaya koymak size farklılığı getirecektir. - Steve Jobs",
              "Birinin icat ettiği şeyi bir başkası keşfedebilir. - Sherlock Holmes",
              "Aynı şeyi yapıp da farklı sonuçlar beklemek ahmaklıktır. - Albert Einstein",
              "İnsan imkansızı başarabilir sözü yetersizdir çünkü insan imkansızın da ötesine ulaşabilir. - Nikola Tesla",
              "Bazen hayat kafanıza bir tuğlayla vurur. Sakın inancınızı kaybetmeyin. - Steve Jobs",
              "Farklı ve yeni nispeten kolaydır. Bir şeyi gerçekten daha iyi yapmak zordur. - Jonathan Ive",
              "Biz pazar araştırması yapmayız. Biz danışmanları işe almayız. Biz sadece harika ürünler yapmak isteriz. - Steve Jobs",
              "Tek kişilik bir azınlık bile olsan, gerçek hala gerçektir. - Mahatma Gandhi",
              "Mutlu olmak istiyorsan bir amaca bağlan, insanlara ya da eşyalara değil.  - Albert Einstein",
              "Muhteşem bir şey, bir yerlerde keşfedilmeyi bekliyor. - Carl Sagan",
              "Geleceğinizi tahmin etmenin en iyi yolu, onu yaratmaktır. - Abraham Lincoln",
              "Basitlik tüm karmaşıklığı ve detayı içinde barındırır. - Steve Jobs",
              "Büyük beyinler fikirleri tartışır, orta halliler olayları, küçük beyinler ise insanları. - Eleanor Roosevelt",
              "Önce seni görmezden gelirler. Sonra sana gülerler. Sonra seninle savaşırlar. Sonra sen kazanırsın. - Mahatma Gandhi",
              "Cehaletin esenlik getirdiği yerde, zeki olmak budalalıktır. - Carl Sagan",
              "Her gün, halihazırda sizinle aynı şeyi yapan başka bir şirketi alaşağı etmek için işe geliyorsanız hayat ne kadar heyecanlı olabilir ki? - Larry Page",
              "Bir şey üzerine fazla düşünürseniz, kaçınılmaz cevaba sonunda ulaşırsınız. - Steve Jobs",
              "İyi fikirlerin nereden geldiğinin ne önemi var? Dikkatini verirsen zaten fark edersin. - Steve Jobs",
              "Hiç kimseye yararlı olmamak tam olarak değersiz olmak demektir. - Descartes",
              "Neden varız bilemiyorum ama eminim ki keyfimize bakmak için değil. - Ludwig Wittgenstein"];


var quotesInEnglish = ["Very little is needed to make a happy life; it is all within yourself, in your way of thinking - Marcus Aurelius",
                        "The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius",
                        "We suffer more often in imagination than in reality. - Seneca"]

function newQuote() {
  var randomNumber = Math.floor(Math.random() * (quotesInEnglish.length));
  document.getElementById('quote').innerHTML = quotesInEnglish[randomNumber];
}
newQuote();
