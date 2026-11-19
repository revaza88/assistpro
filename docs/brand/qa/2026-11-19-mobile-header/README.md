> გამოქვეყნებულია:PR #5/merge091e360;public15routes/9asset fingerprints/4fonts და fresh Chrome157320/390 შემოწმება წარმატებულია. [HTTP ანგარიში](public-publication.json).

# ბუნებრივი მობილური header

საწყისი main064f8df;branch codex/assist-mobile-header.

პრობლემა:479px-ზე CSS ლოგოს ცალკე ცენტრირებულ რიგში აქცევდა,control-ებს კი მეორე რიგის მარჯვენა კიდეზე ტოვებდა;header ზედმეტად მაღალი და გაუწონასწორებელი იყო.

გადაწყვეტა:normal320/390-ზე ერთი grid ზოლი,სრული უცვლელი Master PNG მარცხნივ,ენის48px არჩევანი და48px menu მარჯვნივ. ლოგოს სიგანე რეალურ დარჩენილ სივრცეს პროპორციულად ერგება;ფონი#FDFDFD. Compact ენაKA/EN/RU-ს აჩვენებს,select სრული ქართული/English/Русский სახელებითა და არსებული aria-label-ით რჩება. Desktop autonym/globe შენარჩუნებულია. თემის/ტექსტების/სერვისების/ლოგიკის სხვა ცვლილება არ ყოფილა. Sticky mobile header აღარ ქრება scroll-ზე.

ბრაუზერი:Chrome157.0.8103.79,Windows,რეალური native UI;production loopback5016. შემოწმდა320×844,390×844,768×1024,1440×900. KA/EN/RU320-ზე ერთრიგიანია. Menu open/Escape დახურვა;nextTab main CTA-ს ხილულად ფოკუსავს. 200% ტექსტი იზოლირებულ5017 CSS fixture-ზე390×844-ზე,არ არის ფიზიკური ტელეფონის ტესტი;დიდი ტექსტისას header მიზნობრივად ორ რიგად reflow-ს აკეთებს,menu ბოლო მოქმედება scroll-ით სრულად ჩანს. Fixture upstream write-ს ბლოკავს,form=false,calls0;შემოწმების შემდეგ შეჩერებულია.

TypeScript/39ტესტი/build15+404/smoke/audit-web15routes წარმატებულია. Master PNG SHA-256449ff8c94c993a29bc58f9e0e43bb04d594088e367eeb015fd094fbd73191a5e უცვლელია. INTAKE_MODE=disabled;INDEXING_ENABLED=false. ფიზიკური მობილური/AT/full orientation matrix არ გამოყენებულა/გამეორებულა.

[რეალური მანამდე/შემდეგ390](header-comparison.png) · [320px](header-320.png) · [კადრების URL/დრო](browser-captures.json). Native screenshot crop-ებია;არა მაკეტები. მარცხენა კადრი public baseline,right ახალი public production. ლურჯი halo automation pointer-ია.
